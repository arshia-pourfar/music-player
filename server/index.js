const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
require('dotenv').config();

const pool = require('./models/db');
const musicRoutes = require('./routes/musicRoutes');
const favoritesRoutes = require('./routes/favoritesRoutes');
const userRoutes = require('./routes/userRoutes');

const app = express();
const PORT = process.env.PORT;

// ✅ Middlewareهای امنیتی و لاگ
app.use(cors({ origin: process.env.CLIENT_ORIGIN || '*' }));
app.use(helmet()); // امنیت هدرها
app.use(morgan('dev')); // لاگ درخواست‌ها
app.use(express.json()); // پارس JSON

// ✅ تست اتصال به دیتابیس
pool.connect((err, client, release) => {
    if (err) {
        console.error('❌ Database connection error:', err.stack);
    } else {
        console.log('✅ Connected to PostgreSQL');
        release();
    }
});

// ✅ روت‌های اصلی با namespace واضح
app.use('/api', musicRoutes);
app.use('/api', favoritesRoutes);
app.use('/api', userRoutes);

// ✅ هندل خطاهای 404
app.use((req, res) => {
    res.status(404).json({ message: 'Route not found' });
});

// ✅ هندل خطاهای عمومی
app.use((err, req, res, next) => {
    console.error('❌ Server error:', err);
    res.status(500).json({ message: 'Internal Server Error' });
});

// ✅ اجرای سرور
app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
});