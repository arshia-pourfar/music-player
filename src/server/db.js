// PROGRESSQL IN VERCEL
const { Pool } = require('pg');

// تنظیمات اتصال به پایگاه داده PostgreSQL
const pool = new Pool({
    connectionString: 'postgres://default:O1pMfdv2FVuI@ep-weathered-sun-a4c88yk1-pooler.us-east-1.aws.neon.tech:5432/verceldb?sslmode=require',
    ssl: {
        rejectUnauthorized: false
    }
});

module.exports = {
    query: (text, params, callback) => {
        return pool.query(text, params, callback);
    }
};
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