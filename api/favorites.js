const { pool } = require('./db.js'); // اتصال به دیتابیس

export default async function handler(req, res) {
    const { userId } = req.query; // گرفتن userId از query parameters

    if (!userId) {
        return res.status(400).json({ message: 'User ID is required' });
    }

    if (req.method === 'POST') {
        // افزودن به موارد مورد علاقه
        const { songId } = req.body;

        if (!songId) {
            return res.status(400).json({ message: 'Song ID is required' });
        }

        const query = 'INSERT INTO favorites (user_id, song_id) VALUES ($1, $2) ON CONFLICT (user_id, song_id) DO NOTHING';

        pool.query(query, [userId, songId], (err, result) => {
            if (err) {
                console.error(err);
                return res.status(500).json({ message: 'Internal Server Error' });
            }
            res.status(201).json({ message: 'Added to favorites' });
        });

    } else if (req.method === 'DELETE') {
        // حذف از موارد مورد علاقه
        const { songId } = req.body;

        if (!songId) {
            return res.status(400).json({ message: 'Song ID is required' });
        }

        const query = 'DELETE FROM favorites WHERE user_id = $1 AND song_id = $2';
        pool.query(query, [userId, songId], (err, result) => {
            if (err) {
                console.error(err);
                return res.status(500).json({ message: 'Internal Server Error' });
            }
            res.status(200).json({ message: 'Removed from favorites' });
        });

    } else if (req.method === 'GET') {
        // دریافت موارد مورد علاقه کاربر یا گرفتن لیست کامل
        const isUpdate = req.query.update; // چک کردن اینکه این درخواست برای "favorites/update" است

        if (isUpdate) {
            const query = 'SELECT song_id FROM favorites WHERE user_id = $1';
            pool.query(query, [userId], (err, result) => {
                if (err) {
                    console.error(err);
                    return res.status(500).json({ message: 'Internal Server Error' });
                }
                res.json(result.rows.map(row => row.song_id));
            });
        } else {
            const query = `SELECT allmusiclist.id, allmusiclist.imageSrc, allmusiclist.musicTime, allmusiclist.musicLink, allmusiclist.musicName, allmusiclist.artistName, allmusiclist.viewNumber
                           FROM favorites
                           JOIN allmusiclist ON favorites.song_id = allmusiclist.id
                           WHERE favorites.user_id = $1`;

            pool.query(query, [userId], (err, results) => {
                if (err) {
                    console.error(err);
                    return res.status(500).json({ message: "Internal Server Error" });
                }
                const updatedResult = results.rows.map((item, index) => ({
                    ...item,
                    newId: index
                }));

                res.json(updatedResult);
            });
        }

    } else {
        res.setHeader('Allow', ['GET', 'POST', 'DELETE']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}
