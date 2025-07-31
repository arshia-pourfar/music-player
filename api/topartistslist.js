// /api/topartistslist.js
const pool = require('./db'); // فرض می‌کنیم db.js در همان پوشه است

export default async function handler(req, res) {
    if (req.method === 'GET') {
        const { limit } = req.query;
        console.log(limit);

        if (!limit) {
            return res.status(400).json({ message: 'Limit is required' });
        }

        try {
            const results = await pool.query('SELECT * FROM allmusiclist ORDER BY viewNumber DESC LIMIT $1', [parseInt(limit)]);
            res.status(200).json(results.rows);
        } catch (error) {
            console.error('Error fetching top artists:', error);
            res.status(500).json({ message: 'Internal Server Error' });
        }
    } else {
        res.setHeader('Allow', ['GET']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}
