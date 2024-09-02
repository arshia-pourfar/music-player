// // POSTGRESSQL IN VERCEL
// const express = require('express');
// const app = express();
// const { pool } = require('./db.js'); // استفاده از pool به جای connection
// const bodyParser = require('body-parser');
// const cors = require('cors');

// app.use(express.static(__dirname + 'build'));
// app.use(bodyParser.urlencoded({ extended: true }));
// app.use(bodyParser.json());
// app.use(cors());
// // API برای دریافت لیست همه آهنگها
// app.get('/api/allmusiclist', (req, res) => {
//     // console.log('sd');
//     pool.query('SELECT * FROM allmusiclist', (err, results) => {
//         if (err) {
//             console.error(err);
//             return res.status(500).json({ message: "Internal Server Error" });
//         }
//         const updatedResult = results.rows.map((item, index) => ({
//             ...item,
//             newId: index
//         }));
//         // console.log(updatedResult);

//         res.json(updatedResult);
//     });
// });

// // API برای دریافت لیست آهنگهای ترند
// app.get('/api/trendinglist', (req, res) => {
//     pool.query('SELECT * FROM allmusiclist WHERE isTrending=TRUE ORDER BY id', (err, results) => {
//         if (err) {
//             console.error(err);
//             return res.status(500).json({ message: "Internal Server Error" });
//         }

//         // // بررسی می‌کنیم که نتایج یک آرایه هستند
//         // const rows = results.rows; // یا `results` در صورتی که در نسخه pg متفاوت باشد
//         // if (!Array.isArray(rows)) {
//         //     console.error('Unexpected results format:', rows);
//         //     return res.status(500).json({ message: "Unexpected result from database" });
//         // }

//         // ایجاد آی‌دی جدید از صفر
//         const updatedResult = results.rows.map((item, index) => ({
//             ...item,
//             newId: index // یا هر نامی که برای آی‌دی جدید استفاده می‌کنید
//         }));

//         res.json(updatedResult);
//     });
// });

// // API برای دریافت لیست برترین هنرمندان
// app.get('/api/topartistslist/:limit', (req, res) => {
//     const limit = parseInt(req.params.limit);

//     pool.query('SELECT * FROM allmusiclist ORDER BY viewNumber DESC LIMIT $1', [limit], (err, results) => {
//         if (err) {
//             console.error(err);
//             return res.status(500).json({ message: "Internal Server Error" });
//         }
//         res.json(results.rows);
//     });
// });

// // افزودن به موارد مورد علاقه
// app.post('/api/:userId/favorites/update', (req, res) => {
//     const { userId } = req.params;
//     const { songId } = req.body;

//     if (!userId || !songId) {
//         return res.status(400).json({ message: 'User ID and Song ID are required' });
//     }

//     // const query = 'INSERT INTO favorites (user_id, song_id) VALUES ($1, $2) ON CONFLICT (user_id, song_id) DO NOTHING';
//     const query = 'INSERT INTO favorites (user_id, song_id) VALUES ($1, $2)';

//     pool.query(query, [userId, songId], (err, result) => {
//         if (err) {
//             console.error(err);
//             return res.status(500).json({ message: 'Internal Server Error' });
//         }
//         res.status(201).json({ message: 'Added to favorites' });
//     });
// });

// // حذف از موارد مورد علاقه
// app.delete('/api/:userId/favorites/update', (req, res) => {
//     const { userId } = req.params;
//     const { songId } = req.body;

//     const query = 'DELETE FROM favorites WHERE user_id = $1 AND song_id = $2';
//     pool.query(query, [userId, songId], (err, result) => {
//         if (err) {
//             console.error(err);
//             return res.status(500).json({ message: 'Internal Server Error' });
//         }
//         res.status(200).json({ message: 'Removed from favorites' });
//     });
// });

// // دریافت موارد مورد علاقه کاربر
// app.get('/api/:userId/favorites/update', (req, res) => {
//     const { userId } = req.params;

//     if (!userId) {
//         return res.status(400).json({ message: 'User ID is required' });
//     }

