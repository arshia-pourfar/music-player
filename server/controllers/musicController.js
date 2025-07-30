const pool = require('../models/db');

exports.getAllMusic = (req, res) => {
    pool.query('SELECT * FROM allmusiclist', (err, results) => {
        if (err) return res.status(500).json({ message: "Internal Server Error" });
        const updated = results.rows.map((item, index) => ({ ...item, newId: index }));
        res.json(updated);
    });
};

exports.getTrendingMusic = (req, res) => {
    pool.query('SELECT * FROM allmusiclist WHERE isTrending=TRUE ORDER BY id', (err, results) => {
        if (err) {
            console.error("🔥 SQL Error:", err);
            return res.status(500).json({ message: "Internal Server Error" });
        }
        const updated = results.rows.map((item, index) => ({ ...item, newId: index }));
        res.json(updated);
    });
};

exports.getTopArtists = (req, res) => {
    const limit = parseInt(req.params.limit);
    pool.query('SELECT * FROM allmusiclist ORDER BY viewNumber DESC LIMIT $1', [limit], (err, results) => {
        if (err) return res.status(500).json({ message: "Internal Server Error" });
        res.json(results.rows);
    });
};