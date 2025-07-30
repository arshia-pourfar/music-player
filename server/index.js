const express = require('express');
const cors = require('cors');
const pool = require('./models/db');
const musicRoutes = require('./routes/musicRoutes');
const favoritesRoutes = require('./routes/favoritesRoutes');
const userRoutes = require('./routes/userRoutes');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// روت‌های اصلی
app.use('/api', musicRoutes);
app.use('/api', favoritesRoutes);
app.use('/api', userRoutes);

// تست اتصال به دیتابیس
app.get('/test-db', async (req, res) => {
    try {
        const result = await pool.query('SELECT NOW()');
        res.json(result.rows[0]);
    } catch (err) {
        console.error('DB Error:', err);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
