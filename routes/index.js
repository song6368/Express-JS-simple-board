var express = require('express');
var router = express.Router();
var SQLite3DB = require('./sqlite3'); // Import the SQLite3DB class

/* GET home page. */
router.get('/', async function(req, res, next) {
  res.render("index");
});

router.post('/signUp', async function(req, res, next) {
  const db = new SQLite3DB();

  try {
    await db.connectDB();

    const email = req.body.email;
    const name = req.body.name;
    const password = req.body.password;

    const existEmail = await db.select(`SELECT COUNT(*) AS count FROM users WHERE email = ?`, [email]);

    if (existEmail.count > 0) {
      return res.send({ success: false, errorMessage: '이메일로 가입한 내역이 존재합니다.' });
    }

    const insertRes = await db.insert(`INSERT INTO users(email, name, password) VALUES (?, ?, ?)`, [email, name, password]);

    if (insertRes) {
      return res.send({ success: true, successMessage: '회원가입에 성공했습니다.' });
    } else {
      return res.send({ success: false, errorMessage: '회원가입에 실패했습니다.' });
    }
  } catch (err) {
    console.error('Error:', err);
    return res.status(500).send({ errorMessage: '서버 오류가 발생했습니다.' });
  } finally {
    db.closeDB(); // 데이터베이스 연결 해제
  }
});

router.post('/login', async function(req, res, next) {
  const db = new SQLite3DB();

  try {
    await db.connectDB();

    const email = req.body.email;
    const password = req.body.password;

    const existEmail = await db.select(`SELECT COUNT(*) AS count FROM users WHERE email = ? and password = ?`, [email, password]);

    if (existEmail.count == 1) {
      return res.send({ success: true, successMessage: '로그인되었습니다.'});
    } else {
      return res.send({ success: false, errorMessage: '이메일이나 패스워드가 일치하지 않습니다.' })
    }
  } catch (err) {
    console.error('Error:', err);
    return res.status(500).send({ errorMessage: '서버 오류가 발생했습니다.' });
  } finally {
    db.closeDB(); // 데이터베이스 연결 해제
  }
});

module.exports = router;
