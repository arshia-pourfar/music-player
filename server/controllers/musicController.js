const pool = require('../models/db');

// گرفتن همه آهنگ‌ها
exports.getAllMusic = (req, res) => {
    const query = `
    SELECT DISTINCT ON (id) *
    FROM allmusiclist
    ORDER BY id
  `;
    pool.query(query, (err, results) => {
        if (err) {
            console.error("🔥 getAllMusic Error:", err);
            return res.status(500).json({ message: "Internal Server Error" });
        }
        const updated = results.rows.map((item, index) => ({ ...item, newId: index }));
        res.json(updated);
    });
};

// گرفتن آهنگ‌های ترند
exports.getTrendingMusic = (req, res) => {
    const query = `
    SELECT DISTINCT ON (id) *
    FROM allmusiclist
    WHERE isTrending = TRUE
    ORDER BY id
  `;
    pool.query(query, (err, results) => {
        if (err) {
            console.error("🔥 getTrendingMusic Error:", err);
            return res.status(500).json({ message: "Internal Server Error" });
        }
        const updated = results.rows.map((item, index) => ({ ...item, newId: index }));
        res.json(updated);
    });
};

// گرفتن هنرمندان برتر با محدودیت
exports.getTopArtists = (req, res) => {
    const limit = parseInt(req.params.limit);
    if (isNaN(limit) || limit <= 0) {
        return res.status(400).json({ message: "Invalid limit parameter" });
    }

    const query = `
        SELECT *
        FROM allmusiclist
        ORDER BY viewNumber DESC
        LIMIT $1
    `;
    pool.query(query, [limit], (err, results) => {
        if (err) {
            console.error("🔥 getTopArtists Error:", err);
            return res.status(500).json({ message: "Internal Server Error" });
        }
        res.json(results.rows);
    });
};