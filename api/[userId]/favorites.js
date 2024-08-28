const { pool } = require('../db.js'); // اتصال به دیتابیس

export default async function handler(req, res) {
    const {
        query: { userId },
        method,
    } = req;

    // بررسی متد درخواست
    if (method === 'GET') {
        // دریافت لیست علاقه‌مندی‌ها بر اساس userId
        if (!userId) {
            return res.status(400).json({ error: 'userId is required' });
        }

        const query = `
            SELECT allmusiclist.id, allmusiclist.imageSrc, allmusiclist.musicTime, allmusiclist.musicLink, allmusiclist.musicName, allmusiclist.artistName, allmusiclist.viewNumber
            FROM favorites
            JOIN allmusiclist ON favorites.song_id = allmusiclist.id
            WHERE favorites.user_id = $1
        `;

        try {
            const { rows } = await pool.query(query, [userId]);
            const updatedResult = rows.map((item, index) => ({
                ...item,
                newId: index
            }));
            res.status(200).json(updatedResult);
        } catch (error) {
            console.error('Database query error:', error);
            res.status(500).json({ message: 'Internal Server Error' });
        }
    } else {
        // متدهای دیگر HTTP را مدیریت کنید
        res.setHeader('Allow', ['GET']);
        res.status(405).end(`Method ${method} Not Allowed`);
    }
}