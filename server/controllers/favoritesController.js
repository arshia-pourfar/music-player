const pool = require('../models/db');

// جلوگیری از تکرار در لایک
exports.addFavorite = (req, res) => {
    const { userId } = req.params;
    const { songId } = req.body;
    if (!userId || !songId) return res.status(400).json({ message: 'User ID and Song ID are required' });

    const query = `
    INSERT INTO favorites (user_id, song_id)
    VALUES ($1, $2)
    ON CONFLICT (user_id, song_id) DO NOTHING
  `;
    pool.query(query, [userId, songId], (err) => {
        if (err) return res.status(500).json({ message: 'Internal Server Error' });
        res.status(201).json({ message: 'Added to favorites (or already exists)' });
    });
};

// حذف لایک
exports.removeFavorite = (req, res) => {
    const { userId } = req.params;
    const { songId } = req.body;
    const query = 'DELETE FROM favorites WHERE user_id = $1 AND song_id = $2';
    pool.query(query, [userId, songId], (err) => {
        if (err) return res.status(500).json({ message: 'Internal Server Error' });
        res.status(200).json({ message: 'Removed from favorites' });
    });
};

// گرفتن فقط آیدی آهنگ‌های لایک‌شده
exports.getFavoriteIds = (req, res) => {
    const { userId } = req.params;
    const query = 'SELECT song_id FROM favorites WHERE user_id = $1';
    pool.query(query, [userId], (err, result) => {
        if (err) return res.status(500).json({ message: 'Internal Server Error' });
        res.json(result.rows.map(row => row.song_id));
    });
};

// گرفتن لیست کامل آهنگ‌های لایک‌شده بدون تکرار
exports.getFavoriteList = (req, res) => {
    const userId = req.params.userId;
    const query = `
    SELECT DISTINCT ON (allmusiclist.id)
      allmusiclist.id,
      allmusiclist.imageSrc,
      allmusiclist.musicTime,
      allmusiclist.musicLink,
      allmusiclist.musicName,
      allmusiclist.artistName,
      allmusiclist.viewNumber
    FROM favorites
    JOIN allmusiclist ON favorites.song_id = allmusiclist.id
    WHERE favorites.user_id = $1
    ORDER BY allmusiclist.id
  `;
    pool.query(query, [userId], (err, results) => {
        if (err) return res.status(500).json({ message: "Internal Server Error" });
        const updated = results.rows.map((item, index) => ({ ...item, newId: index }));
        res.json(updated);
    });
};