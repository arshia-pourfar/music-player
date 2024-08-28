const { pool } = require('./db.js'); // اتصال به دیتابیس

export default function handler(req, res) {
    console.log('sdcscsdcsdcdscds');
    // بررسی نوع متد HTTP
    // if (req.method === 'GET') {
    const limit = parseInt(req.query.limit); // دریافت پارامتر limit از query

    if (isNaN(limit)) {
        return res.status(400).json({ message: "Invalid limit parameter" });
    }

    pool.query('SELECT * FROM allmusiclist ORDER BY viewNumber DESC LIMIT $1', [limit], (err, results) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ message: "Internal Server Error" });
        }
        res.json(results.rows);
    });

    // } else {
    //     // اگر نوع متد پشتیبانی نمی‌شود
    //     res.setHeader('Allow', ['GET']);
    //     res.status(405).end(`Method ${req.method} Not Allowed`);
    // }
}