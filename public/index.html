<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>NoTrust - Trustless Escrow</title>
    <style>
        body { font-family: Arial, sans-serif; max-width: 800px; margin: 0 auto; padding: 20px; background: #101010; color: #ffffff; }
        h1 { font-family: 'Audiowide', sans-serif; }
        .form-section { margin: 20px 0; }
        label { display: block; margin: 10px 0 5px; }
        input, textarea { padding: 8px; background: #333333; color: #ffffff; border: 1px solid #666666; }
        textarea { width: 100%; }
        input[type="date"] { width: 160px; }
        button { padding: 10px 20px; background: #ff9900; color: #ffffff; border: none; cursor: pointer; }
        button:hover { background: #e68a00; }
        a { color: #ff9900; margin-right: 15px; }
        img { max-width: 200px; margin: 20px 0; }
        .days-selector, .price-selector { display: flex; align-items: center; }
        .days-selector input, .price-selector input { width: 60px; margin-right: 10px; }
        .days-selector button, .price-selector button { padding: 8px 12px; font-size: 16px; }
        #funding-details, #status { margin-top: 10px; }
        #qr-code { margin: 10px 0; }
    </style>
    <link href="https://fonts.googleapis.com/css2?family=Audiowide&display=swap" rel="stylesheet">
</head>
<body>
    <img src="/logo.png" alt="NoTrust Logo">
    <h1>NoTrust: Trustless Escrow with MNEE on BSV</h1>
    <p>Create a job or service offer. Lock your stake, get paid trustlessly.</p>

    <div class="form-section">
        <h2>Seller: Post Your Service</h2>
        <form id="seller-form">
            <label for="paymail">Your PayMail or other BSV address (e.g., designer@rockwallet.com):</label>
            <input type="text" id="paymail" name="paymail" required placeholder="designer@rockwallet.com">

            <label for="description">Service Description (e.g., “Logo, PNG 500x500px”):</label>
            <textarea id="description" name="description" required placeholder="Describe your service (file type, size, etc.)"></textarea>

            <label for="expiration">Listing Expiration Date (if no Buyer found):</label>
            <input type="date" id="expiration" name="expiration" required>
            <p><small>If no Buyer funds escrow, your 20 MNEE stake is refunded after this date.</small></p>

            <label for="delivery-days">Delivery Deadline (days from escrow funding):</label>
            <div class="days-selector">
                <input type="number" id="delivery-days" name="delivery-days" min="1" required>
                <button type="button" onclick="adjustDays(-1)">-</button>
                <button type="button" onclick="adjustDays(1)">+</button>
            </div>
            <p><small>Deadline is counted in days (not hours) from when Buyer funds escrow.</small></p>

            <label for="price">Quoted Price (MNEE):</label>
            <div class="price-selector">
                <input type="number" id="price" name="price" min="20" required>
                <button type="button" onclick="adjustPrice(-1)">-</button>
                <button type="button" onclick="adjustPrice(1)">+</button>
            </div>
            <p><small>Your price includes a 10 MNEE NoTrust fee. Deposit 20 MNEE, get 10 MNEE back unless arbitration favors Buyer.</small></p>

            <button type="submit">Generate Escrow Address</button>
        </form>
        <div id="funding-details" style="display: none;">
            <p>Send 20 MNEE to: <span id="escrow-paymail"></span></p>
            <button onclick="copyAddress()">Copy Address</button>
            <div id="qr-code"></div>
            <p><a id="tx-link" href="#" target="_blank">View Transaction on WhatsOnChain</a></p>
            <button onclick="checkStatus('seller')">Refresh Status</button>
        </div>
        <div id="status"></div>
    </div>

    <p>Need MNEE? Get started with <a href="https://rockwallet.com">RockWallet</a>, <a href="https://coinex.com">CoinEx</a>, or <a href="https://changelly.com">Changelly</a>.</p>
    <p>MNEE is a stablecoin pegged 1:1 to USD.</p>
    <p><a href="/index.html">Home</a><a href="/how.html">How It Works</a><a href="/accept.html">Purchase Services</a></p>
    <p>Status updates shown below. Email confirmations coming in MVP.</p>

    <script src="https://unpkg.com/@bsv/sdk@1.0.11/dist/bsv-sdk.min.js"></script>
    <script src="https://unpkg.com/qrcode@1.5.1/qrcode.min.js"></script>
    <script src="/lock.js"></script>
    <script>
        const today = new Date().toISOString().split('T')[0];
        document.getElementById('expiration').setAttribute('min', today);

        function adjustDays(delta) {
            const input = document.getElementById('delivery-days');
            let value = parseInt(input.value || 0) + delta;
            if (value < 1) value = 1;
            input.value = value;
        }

        function adjustPrice(delta) {
            const input = document.getElementById('price');
            let value = parseInt(input.value || 0) + delta;
            if (value < 20) value = 20;
            input.value = value;
        }

        let currentTxid = '';
        document.getElementById('seller-form').addEventListener('submit', async function(e) {
            e.preventDefault();
            const paymail = document.getElementById('paymail').value;
            const description = document.getElementById('description').value;
            const expiration = document.getElementById('expiration').value;
            const deliveryDays = parseInt(document.getElementById('delivery-days').value);
            const price = parseFloat(document.getElementById('price').value);

            try {
                const result = await lockSellerStake(paymail, price, deliveryDays, description, expiration);
                currentTxid = result.txid;
                document.getElementById('escrow-paymail').innerText = result.escrowPaymail;
                document.getElementById('funding-details').style.display = 'block';
                document.getElementById('qr-code').innerHTML = '';
                new QRCode(document.getElementById('qr-code'), result.escrowPaymail);
                document.getElementById('tx-link').href = `https://whatsonchain.com/tx/${result.txid}`;
                document.getElementById('status').innerText = 'Status: Awaiting Funding';
                alert(`Send 20 MNEE to ${result.escrowPaymail} (QR below). TXID: ${result.txid}`);
            } catch (e) {
                alert('Failed to generate escrow—check console.');
            }
        });

        function copyAddress() {
            const paymail = document.getElementById('escrow-paymail').innerText;
            navigator.clipboard.writeText(paymail);
            alert('Address copied to clipboard!');
        }

        async function checkStatus(type) {
            const status = await pollMempool(currentTxid);
            document.getElementById('status').innerText = `Status: ${status === 'Confirmed' ? 'Listing Posted' : 'Awaiting Funding'}`;
        }
    </script>
</body>
</html>
