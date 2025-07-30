const express = require('express');
const cors = require('cors');
const pool = require('../../models/db');  // مسیر را درست کن بر اساس ساختار
const musicRoutes = require('../../routes/musicRoutes');
const favoritesRoutes = require('../../routes/favoritesRoutes');
const userRoutes = require('../../routes/userRoutes');

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api', musicRoutes);
app.use('/api', favoritesRoutes);
app.use('/api', userRoutes);

app.get('/test-db', async (req, res) => {
    try {
        const result = await pool.query('SELECT NOW()');
        res.json(result.rows[0]);
    } catch (err) {
        console.error('DB Error:', err);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});

module.exports = app; // **بجای app.listen**

