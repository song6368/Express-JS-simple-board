var express = require('express');
var router = express.Router();
var SQLite3DB = require('./sqlite3');
const fileUpload = require('express-fileupload'); 
router.use(fileUpload());

/* GET home page. */
router.get('/', async function (req, res, next) {
  res.render("main");
});

router.get('/loginPage', async function (req, res, next) {
  res.render("login");
});

router.get('/profile', async function (req, res, next) {
  res.render("profile");
});

router.get('/logout', async function (req, res, next) {
  req.session.destroy(err => {
    if (err) {
      return res.status(500).send('Could not log out');
    }
    res.render("main");
  });
});

router.post('/hasSession', function (req, res, next) {
  if (req.session.ip && req.session.ip === req.ip) {
    res.json({ hasSession: true });
  } else {
    res.json({ hasSession: false });
  }
});

// 사용자 정보를 가져오는 라우터
router.post('/userProfile', async function (req, res, next) {
  const db = new SQLite3DB();
  try {

    await db.connectDB();

    // 요청 본문에서 이메일을 가져옵니다
    const email = req.session.email;

    // 이메일이 없는 경우 에러 응답
    if (!email) {
      return res.status(400).json({ error: '로그인 하셔야합니다.' });
    }

    console.log(email);

    // 이메일로 사용자 정보를 조회
    const user = await db.select(
      `SELECT name, email, image FROM users WHERE email = ?`,
      [email]
    );

    console.log(user);

    // 사용자 정보가 없는 경우
    if (user == undefined) {
      return res.status(404).json({ error: '사용자를 찾을 수 없습니다.' });
    } else {
      console.log(user);
      // 사용자 정보를 응답으로 전송
      res.json(user);
    }

  } catch (err) {
    next(err); // 에러 핸들링 미들웨어로 전달
  } finally {
    db.closeDB(); // 데이터베이스 연결 해제
  }
});

router.post('/updateProfile', async (req, res, next) => {
  const db = new SQLite3DB();

  try {
    await db.connectDB();

    const email = req.session.email;
    const name = req.body.name;
    const image = req.files ? req.files['profile-image'] : null;

    let imageBlob = null;
    if (image) {
      imageBlob = image.data;
    }

    const updateRes = await db.update(
      `UPDATE users SET name = ?, image = ? WHERE email = ?`,
      [name, imageBlob, email]
    );

    if (updateRes.changes > 0) {
      res.status(200).json({ message: '프로필이 업데이트되었습니다.' });
    } else {
      res.status(400).json({ error: '프로필 업데이트에 실패했습니다.' });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: '서버 오류가 발생했습니다.' });
  } finally {
    await db.closeDB();
  }
});

router.post('/signUp', async function (req, res, next) {
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

router.post('/login', async function (req, res, next) {
  const db = new SQLite3DB();

  try {
    await db.connectDB();

    const email = req.body.email;
    const password = req.body.password;

    const existEmail = await db.select(`SELECT COUNT(*) AS count FROM users WHERE email = ? and password = ?`, [email, password]);

    if (existEmail.count == 1) {
      // 세션 남기기
      req.session.email = email;
      req.session.ip = req.ip;

      return res.send({ success: true, successMessage: '로그인되었습니다.' });
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
