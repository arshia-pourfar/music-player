const express = require('express');
const cors = require('cors');
const { Pool } = require('pg');

const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: { rejectUnauthorized: false },
});

const app = express();

app.use(cors({
    origin: process.env.NODE_ENV === 'production'
        ? 'https://music-player-eight-red.vercel.app'
        : '*',
}));
app.use(express.json());
// --- کنترلرها ---
// Favorites Controller
const addFavorite = (req, res) => {
    const { userId } = req.params;
    const { songId } = req.body;
    if (!userId || !songId)
        return res.status(400).json({ message: 'User ID and Song ID are required' });

    const query = 'INSERT INTO favorites (user_id, song_id) VALUES ($1, $2)';
    pool.query(query, [userId, songId], (err) => {
        if (err) return res.status(500).json({ message: 'Internal Server Error' });
        res.status(201).json({ message: 'Added to favorites' });
    });
};

const removeFavorite = (req, res) => {
    const { userId } = req.params;
    const { songId } = req.body;
    const query = 'DELETE FROM favorites WHERE user_id = $1 AND song_id = $2';
    pool.query(query, [userId, songId], (err) => {
        if (err) return res.status(500).json({ message: 'Internal Server Error' });
        res.status(200).json({ message: 'Removed from favorites' });
    });
};

const getFavoriteIds = (req, res) => {
    const { userId } = req.params;
    const query = 'SELECT song_id FROM favorites WHERE user_id = $1';
    pool.query(query, [userId], (err, result) => {
        if (err) return res.status(500).json({ message: 'Internal Server Error' });
        res.json(result.rows.map(row => row.song_id));
    });
};

const getFavoriteList = (req, res) => {
    const { userId } = req.params;
    const query = `
    SELECT allmusiclist.id, allmusiclist.imageSrc, allmusiclist.musicTime, 
           allmusiclist.musicLink, allmusiclist.musicName, 
           allmusiclist.artistName, allmusiclist.viewNumber
    FROM favorites
    JOIN allmusiclist ON favorites.song_id = allmusiclist.id
    WHERE favorites.user_id = $1
  `;
    pool.query(query, [userId], (err, results) => {
        if (err) return res.status(500).json({ message: "Internal Server Error" });
        const updated = results.rows.map((item, index) => ({ ...item, newId: index }));
        res.json(updated);
    });
};

// Music Controller
const getAllMusic = (req, res) => {
    pool.query('SELECT * FROM allmusiclist', (err, results) => {
        if (err) return res.status(500).json({ message: "Internal Server Error" });
        const updated = results.rows.map((item, index) => ({ ...item, newId: index }));
        res.json(updated);
    });
};

const getTrendingMusic = (req, res) => {
    pool.query('SELECT * FROM allmusiclist WHERE isTrending=TRUE ORDER BY id', (err, results) => {
        if (err) {
            console.error("🔥 SQL Error:", err);
            return res.status(500).json({ message: "Internal Server Error" });
        }
        const updated = results.rows.map((item, index) => ({ ...item, newId: index }));
        res.json(updated);
    });
};

const getTopArtists = (req, res) => {
    const limit = parseInt(req.params.limit);
    pool.query('SELECT * FROM allmusiclist ORDER BY viewNumber DESC LIMIT $1', [limit], (err, results) => {
        if (err) return res.status(500).json({ message: "Internal Server Error" });
        res.json(results.rows);
    });
};

// User Controller
const login = (req, res) => {
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

const register = (req, res) => {
    const { username, email, password } = req.body;
    const query = "INSERT INTO users (username, email, password) VALUES ($1, $2, $3)";
    pool.query(query, [username, email, password], (err) => {
        if (err) return res.status(500).json({ message: 'Internal Server Error' });
        res.status(201).json({ message: 'User registered successfully' });
    });
};

// --- Routes ---

// Favorites
app.post('/:userId/favorites/update', addFavorite);
app.delete('/:userId/favorites/update', removeFavorite);
app.get('/:userId/favorites/update', getFavoriteIds);
app.get('/:userId/favoriteslist', getFavoriteList);

// Music
app.get('/allmusiclist', getAllMusic);
app.get('/trendinglist', getTrendingMusic);
app.get('/topartistslist/:limit', getTopArtists);

// User
app.post('/login', login);
app.post('/register', register);

// اجرا روی لوکال
if (require.main === module) {
    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
    });
}

module.exports = app;