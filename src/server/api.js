const express = require('express');
const app = express();
const db = require('./db.js').connection;
const bodyParser = require('body-parser');
const cors = require('cors');

app.use(express.static(__dirname + '/public'));
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

    db.query(query, [userId, songId, userId], (err, result) => {
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
app.get('/api/:userId/favorites', (req, res) => {
    const userId = req.params.userId;

    if (!userId) {
        return res.status(400).json({ error: 'userId is required' });
    }
    const query = `SELECT allmusiclist.id, allmusiclist.imageSrc, allmusiclist.musicTime, allmusiclist.musicLink, allmusiclist.musicName, allmusiclist.artistName, allmusiclist.viewNumber 
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




// var allMusicList = [
//     ["./images/10604875_4512064.jpg", '03:42', false, false, "./musics/1.mp3", "i'm good (blue)", "david guetta & rexha", 455786346],
//     ["./images/9802046_4219738.jpg", '03:35', true, false, "./musics/2.mp3", "under the influence", "chris brown", 346780756],
//     ["./images/5237910_2688833.jpg", '03:12', false, false, "./musics/3.mp3", "forget me", "lewis capaidi", 254945867],
//     ["./images/4464775_2372686.jpg", '03:58', false, false, "./musics/4.mp3", "bad habit", "steve lacy", 103560567],
//     ["./images/10604875_4512064.jpg", '03:14', false, false, "./musics/5.mp3", "don't you worry", "black eyed, shakira & david guetta", 100000],
//     ["./images/9802046_4219738.jpg", '03:28', false, false, "./musics/6.mp3", "test", "test", 100000],
//     ["./images/5237910_2688833.jpg", '03:54', true, false, "./musics/7.mp3", "test", "test", 100000],
//     ["./images/4464775_2372686.jpg", '03:23', true, false, "./musics/8.mp3", "test", "test", 100000],
//     ["./images/10604875_4512064.jpg", '03:34', true, false, "./musics/9.mp3", "i'm good (blue)", "david guetta & rexha", 455786346],
//     ["./images/9802046_4219738.jpg", '03:12', false, false, "./musics/10.mp3", "under the influence", "chris brown", 346780756],
//     ["./images/5237910_2688833.jpg", '04:45', false, false, "./musics/11.mp3", "forget me", "lewis capaidi", 254945867],
//     ["./images/4464775_2372686.jpg", '01:02', false, false, "./musics/12.mp3", "bad habit", "steve lacy", 103560567],
//     ["./images/10604875_4512064.jpg", '02:22', true, false, "./musics/13.mp3", "don't you worry", "black eyed, shakira & david guetta", 100000],
//     ["./images/9802046_4219738.jpg", '04:55', false, false, "./musics/14.mp3", "test", "test", 100000],
//     ["./images/5237910_2688833.jpg", '30:02', false, false, "./musics/15.mp3", "test", "test", 100000],
//     ["./images/4464775_2372686.jpg", '04:32', false, false, "./musics/16.mp3", "test", "test", 100000],
//     ["./images/4464775_2372686.jpg", '03:42', true, false, "./musics/20.mp3", "weekend", "remix", 100000],
// ]