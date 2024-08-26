const mysql = require('mysql');

// const dbConfig = {
//     host: 'music-player.wuaze.com',  // حذف پروتکل http://
//     port: 3306,
//     user: 'if0_37158159',  // استفاده از کاربر غیر root
//     password: 'HJWAMIQCw7',  // رمز عبور قوی و غیر root
//     database: 'if0_37158159_musicplayer'
// };
const dbConfig = {
    host: 'localhost',  // حذف پروتکل http://
    port: 3306,
    user: 'root',  // استفاده از کاربر غیر root
    password: 'root',  // رمز عبور قوی و غیر root
    database: 'musicplayer'
};

const connection = mysql.createConnection(dbConfig);

function handleDisconnect() {
    connection.connect((err) => {
        if (err) {
            console.error('Error connecting to MySQL: ' + err.stack);
            // تلاش برای اتصال مجدد پس از وقفه کوتاه
            setTimeout(handleDisconnect, 2000);
        } else {
            console.log('Connected to MySQL as ID ' + connection.threadId);
        }
    });

    connection.on('error', (err) => {
        console.error('MySQL connection error: ' + err);
        if (err.code === 'PROTOCOL_CONNECTION_LOST') {
            // در صورت از دست رفتن اتصال، تلاش برای اتصال مجدد
            handleDisconnect();
        } else {
            throw err;
        }
    });
}

handleDisconnect();

exports.connection = connection;

// var allMusicList = [
//     ["./images/10604875_4512064.jpg", '03:42', false, false, "./musics/1.mp3", "i'm good (blue)", "david guetta & rexha", 455786346],
//     ["./images/9802046_4219738.jpg", '03:35', true, false, "./musics/2.mp3", "under the influence", "chris brown", 346780756],
//     ["./images/5237910_2688833.jpg", '03:12', false, false, "./musics/3.mp3", "forget me", "lewis capaidi", 254945867],
//     ["./images/4464775_2372686.jpg", '03:58', false, false, "./musics/4.mp3", "bad habit", "steve lacy", 103560567],
//     ["./images/10604875_4512064.jpg", '03:14', false, false, "./musics/5.mp3", "don't you worry", "black eyed, shakira & david guetta", 100000],
//     ["./images/9802046_4219738.jpg", '03:28', false, false, "./musics/6.mp3", "test", "test", 100000],
//     ["./images/5237910_2688833.jpg", '03:54', true, false, "./musics/7.mp3", "test", "test", 100000],
//     ["./images/4464775_2372686.jpg", '03:23', true, false, "./musics/8.mp3", "test", "test", 100000],
//     ["./images/10604875_4512064.jpg", '03:34', true, false, "./musics/9.mp3", "i'm good (blue)", "david guetta & rexha", 455786346],
//     ["./images/9802046_4219738.jpg", '03:12', false, false, "./musics/10.mp3", "under the influence", "chris brown", 346780756],
//     ["./images/5237910_2688833.jpg", '04:45', false, false, "./musics/11.mp3", "forget me", "lewis capaidi", 254945867],
//     ["./images/4464775_2372686.jpg", '01:02', false, false, "./musics/12.mp3", "bad habit", "steve lacy", 103560567],
//     ["./images/10604875_4512064.jpg", '02:22', true, false, "./musics/13.mp3", "don't you worry", "black eyed, shakira & david guetta", 100000],
//     ["./images/9802046_4219738.jpg", '04:55', false, false, "./musics/14.mp3", "test", "test", 100000],
//     ["./images/5237910_2688833.jpg", '30:02', false, false, "./musics/15.mp3", "test", "test", 100000],
//     ["./images/4464775_2372686.jpg", '04:32', false, false, "./musics/16.mp3", "test", "test", 100000],
//     ["./images/4464775_2372686.jpg", '03:42', true, false, "./musics/20.mp3", "weekend", "remix", 100000],
// ]