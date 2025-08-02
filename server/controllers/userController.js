const pool = require('../models/db');
const bcrypt = require('bcrypt');

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
        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.status(401).json({ success: false, message: 'Invalid username or password' });
        }

        // در اینجا می‌تونی توکن JWT بسازی یا session ایجاد کنی
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

        // هش کردن رمز عبور
        const hashedPassword = await bcrypt.hash(password, 10);

        const insertQuery = "INSERT INTO users (username, email, password) VALUES ($1, $2, $3)";
        await pool.query(insertQuery, [username, email, hashedPassword]);

        res.status(201).json({ message: 'User registered successfully' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};