"use strict";

var express = require('express');

var router = express.Router();

var SQLite3DB = require('./sqlite3');

var fileUpload = require('express-fileupload');

router.use(fileUpload());
/* GET home page. */

router.get('/', function _callee(req, res, next) {
  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          res.render("main");

        case 1:
        case "end":
          return _context.stop();
      }
    }
  });
});
router.get('/main', function _callee2(req, res, next) {
  return regeneratorRuntime.async(function _callee2$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          res.render("main");

        case 1:
        case "end":
          return _context2.stop();
      }
    }
  });
});
router.get('/loginPage', function _callee3(req, res, next) {
  return regeneratorRuntime.async(function _callee3$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          res.render("login");

        case 1:
        case "end":
          return _context3.stop();
      }
    }
  });
});
router.get('/profile', function _callee4(req, res, next) {
  return regeneratorRuntime.async(function _callee4$(_context4) {
    while (1) {
      switch (_context4.prev = _context4.next) {
        case 0:
          if (req.session.ip && req.session.ip === req.ip) {
            res.render("profile");
          } else {
            res.render("main");
          }

        case 1:
        case "end":
          return _context4.stop();
      }
    }
  });
});
router.get('/writeBoardPage', function _callee5(req, res, next) {
  return regeneratorRuntime.async(function _callee5$(_context5) {
    while (1) {
      switch (_context5.prev = _context5.next) {
        case 0:
          if (req.session.ip && req.session.ip === req.ip) {
            res.render("writeBoard");
          } else {
            res.render("main");
          }

        case 1:
        case "end":
          return _context5.stop();
      }
    }
  });
});
router.get('/logout', function _callee6(req, res, next) {
  return regeneratorRuntime.async(function _callee6$(_context6) {
    while (1) {
      switch (_context6.prev = _context6.next) {
        case 0:
          req.session.destroy(function (err) {
            if (err) {
              return res.status(500).send('Could not log out');
            }

            res.render("main");
          });

        case 1:
        case "end":
          return _context6.stop();
      }
    }
  });
});
router.post('/boardDetail', function _callee7(req, res, next) {
  var boardId, db, result;
  return regeneratorRuntime.async(function _callee7$(_context7) {
    while (1) {
      switch (_context7.prev = _context7.next) {
        case 0:
          if (!(req.session.ip && req.session.ip === req.ip)) {
            _context7.next = 22;
            break;
          }

          boardId = req.body.id;
          db = new SQLite3DB();
          req.session.boardId = boardId;
          _context7.prev = 4;
          _context7.next = 7;
          return regeneratorRuntime.awrap(db.connectDB());

        case 7:
          _context7.next = 9;
          return regeneratorRuntime.awrap(db.select('select * from board where id = ?', [boardId]));

        case 9:
          result = _context7.sent;
          console.log(result);
          res.render("boardDetail", {
            id: result.id,
            title: result.title,
            created_at: result.created_at,
            author: result.author,
            content: result.content
          });
          _context7.next = 17;
          break;

        case 14:
          _context7.prev = 14;
          _context7.t0 = _context7["catch"](4);
          console.log(_context7.t0);

        case 17:
          _context7.prev = 17;
          db.closeDB();
          return _context7.finish(17);

        case 20:
          _context7.next = 23;
          break;

        case 22:
          res.render('login');

        case 23:
        case "end":
          return _context7.stop();
      }
    }
  }, null, null, [[4, 14, 17, 20]]);
});
router.post('/writeBoard', function _callee8(req, res, next) {
  var db, email, title, content;
  return regeneratorRuntime.async(function _callee8$(_context8) {
    while (1) {
      switch (_context8.prev = _context8.next) {
        case 0:
          if (!(req.session.ip && req.session.ip === req.ip)) {
            _context8.next = 23;
            break;
          }

          db = new SQLite3DB();
          _context8.prev = 2;
          _context8.next = 5;
          return regeneratorRuntime.awrap(db.connectDB());

        case 5:
          // 세션에서 이메일을 가져옵니다
          email = req.session.email; // 이메일이 없는 경우 에러 응답

          if (email) {
            _context8.next = 8;
            break;
          }

          return _context8.abrupt("return", res.status(400).json({
            error: '로그인 하셔야 합니다.'
          }));

        case 8:
          // 요청 본문에서 제목과 내용을 가져옵니다
          title = req.body.title;
          content = req.body.content; // 게시글을 데이터베이스에 삽입

          _context8.next = 12;
          return regeneratorRuntime.awrap(db.insert("INSERT INTO board (title, content, author) VALUES (?, ?, ?)", [title, content, email]));

        case 12:
          // 성공 응답
          res.redirect('boardDetail');
          _context8.next = 18;
          break;

        case 15:
          _context8.prev = 15;
          _context8.t0 = _context8["catch"](2);
          // 에러 발생 시 에러 핸들링 미들웨어로 전달
          next(_context8.t0);

        case 18:
          _context8.prev = 18;
          // 데이터베이스 연결 해제
          db.closeDB();
          return _context8.finish(18);

        case 21:
          _context8.next = 24;
          break;

        case 23:
          // 세션이 유효하지 않거나 IP가 일치하지 않는 경우 메인 페이지로 리다이렉트
          res.redirect('/main');

        case 24:
        case "end":
          return _context8.stop();
      }
    }
  }, null, null, [[2, 15, 18, 21]]);
});
router.post('/loadBoard', function _callee9(req, res, next) {
  var db, offset, cnt, result;
  return regeneratorRuntime.async(function _callee9$(_context9) {
    while (1) {
      switch (_context9.prev = _context9.next) {
        case 0:
          db = new SQLite3DB();
          offset = req.body.offset;
          cnt = req.body.cnt;
          _context9.prev = 3;
          _context9.next = 6;
          return regeneratorRuntime.awrap(db.connectDB());

        case 6:
          _context9.next = 8;
          return regeneratorRuntime.awrap(db.selectList('SELECT id, title, author, created_at FROM board LIMIT $1 OFFSET $2', [Number(cnt), Number(offset)]));

        case 8:
          result = _context9.sent;
          res.send(result);
          _context9.next = 16;
          break;

        case 12:
          _context9.prev = 12;
          _context9.t0 = _context9["catch"](3);
          // 에러 발생 시 에러 핸들링 미들웨어로 전달
          console.log(_context9.t0);
          next(_context9.t0);

        case 16:
          _context9.prev = 16;
          // 데이터베이스 연결 해제
          db.closeDB();
          return _context9.finish(16);

        case 19:
        case "end":
          return _context9.stop();
      }
    }
  }, null, null, [[3, 12, 16, 19]]);
});
router.post('/hasSession', function (req, res, next) {
  if (req.session.ip && req.session.ip === req.ip) {
    res.json({
      hasSession: true
    });
  } else {
    res.json({
      hasSession: false
    });
  }
}); // 사용자 정보를 가져오는 라우터

