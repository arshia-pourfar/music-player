const pool = require('../models/db');

exports.addFavorite = (req, res) => {
    const { userId } = req.params;
    const { songId } = req.body;
    if (!userId || !songId) return res.status(400).json({ message: 'User ID and Song ID are required' });

    const query = 'INSERT INTO favorites (user_id, song_id) VALUES ($1, $2)';
    pool.query(query, [userId, songId], (err) => {
        if (err) return res.status(500).json({ message: 'Internal Server Error' });
        res.status(201).json({ message: 'Added to favorites' });
    });
};

exports.removeFavorite = (req, res) => {
    const { userId } = req.params;
    const { songId } = req.body;
    const query = 'DELETE FROM favorites WHERE user_id = $1 AND song_id = $2';
    pool.query(query, [userId, songId], (err) => {
        if (err) return res.status(500).json({ message: 'Internal Server Error' });
        res.status(200).json({ message: 'Removed from favorites' });
    });
};

exports.getFavoriteIds = (req, res) => {
    const { userId } = req.params;
    const query = 'SELECT song_id FROM favorites WHERE user_id = $1';
    pool.query(query, [userId], (err, result) => {
        if (err) return res.status(500).json({ message: 'Internal Server Error' });
        res.json(result.rows.map(row => row.song_id));
    });
};

exports.getFavoriteList = (req, res) => {
    const userId = req.params.userId;
    const query = `SELECT allmusiclist.id, allmusiclist.imageSrc, allmusiclist.musicTime, allmusiclist.musicLink, allmusiclist.musicName, allmusiclist.artistName, allmusiclist.viewNumber
                 FROM favorites
                 JOIN allmusiclist ON favorites.song_id = allmusiclist.id
                 WHERE favorites.user_id = $1`;
    pool.query(query, [userId], (err, results) => {
        if (err) return res.status(500).json({ message: "Internal Server Error" });
        const updated = results.rows.map((item, index) => ({ ...item, newId: index }));
        res.json(updated);
    });
};