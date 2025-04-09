// public/lock.js
console.log('lock.js loaded - escrow automation starting');

// Check if @bsv/sdk loaded from CDN
const BSV = window.bsvsdk || { Crypto: { SHA256: (data) => `hash-${Date.now()}` } }; // Fallback if undefined
const escrowPaymail = 'styraks@rockwallet';

// Lock Seller stake (20 MNEE)
async function lockSellerStake(paymail, price, deliveryDays, description, expiration) {
    try {
        const amount = 20; // Fixed 20 MNEE stake
        const jobId = `job-${Date.now()}`; // Unique ID
        const specsHash = BSV.Crypto.SHA256(description).toHex ? BSV.Crypto.SHA256(description).toHex() : `hash-${jobId}`; // Fallback hash
        
        // Simulate BSV TX (replace with real TX below)
        console.log(`Locking ${amount} MNEE for Seller: ${paymail}, Price: ${price} MNEE, Delivery: ${deliveryDays} days, Desc: ${description}, Expires: ${expiration}`);
        const opReturn = { jobId, sellerPayMail: paymail, price, deliveryDays, specsHash, expiration };
        console.log('OP_RETURN data:', opReturn);

        // Real TX (stubbed until wallet integration)
        const tx = new BSV.Transaction()
            .from(/* TODO: Wallet UTXOs */)
            .to(escrowPaymail, amount * 1e8) // MNEE to Satoshis (assuming 1 MNEE = 1 USD = 1e8 Satoshis for now)
            .addData(JSON.stringify(opReturn))
            .feePerKb(1000); // Default fee
        const txid = `stub-txid-seller-${jobId}`; // Replace with tx.hash once signed
        
        // Simulate broadcast (replace with real broadcast in Session 2)
        console.log('Simulated TX:', tx.toString());
        pollMempool(txid);
        return { txid, jobId };
    } catch (e) {
        console.error('Seller lock failed:', e);
        throw e;
    }
}

// Lock Buyer stake (price + 10 MNEE)
async function lockBuyerStake(buyerPaymail, sellerPaymail, price) {
    try {
        const amount = price + 10; // Price + 10 MNEE deposit
        console.log(`Locking ${amount} MNEE for Buyer: ${buyerPaymail}, Seller: ${sellerPaymail}, Job Price: ${price} MNEE`);
        const opReturn = { buyerPayMail: buyerPaymail, sellerPayMail: sellerPaymail, price }; // Fixed typo
        console.log('OP_RETURN data:', opReturn);

        // Real TX (stubbed until wallet integration)
        const tx = new BSV.Transaction()
            .from(/* TODO: Wallet UTXOs */)
            .to(escrowPaymail, amount * 1e8)
            .addData(JSON.stringify(opReturn))
            .feePerKb(1000);
        const txid = `stub-txid-buyer-${Date.now()}`; // Replace with tx.hash
        
        console.log('Simulated TX:', tx.toString());
        pollMempool(txid);
        return { txid };
    } catch (e) {
        console.error('Buyer lock failed:', e);
        throw e;
    }
}

// Submit delivery
async function submitDelivery(jobId, deliveryData) {
    const deliveryHash = BSV.Crypto.SHA256(deliveryData).toHex ? BSV.Crypto.SHA256(deliveryData).toHex() : `hash-${jobId}`;
    console.log(`Delivery for Job ${jobId}: Hash ${deliveryHash}`);
    const opReturn = { jobId, deliveryHash };
    console.log('OP_RETURN update:', opReturn);
    return Date.now();
}

// Check dispute window (24 hours)
function checkDisputeWindow(deliveryTime) {
    const now = Date.now();
    const window = 24 * 60 * 60 * 1000; // 24 hours in ms
    return now - deliveryTime > window ? 'Closed' : 'Open';
}

// Release funds
function releaseFunds(jobId, outcome, price) {
    const total = price + 20;
    if (outcome === 'happy') {
        console.log(`Releasing for Job ${jobId}:`);
        console.log(`${price - 10} MNEE to Seller`);
        console.log(`10 MNEE to NoTrust`);
        console.log(`10 MNEE refunded to Buyer`);
    } else if (outcome === 'seller') {
        console.log(`${price} MNEE to Seller, 20 MNEE to NoTrust`);
    } else if (outcome === 'buyer') {
        console.log(`${price + 10} MNEE to Buyer, 20 MNEE to NoTrust`);
    }
    return total;
}

// Poll mempool (WhatsOnChain API)
async function pollMempool(txid) {
    try {
        const response = await fetch(`https://api.whatsonchain.com/v1/bsv/main/tx/${txid}/status`);
        const status = await response.json();
        console.log(`Mempool status for TXID ${txid}:`, status);
        return status.confirmed ? 'Confirmed' : 'Pending';
    } catch (e) {
        console.log(`Mempool check for ${txid} failed (stub—assuming pending):`, e);
        return 'Pending';
    }
}

window.lockSellerStake = lockSellerStake;
window.lockBuyerStake = lockBuyerStake;
window.submitDelivery = submitDelivery;
window.checkDisputeWindow = checkDisputeWindow;
window.releaseFunds = releaseFunds;
