const { pool } = require('../../db.js'); // اتصال به دیتابیس


export default function handler(req, res) {
    const { userId } = req.query; // دریافت userId از URL
    const { songId } = req.body;

    if (!userId) {
        return res.status(400).json({ message: 'User ID is required' });
    }

    if (req.method === 'POST') {
        // const { songId } = req.body;

        if (!songId) {
            return res.status(400).json({ message: 'Song ID is required' });
        }

        const query = 'INSERT INTO favorites (user_id, song_id) VALUES ($1, $2)';
        pool.query(query, [userId, songId], (err, result) => {
            if (err) {
                console.error(err);
                return res.status(500).json({ message: 'Internal Server Error' });
            }
            res.status(201).json({ message: 'Added to favorites' });
        });

    } else if (req.method === 'DELETE') {
        // const { songId } = req.body;

        const query = 'DELETE FROM favorites WHERE user_id = $1 AND song_id = $2';
        pool.query(query, [userId, songId], (err, result) => {
            if (err) {
                console.error(err);
                return res.status(500).json({ message: 'Internal Server Error' });
            }
            res.status(200).json({ message: 'Removed from favorites' });
        });

    } else if (req.method === 'GET') {
        const query = `SELECT allmusiclist.id, allmusiclist.imageSrc, allmusiclist.musicTime, allmusiclist.musicLink, allmusiclist.musicName, allmusiclist.artistName, allmusiclist.viewNumber
        FROM favorites
        JOIN allmusiclist ON favorites.song_id = allmusiclist.id
        WHERE favorites.user_id = $1`;

        pool.query(query, [userId, songId], (err, result) => {
            if (err) {
                console.error(err);
                return res.status(500).json({ message: 'Internal Server Error' });
            }
            res.status(200).json({ message: 'Removed from favorites' });
        });

    } else {
        res.setHeader('Allow', ['POST', 'DELETE', 'GET']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}