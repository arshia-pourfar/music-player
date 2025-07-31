// /api/register.js
const pool = require('./db'); // اتصال به دیتابیس

export default function handler(req, res) {
    if (req.method === 'POST') {
        const { username, email, password } = req.body;

        // بررسی صحت ورود اطلاعات
        if (!username || !email || !password) {
            return res.status(400).json({ message: 'Username, email, and password are required' });
        }

        const query = "INSERT INTO users (username, email, password) VALUES ($1, $2, $3)";

        pool.query(query, [username, email, password], (err, result) => {
            if (err) {
                console.error(err);
                return res.status(500).json({ message: 'Internal Server Error' });
            }
            res.status(201).json({ message: 'User registered successfully', redirect: '/User' });
        });
    } else {
        res.setHeader('Allow', ['POST']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}