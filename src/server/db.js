const mysql = require('mysql');

const dbConfig = mysql.createConnection({
    host: process.env.DATABASE_HOST,
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE_NAME,
});
// const dbConfig = {
//     host: 'localhost',  // حذف پروتکل http://
//     port: 3306,
//     user: 'root',  // استفاده از کاربر غیر root
//     password: 'root',  // رمز عبور قوی و غیر root
//     database: 'musicplayer'
// };

const connection = mysql.createConnection(dbConfig);
connection.connect((err) => {
    if (err) {
        console.error('Error connecting to MySQL: ' + err.stack);
        return;
    } else {
        console.log('Connected to MySQL as ID ' + connection.threadId);
    }
});

exports.connection = connection;