//     const query = 'SELECT song_id FROM favorites WHERE user_id = $1';
//     pool.query(query, [userId], (err, result) => {
//         if (err) {
//             console.error(err);
//             return res.status(500).json({ message: 'Internal Server Error' });
//         }
//         res.json(result.rows.map(row => row.song_id));
//     });
// });

// // گرفتن لیست مورد علاقه از دیتابیس نسبت به آی‌دی کاربر
// app.get('/api/:userId/favoriteslist', (req, res) => {
//     const userId = req.params.userId;

//     if (!userId) {
//         return res.status(400).json({ error: 'userId is required' });
//     }
//     const query = `SELECT allmusiclist.id, allmusiclist.imageSrc, allmusiclist.musicTime, allmusiclist.musicLink, allmusiclist.musicName, allmusiclist.artistName, allmusiclist.viewNumber
//                     FROM favorites
//                     JOIN allmusiclist ON favorites.song_id = allmusiclist.id
//                     WHERE favorites.user_id = $1`;

//     pool.query(query, [userId], (err, results) => {
//         if (err) {
//             console.error(err);
//             return res.status(500).json({ message: "Internal Server Error" });
//         }
//         const updatedResult = results.rows.map((item, index) => ({
//             ...item,
//             newId: index
//         }));

//         res.json(updatedResult);

//     });
// });

// // API برای لاگین کاربر
// app.post('/api/login', (req, res) => {
//     const { username, password } = req.body;

//     if (!username || !password) {
//         return res.status(400).json({ success: false, message: 'Username and password are required' });
//     }

//     const query = "SELECT * FROM users WHERE (username = $1 OR email = $1) AND password = $2";

//     pool.query(query, [username, password], (err, results) => {
//         if (err) {
//             console.error('Error executing query:', err);
//             return res.status(500).json({ success: false, message: 'Server error' });
//         }

//         if (results.rows.length > 0 && results.rows[0].id !== 0) {
//             return res.json({ success: true, results: results.rows });
//         } else {
//             return res.json({ success: false, message: 'Invalid username or password' });
//         }
//     });
// });

// // API برای ثبت‌نام کاربر
// app.post('/api/register', (req, res) => {
//     const { username, email, password } = req.body;
//     const query = "INSERT INTO users (username, email, password) VALUES ($1, $2, $3)";

//     pool.query(query, [username, email, password], (err, result) => {
//         if (err) {
//             console.error(err);
//             return res.status(500).json({ message: 'Internal Server Error' });
//         }
//         res.status(201).json({ message: 'User registered successfully', redirect: '/User' });
//     });
// });

// app.listen(5000, () => {
//     console.log('Server is running on port 5000');
// });

// MYSQL IN LOCALHOST
const express = require('express');
const app = express();
const db = require('./db.js').connection;
const bodyParser = require('body-parser');
const cors = require('cors');

app.use(express.static(__dirname + 'build'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());

// API برای دریافت لیست همه آهنگها
app.get('/api/allmusiclist', (req, res) => {
    db.query('SELECT * FROM allmusiclist', (err, results) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ message: "Internal Server Error" });
        }
        // ایجاد آی‌دی جدید از صفر
        const updatedResult = results.map((item, index) => ({
            ...item,
            newId: index // یا هر نامی که برای آی‌دی جدید استفاده می‌کنید
        }));

        res.json(updatedResult);
    });
});

// API برای دریافت لیست آهنگهای ترند
app.get('/api/trendinglist', (req, res) => {
    db.query('SELECT * FROM allmusiclist WHERE isTrending=1 ORDER BY id', (err, results) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ message: "Internal Server Error" });
        }
        // ایجاد آی‌دی جدید از صفر
        const updatedResult = results.map((item, index) => ({
            ...item,
            newId: index // یا هر نامی که برای آی‌دی جدید استفاده می‌کنید
        }));

        res.json(updatedResult);
    });
});

// API برای دریافت لیست برترین هنرمندان
app.get('/api/topartistslist/:limit/', (req, res) => {
    const limit = parseInt(req.params.limit);

    db.query('SELECT * FROM allmusiclist ORDER BY viewNumber DESC LIMIT ?', [limit], (err, results) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ message: "Internal Server Error" });
        }
        res.json(results);
    });
});

