// /api/[userId]/favorites/update.js
const pool = require('../../db'); // اتصال به دیتابیس

export default async function handler(req, res) {
    const { userId } = req.query;

    if (req.method === 'POST') {
        const { songId } = req.body;

        if (!userId || !songId) {
            return res.status(400).json({ message: 'User ID and Song ID are required' });
        }

        const query = `
          INSERT INTO favorites (user_id, song_id)
          VALUES ($1, $2)
          ON CONFLICT (user_id, song_id) DO NOTHING
        `;

        try {
            await pool.query(query, [userId, songId]);
            return res.status(201).json({ message: 'Added to favorites (or already exists)' });
        } catch (err) {
            console.error(err);
            return res.status(500).json({ message: 'Internal Server Error' });
        }
    }
    if (req.method === 'DELETE') {
        const { songId } = req.body;

        if (!userId || !songId) {
            return res.status(400).json({ message: 'User ID and Song ID are required' });
        }

        const query = 'DELETE FROM favorites WHERE user_id = $1 AND song_id = $2';

        try {
            await pool.query(query, [userId, songId]);
            return res.status(200).json({ message: 'Removed from favorites' });
        } catch (err) {
            console.error(err);
            return res.status(500).json({ message: 'Internal Server Error' });
        }
    }

    if (req.method === 'GET') {
        if (!userId) {
            return res.status(400).json({ message: 'User ID is required' });
        }

        const query = 'SELECT song_id FROM favorites WHERE user_id = $1';

        try {
            const result = await pool.query(query, [userId]);
            return res.json(result.rows.map(row => row.song_id));
        } catch (err) {
            console.error(err);
            return res.status(500).json({ message: 'Internal Server Error' });
        }
    }

    return res.status(405).json({ message: 'Method not allowed' });
}