router.post('/userProfile', function _callee10(req, res, next) {
  var db, email, user;
  return regeneratorRuntime.async(function _callee10$(_context10) {
    while (1) {
      switch (_context10.prev = _context10.next) {
        case 0:
          db = new SQLite3DB();
          _context10.prev = 1;
          _context10.next = 4;
          return regeneratorRuntime.awrap(db.connectDB());

        case 4:
          // 요청 본문에서 이메일을 가져옵니다
          email = req.session.email; // 이메일이 없는 경우 에러 응답

          if (email) {
            _context10.next = 7;
            break;
          }

          return _context10.abrupt("return", res.status(400).json({
            error: '로그인 하셔야합니다.'
          }));

        case 7:
          console.log(email); // 이메일로 사용자 정보를 조회

          _context10.next = 10;
          return regeneratorRuntime.awrap(db.select("SELECT name, email, image FROM users WHERE email = ?", [email]));

        case 10:
          user = _context10.sent;
          console.log(user); // 사용자 정보가 없는 경우

          if (!(user == undefined)) {
            _context10.next = 16;
            break;
          }

          return _context10.abrupt("return", res.status(404).json({
            error: '사용자를 찾을 수 없습니다.'
          }));

        case 16:
          console.log(user); // 사용자 정보를 응답으로 전송

          res.json(user);

        case 18:
          _context10.next = 23;
          break;

        case 20:
          _context10.prev = 20;
          _context10.t0 = _context10["catch"](1);
          next(_context10.t0); // 에러 핸들링 미들웨어로 전달

        case 23:
          _context10.prev = 23;
          db.closeDB(); // 데이터베이스 연결 해제

          return _context10.finish(23);

        case 26:
        case "end":
          return _context10.stop();
      }
    }
  }, null, null, [[1, 20, 23, 26]]);
});
router.post('/updateProfile', function _callee11(req, res, next) {
  var db, email, name, image, imageBlob, updateRes;
  return regeneratorRuntime.async(function _callee11$(_context11) {
    while (1) {
      switch (_context11.prev = _context11.next) {
        case 0:
          db = new SQLite3DB();
          _context11.prev = 1;
          _context11.next = 4;
          return regeneratorRuntime.awrap(db.connectDB());

        case 4:
          email = req.session.email;
          name = req.body.name;
          image = req.files ? req.files['profile-image'] : null;
          imageBlob = null;

          if (image) {
            imageBlob = image.data;
          }

          _context11.next = 11;
          return regeneratorRuntime.awrap(db.update("UPDATE users SET name = ?, image = ? WHERE email = ?", [name, imageBlob, email]));

        case 11:
          updateRes = _context11.sent;

          if (updateRes.changes > 0) {
            res.status(200).json({
              message: '프로필이 업데이트되었습니다.'
            });
          } else {
            res.status(400).json({
              error: '프로필 업데이트에 실패했습니다.'
            });
          }

          _context11.next = 19;
          break;

        case 15:
          _context11.prev = 15;
          _context11.t0 = _context11["catch"](1);
          console.error(_context11.t0);
          res.status(500).json({
            error: '서버 오류가 발생했습니다.'
          });

        case 19:
          _context11.prev = 19;
          _context11.next = 22;
          return regeneratorRuntime.awrap(db.closeDB());

        case 22:
          return _context11.finish(19);

        case 23:
        case "end":
          return _context11.stop();
      }
    }
  }, null, null, [[1, 15, 19, 23]]);
});
router.post('/signUp', function _callee12(req, res, next) {
  var db, email, name, password, existEmail, insertRes;
  return regeneratorRuntime.async(function _callee12$(_context12) {
    while (1) {
      switch (_context12.prev = _context12.next) {
        case 0:
          db = new SQLite3DB();
          _context12.prev = 1;
          _context12.next = 4;
          return regeneratorRuntime.awrap(db.connectDB());

        case 4:
          email = req.body.email;
          name = req.body.name;
          password = req.body.password;
          _context12.next = 9;
          return regeneratorRuntime.awrap(db.select("SELECT COUNT(*) AS count FROM users WHERE email = ?", [email]));

        case 9:
          existEmail = _context12.sent;

          if (!(existEmail.count > 0)) {
            _context12.next = 12;
            break;
          }

          return _context12.abrupt("return", res.send({
            success: false,
            errorMessage: '이메일로 가입한 내역이 존재합니다.'
          }));

        case 12:
          _context12.next = 14;
          return regeneratorRuntime.awrap(db.insert("INSERT INTO users(email, name, password) VALUES (?, ?, ?)", [email, name, password]));

        case 14:
          insertRes = _context12.sent;

          if (!insertRes) {
            _context12.next = 19;
            break;
          }

          return _context12.abrupt("return", res.send({
            success: true,
            successMessage: '회원가입에 성공했습니다.'
          }));

        case 19:
          return _context12.abrupt("return", res.send({
            success: false,
            errorMessage: '회원가입에 실패했습니다.'
          }));

        case 20:
          _context12.next = 26;
          break;

        case 22:
          _context12.prev = 22;
          _context12.t0 = _context12["catch"](1);
          console.error('Error:', _context12.t0);
          return _context12.abrupt("return", res.status(500).send({
            errorMessage: '서버 오류가 발생했습니다.'
          }));

        case 26:
          _context12.prev = 26;
          db.closeDB(); // 데이터베이스 연결 해제

          return _context12.finish(26);

        case 29:
        case "end":
          return _context12.stop();
      }
    }
  }, null, null, [[1, 22, 26, 29]]);
});
router.post('/login', function _callee13(req, res, next) {
  var db, email, password, existEmail;
  return regeneratorRuntime.async(function _callee13$(_context13) {
    while (1) {
      switch (_context13.prev = _context13.next) {
        case 0:
          db = new SQLite3DB();
          _context13.prev = 1;
          _context13.next = 4;
          return regeneratorRuntime.awrap(db.connectDB());

        case 4:
          email = req.body.email;
          password = req.body.password;
          _context13.next = 8;
          return regeneratorRuntime.awrap(db.select("SELECT COUNT(*) AS count FROM users WHERE email = ? and password = ?", [email, password]));

        case 8:
          existEmail = _context13.sent;

          if (!(existEmail.count == 1)) {
            _context13.next = 15;
            break;
          }

          // 세션 남기기
          req.session.email = email;
          req.session.ip = req.ip;
          return _context13.abrupt("return", res.send({
            success: true,
            successMessage: '로그인되었습니다.'
          }));

        case 15:
          return _context13.abrupt("return", res.send({
            success: false,
            errorMessage: '이메일이나 패스워드가 일치하지 않습니다.'
          }));

        case 16:
          _context13.next = 22;
          break;

        case 18:
          _context13.prev = 18;
          _context13.t0 = _context13["catch"](1);
          console.error('Error:', _context13.t0);
          return _context13.abrupt("return", res.status(500).send({
            errorMessage: '서버 오류가 발생했습니다.'
          }));

        case 22:
          _context13.prev = 22;
          db.closeDB(); // 데이터베이스 연결 해제

          return _context13.finish(22);

        case 25:
        case "end":
          return _context13.stop();
      }
    }
  }, null, null, [[1, 18, 22, 25]]);
});
module.exports = router;