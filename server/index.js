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

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});