// /api/[userId]/favoriteslist.js
const pool = require('./db'); // اتصال به دیتابیس

export default async function handler(req, res) {
    const { userId } = req.query;

    if (req.method !== 'GET') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    if (!userId) {
        return res.status(400).json({ error: 'userId is required' });
    }

    const query = `SELECT allmusiclist.id, allmusiclist.imageSrc, allmusiclist.musicTime, allmusiclist.musicLink, allmusiclist.musicName, allmusiclist.artistName, allmusiclist.viewNumber
                    FROM favorites
                    JOIN allmusiclist ON favorites.song_id = allmusiclist.id
                    WHERE favorites.user_id = $1`;

    try {
        const { rows } = await pool.query(query, [userId]);

        console.log(rows);

        const updatedResult = rows.map((item, index) => ({
            ...item,
            newId: index
        }));
        console.log(updatedResult);

        return res.status(200).json(updatedResult);
    } catch (err) {
        console.error('Error querying the database:', err);
        return res.status(500).json({ message: "Internal Server Error" });
    }
}
