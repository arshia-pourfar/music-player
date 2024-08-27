// PROGRESSQL IN VERCEL
// db.js

const { Pool } = require('pg');
require('dotenv').config(); // بارگذاری متغیرهای محیطی از فایل .env

// تنظیمات اتصال به PostgreSQL
const pool = new Pool({
    connectionString: process.env.POSTGRES_URL,
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


// module.exports = {
//     query: (text, params, callback) => {
//         console.log(params);
//         return pool.query(text, params, callback);
//     }
// };


// ***************************************************************************
// MYSQL IN LOCALHOST
// const mysql = require('mysql');

// // const dbConfig = mysql.createConnection({
// //     host: "sql110.infinityfree.com",
// //     user: "if0_37158159",
// //     password: "HJWAMIQCw7",
// //     database: "if0_37158159_musicplayer",
// // });
// const dbConfig = {
//     host: 'localhost',  // حذف پروتکل http://
//     port: 3306,
//     user: 'root',  // استفاده از کاربر غیر root
//     password: 'root',  // رمز عبور قوی و غیر root
//     database: 'musicplayer'
// };

// const connection = mysql.createConnection(dbConfig);
// connection.connect((err) => {
//     if (err) {
//         console.error('Error connecting to MySQL: ' + err.stack);
//         return;
//     } else {
//         console.log('Connected to MySQL as ID ' + connection.threadId);
//     }
// });

// exports.connection = connection;