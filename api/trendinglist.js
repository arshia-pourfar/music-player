const { pool } = require('./db.js');

export default async function handler(req, res) {
    console.log('sdcscsdcsdcdscds');
    if (req.method === 'GET') {
    console.log('sdcscsdcsdcdscds');
        try {
            const result = await pool.query('SELECT * FROM allmusiclist WHERE isTrending=TRUE ORDER BY id');
            const updatedResult = result.rows.map((item, index) => ({
                ...item,
                newId: index
            }));
            res.status(200).json(updatedResult);
        } catch (error) {
            console.error('Error fetching trending list:', error);
            res.status(500).json({ message: "Internal Server Error" });
        }
    } else {
        res.setHeader('Allow', ['GET']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}