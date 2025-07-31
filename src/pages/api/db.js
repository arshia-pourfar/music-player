// models/db.js
const { Pool } = require('pg');
require('dotenv').config();

const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : false,
});

// خطاهای اتصال رو لاگ کن برای دیباگ راحت‌تر
pool.on('error', (err, client) => {
    console.error('Unexpected error on idle PostgreSQL client', err);
    process.exit(-1); // در صورت نیاز می‌توانی این خط را حذف کنی یا مدیریت بهتری انجام بدی
});

module.exports = pool;
