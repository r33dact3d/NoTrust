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
            <p><small>Deadline is counted in days (not hours) from when Buyer funds escrow
