// public/lock.js
console.log('lock.js loaded - escrow automation starting');

const BSV = window.bsvsdk || { Crypto: { SHA256: (data) => `hash-${Date.now()}` }, Transaction: function() { return { toString: () => 'stub-tx', addData: () => this, to: () => this, from: () => this, feePerKb: () => this }; } };
const escrowDomain = 'notrust.escrow';

async function lockSellerStake(paymail, price, deliveryDays, description, expiration) {
    try {
        const amount = 20;
        const jobId = `job-${Date.now()}`;
        const specsHash = BSV.Crypto.SHA256(description).toHex ? BSV.Crypto.SHA256(description).toHex() : `hash-${jobId}`;
        const escrowPaymail = `${jobId}@${escrowDomain}`;
        
        console.log(`Generating escrow for Seller: ${paymail}, Price: ${price} MNEE, Delivery: ${deliveryDays} days, Desc: ${description}, Expires: ${expiration}`);
        const opReturn = { jobId, sellerPayMail: paymail, price, deliveryDays, specsHash, expiration };
        console.log('OP_RETURN data:', opReturn);

        const tx = new BSV.Transaction()
            .from(/* Wallet UTXOs */)
            .to(escrowPaymail, amount * 1e8)
            .addData(JSON.stringify(opReturn))
            .feePerKb(1000);
        const txid = `stub-txid-seller-${jobId}`;

        console.log('Simulated TX:', tx.toString());
        return { txid, jobId, escrowPaymail };
    } catch (e) {
        console.error('Seller lock failed:', e);
        throw e;
    }
}

async function lockBuyerStake(buyerPaymail, sellerPaymail, price) {
    try {
        const amount = price + 10;
        const jobId = `job-${Date.now()}`; // Should link to Seller’s jobId in production
        const escrowPaymail = `${jobId}@${escrowDomain}`;
        
        console.log(`Generating escrow for Buyer: ${buyerPaymail}, Seller: ${sellerPaymail}, Job Price: ${price} MNEE`);
        const opReturn = { buyerPayMail: buyerPaymail, sellerPayMail: sellerPaymail, price, jobId };
        console.log('OP_RETURN data:', opReturn);

        const tx = new BSV.Transaction()
            .from(/* Wallet UTXOs */)
            .to(escrowPaymail, amount * 1e8)
            .addData(JSON.stringify(opReturn))
            .feePerKb(1000);
        const txid = `stub-txid-buyer-${jobId}`;

        console.log('Simulated TX:', tx.toString());
        return { txid, jobId, escrowPaymail };
    } catch (e) {
        console.error('Buyer lock failed:', e);
        throw e;
    }
}

async function submitDelivery(jobId, deliveryData) {
    const deliveryHash = BSV.Crypto.SHA256(deliveryData).toHex ? BSV.Crypto.SHA256(deliveryData).toHex() : `hash-${jobId}`;
    console.log(`Delivery for Job ${jobId}: Hash ${deliveryHash}`);
    console.log('OP_RETURN update:', { jobId, deliveryHash });
    return Date.now();
}

function checkDisputeWindow(deliveryTime) {
    const now = Date.now();
    const window = 24 * 60 * 60 * 1000;
    return now - deliveryTime > window ? 'Closed' : 'Open';
}

function releaseFunds(jobId, outcome, price) {
    const total = price + 20;
    if (outcome === 'happy') {
        console.log(`Releasing for Job ${jobId}: ${price - 10} MNEE to Seller, 10 MNEE to NoTrust, 10 MNEE refunded to Buyer`);
    } else if (outcome === 'seller') {
        console.log(`${price} MNEE to Seller, 20 MNEE to NoTrust`);
    } else if (outcome === 'buyer') {
        console.log(`${price + 10} MNEE to Buyer, 20 MNEE to NoTrust`);
    }
    return total;
}

async function pollMempool(txid) {
    try {
        const response = await fetch(`https://api.whatsonchain.com/v1/bsv/main/tx/${txid}/status`);
        if (!response.ok) throw new Error('TX not found');
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
window.pollMempool = pollMempool;
