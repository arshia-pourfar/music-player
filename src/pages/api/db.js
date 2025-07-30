// src/lib/api/db.js
// PROGRESSQL IN VERCEL
// db.js
require('dotenv').config(); // بارگذاری متغیرهای محیطی از فایل .env
const { Pool } = require('pg');

// تنظیمات اتصال به PostgreSQL
const pool = new Pool({
    connectionString: process.env.POSTGRES_URL_NO_SSL,
    user: process.env.POSTGRES_USER,
    host: process.env.POSTGRES_HOST,
    database: process.env.POSTGRES_DATABASE,
    password: process.env.POSTGRES_PASSWORD,
    port: process.env.POSTGRES_PORT,
    ssl: {
        rejectUnauthorized: false
    }
});

pool.connect((err, client, release) => {
    if (err) {
        console.error('Error connecting to PostgreSQL:', err.stack);
        return;
    } else {
        console.log('Connected to PostgreSQL');
        release(); // اتصال را آزاد می‌کند
    }
});

// اکسپورت کردن pool برای استفاده در api.js
module.exports = { pool };