// افزودن به موارد مورد علاقه
app.post('/api/:userId/favorites/update', (req, res) => {
    const { userId } = req.params;
    const { songId } = req.body;

    if (!userId || !songId) {
        return res.status(400).json({ message: 'User ID and Song ID are required' });
    }

    // محاسبه newId به صورت پویا
    // const query = `
    //     INSERT INTO favorites (user_id, song_id, newId)
    //     SELECT ?, ?, COALESCE(MAX(newId) + 1, 0)
    //     FROM favorites
    //     WHERE user_id = ?
    //     ON DUPLICATE KEY UPDATE song_id = song_id
    // `;
    const query = 'INSERT INTO favorites (user_id, song_id) VALUES (?, ?)';

    db.query(query, [userId, songId], (err, result) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ message: 'Internal Server Error' });
        }
        res.status(201).json({ message: 'Added to favorites' });
    });
});

// حذف از موارد مورد علاقه
app.delete('/api/:userId/favorites/update', (req, res) => {
    const { userId } = req.params;
    const { songId } = req.body;

    const query = 'DELETE FROM favorites WHERE user_id = ? AND song_id = ?';
    db.query(query, [userId, songId], (err, result) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ message: 'Internal Server Error' });
        }
        res.status(200).json({ message: 'Removed from favorites' });
    });
});

// دریافت موارد مورد علاقه کاربر
app.get('/api/:userId/favorites/update', (req, res) => {
    const { userId } = req.params;

    if (!userId) {
        return res.status(400).json({ message: 'User ID is required' });
    }

    const query = 'SELECT song_id FROM favorites WHERE user_id = ?';
    db.query(query, [userId], (err, result) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ message: 'Internal Server Error' });
        }
        res.json(result.map(row => row.song_id));
    });
});


// // گرفتن لیست مورد علاقه از دیتا بیس نسبت به ایدی کاربر
app.get('/api/:userId/favoriteslist', (req, res) => {
    const userId = req.params.userId;

    if (!userId) {
        return res.status(400).json({ error: 'userId is required' });
    }
    const query = `SELECT allmusiclist.id, allmusiclist.imagesrc, allmusiclist.musictime, allmusiclist.musiclink, allmusiclist.musicname, allmusiclist.artistname, allmusiclist.viewnumber
                    FROM favorites
                    JOIN allmusiclist ON favorites.song_id = allmusiclist.id
                    WHERE favorites.user_id = ?`;

    db.query(query, [userId], (err, results) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ message: "Internal Server Error" });
        }
        // ایجاد آی‌دی جدید از صفر
        const updatedResult = results.map((item, index) => ({
            ...item,
            newId: index // یا هر نامی که برای آی‌دی جدید استفاده می‌کنید
        }));

        res.json(updatedResult);

    });
});

// API برای لاگین کاربر
app.post('/api/login', (req, res) => {
    const { username, password } = req.body;

    if (!username || !password) {
        return res.status(400).json({ success: false, message: 'Username and password are required' });
    }

    const query = "SELECT * FROM users WHERE (username = ? OR email = ?) AND password = ?";

    db.query(query, [username, username, password], (err, results) => {
        if (err) {
            console.error('Error executing query:', err);
            return res.status(500).json({ success: false, message: 'Server error' });
        }

        if (results.length > 0 && results[0].id !== 0) {
            return res.json({ success: true, results });
        } else {
            return res.json({ success: false, message: 'Invalid username or password' });
        }
    });
});


// API برای ثبت‌نام کاربر
app.post('/api/register', (req, res) => {
    const { username, email, password } = req.body;
    const values = [[username, email, password]];
    const query = "INSERT INTO users (username, email, password) VALUES ?";

    db.query(query, [values], (err, result) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ message: 'Internal Server Error' });
        }
        res.status(201).json({ message: 'User registered successfully', redirect: '/User' });
    });
});

app.listen(5000, () => {
    console.log('Server is running on port 5000');
});