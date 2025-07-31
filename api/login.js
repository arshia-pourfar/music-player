// /api/login.js
const pool = require('./db'); // یا مسیر درست db.js خودت

export default function handler(req, res) {
    if (req.method === 'POST') {
        const { username, password } = req.body;

        // بررسی صحت ورود اطلاعات
        if (!username || !password) {
            return res.status(400).json({ success: false, message: 'Username and password are required' });
        }

        const query = "SELECT * FROM users WHERE (username = $1 OR email = $1) AND password = $2";

        pool.query(query, [username, password], (err, results) => {
            if (err) {
                console.error('Error executing query:', err);
                return res.status(500).json({ success: false, message: 'Server error' });
            }

            if (results.rows.length > 0 && results.rows[0].id !== 0) {
                return res.json({ success: true, results: results.rows });
            } else {
                return res.json({ success: false, message: 'Invalid username or password' });
            }
        });
    } else {
        res.setHeader('Allow', ['POST']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}