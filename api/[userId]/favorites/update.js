// /api/[userId]/favorites/update.js
import pool from '../../../../db'; // مسیر صحیح ESModule برای Next.js API Routes

export default async function handler(req, res) {
    const { userId } = req.query;

    if (!userId) {
        return res.status(400).json({ message: 'User ID is required' });
    }

    try {
        if (req.method === 'POST') {
            const { songId } = req.body;

            if (!songId) {
                return res.status(400).json({ message: 'Song ID is required' });
            }

            const query = `
                INSERT INTO favorites (user_id, song_id)
                VALUES ($1, $2)
                ON CONFLICT (user_id, song_id) DO NOTHING
            `;
            await pool.query(query, [userId, songId]);

            return res.status(201).json({ message: 'Added to favorites (or already exists)' });
        }

        if (req.method === 'DELETE') {
            const { songId } = req.body;

            if (!songId) {
                return res.status(400).json({ message: 'Song ID is required' });
            }

            const query = 'DELETE FROM favorites WHERE user_id = $1 AND song_id = $2';
            await pool.query(query, [userId, songId]);

            return res.status(200).json({ message: 'Removed from favorites' });
        }

        if (req.method === 'GET') {
            const query = 'SELECT song_id FROM favorites WHERE user_id = $1';
            const result = await pool.query(query, [userId]);

            return res.status(200).json(result.rows.map(row => row.song_id));
        }

        return res.status(405).json({ message: 'Method not allowed' });
    } catch (err) {
        console.error('Database error:', err);
        return res.status(500).json({ error: err.message, stack: err.stack });
    }
}
