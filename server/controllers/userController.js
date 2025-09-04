const pool = require('../models/db');

// ورود کاربر
exports.login = async (req, res) => {
    const { username, password } = req.body;

    const query = "SELECT * FROM users WHERE username = $1 OR email = $1";
    try {
        const result = await pool.query(query, [username]);

        if (result.rows.length === 0) {
            return res.status(401).json({ success: false, message: 'Invalid username or password' });
        }

        const user = result.rows[0];

        // مقایسه مستقیم پسورد
        if (password !== user.password) {
            return res.status(401).json({ success: false, message: 'Invalid username or password' });
        }

        res.json({ success: true, user: { id: user.id, username: user.username, email: user.email } });
    } catch (err) {
        console.error(err);
        res.status(500).json({ success: false, message: 'Server error' });
    }
};

// ثبت‌نام کاربر
exports.register = async (req, res) => {
    const { username, email, password } = req.body;

    try {
        // بررسی وجود کاربر
        const checkQuery = "SELECT * FROM users WHERE username = $1 OR email = $2";
        const checkResult = await pool.query(checkQuery, [username, email]);

        if (checkResult.rows.length > 0) {
            return res.status(409).json({ message: 'Username or email already exists' });
        }

        // ذخیره پسورد خام
        const insertQuery = "INSERT INTO users (username, email, password) VALUES ($1, $2, $3)";
        await pool.query(insertQuery, [username, email, password]);

        res.status(201).json({ message: 'User registered successfully' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};
