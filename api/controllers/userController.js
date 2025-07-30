const pool = require('../models/db');

exports.login = (req, res) => {
    const { username, password } = req.body;
    const query = "SELECT * FROM users WHERE (username = $1 OR email = $1) AND password = $2";
    pool.query(query, [username, password], (err, results) => {
        if (err) return res.status(500).json({ success: false, message: 'Server error' });
        if (results.rows.length > 0) {
            res.json({ success: true, results: results.rows });
        } else {
            res.json({ success: false, message: 'Invalid username or password' });
        }
    });
};

exports.register = (req, res) => {
    const { username, email, password } = req.body;
    const query = "INSERT INTO users (username, email, password) VALUES ($1, $2, $3)";
    pool.query(query, [username, email, password], (err) => {
        if (err) return res.status(500).json({ message: 'Internal Server Error' });
        res.status(201).json({ message: 'User registered successfully' });
    });
};