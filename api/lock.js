// public/api/lock.js
console.log('lock.js loaded - escrow automation starting');

// TODO: For Vercel, use CDN for @bsv/sdk or npm install in a serverless setup (post-MVP)
// For now, assume <script src="https://unpkg.com/@bsv/sdk@1.0.11/dist/bsv-sdk.min.js"></script> in HTML
const BSV = window.bsvsdk; // Global from CDN (adjust for production)

// Simulated escrow address (replace with real script later)
const escrowPaymail = 'styraks@rockwallet';

// Lock Seller stake (20 MNEE)
async function lockSellerStake(paymail, price, deliveryDays, description, expiration) {
    try {
        const amount = 20; // Fixed 20 MNEE stake
        const jobId = `job-${Date.now()}`; // Unique ID
        const specsHash = BSV.Crypto.SHA256(description).toHex(); // Hash description
        
        // Simulated BSV TX (stub until wallet integration)
        console.log(`Locking ${amount} MNEE for Seller: ${paymail}, Price: ${price} MNEE, Delivery: ${deliveryDays} days, Desc: ${description}, Expires: ${expiration}`);
        const opReturn = { jobId, sellerPayMail: paymail, price, deliveryDays, specsHash, expiration };
        console.log('OP_RETURN data:', opReturn);
        
        // TODO: Replace with real TX using @bsv/sdk
        return { txid: `stub-txid-seller-${jobId}`, jobId };
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
        const opReturn = { buyerPayMail, sellerPayMail, price };
        console.log('OP_RETURN data:', opReturn);
        
        // TODO: Replace with real TX
        return { txid: `stub-txid-buyer-${Date.now()}` };
    } catch (e) {
        console.error('Buyer lock failed:', e);
        throw e;
    }
}

// Submit delivery (stub)
async function submitDelivery(jobId, deliveryData) {
    const deliveryHash = BSV.Crypto.SHA256(deliveryData).toHex();
    console.log(`Delivery for Job ${jobId}: Hash ${deliveryHash}`);
    console.log('OP_RETURN update:', { jobId, deliveryHash });
    return Date.now(); // Simulated timestamp
}

// Check dispute window (24 hours)
function checkDisputeWindow(deliveryTime) {
    const now = Date.now();
    const window = 24 * 60 * 60 * 1000; // 24 hours in ms
    return now - deliveryTime > window ? 'Closed' : 'Open';
}

// Release funds (stub)
function releaseFunds(jobId, outcome, price) {
    const total = price + 20; // Price + 20 MNEE (10 fee + 10 penalty)
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

window.lockSellerStake = lockSellerStake;
window.lockBuyerStake = lockBuyerStake;
window.submitDelivery = submitDelivery;
window.checkDisputeWindow = checkDisputeWindow;
window.releaseFunds = releaseFunds;
