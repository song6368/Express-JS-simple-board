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
          res.render("main", {
            message: undefined
          });

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
          res.render("main", {
            message: undefined
          });

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
            res.render("profile", {
              message: undefined
            });
          } else {
            res.redirect('/loginPage');
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
            res.redirect('/loginPage');
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

            res.redirect('/');
          });

        case 1:
        case "end":
          return _context6.stop();
      }
    }
  });
});
router.get('/boardDetail', function _callee7(req, res, next) {
  var boardId, db, result, comments, _iteratorNormalCompletion, _didIteratorError, _iteratorError, _iterator, _step, comment;

  return regeneratorRuntime.async(function _callee7$(_context7) {
    while (1) {
      switch (_context7.prev = _context7.next) {
        case 0:
          if (!(req.session.ip && req.session.ip === req.ip)) {
            _context7.next = 43;
            break;
          }

          boardId = req.query.id;
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
          _context7.next = 12;
          return regeneratorRuntime.awrap(db.selectList("select * from comment where board_id = ?", [boardId]));

        case 12:
          comments = _context7.sent;
          _iteratorNormalCompletion = true;
          _didIteratorError = false;
          _iteratorError = undefined;
          _context7.prev = 16;

          for (_iterator = comments[Symbol.iterator](); !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
            comment = _step.value;

            if (comment.email === req.session.email) {
              comment.del = true;
            } else {
              comment.del = false;
            }
          }

          _context7.next = 24;
          break;

        case 20:
          _context7.prev = 20;
          _context7.t0 = _context7["catch"](16);
          _didIteratorError = true;
          _iteratorError = _context7.t0;

        case 24:
          _context7.prev = 24;
          _context7.prev = 25;

          if (!_iteratorNormalCompletion && _iterator["return"] != null) {
            _iterator["return"]();
          }

        case 27:
          _context7.prev = 27;

          if (!_didIteratorError) {
            _context7.next = 30;
            break;
          }

          throw _iteratorError;

        case 30:
          return _context7.finish(27);

        case 31:
          return _context7.finish(24);

        case 32:
          res.render("boardDetail", {
            id: result.id,
            title: result.title,
            created_at: result.created_at,
            author: result.author,
            content: result.content,
            comments: comments,
            message: undefined
          });
          _context7.next = 38;
          break;

        case 35:
          _context7.prev = 35;
          _context7.t1 = _context7["catch"](4);
          console.log(_context7.t1);

        case 38:
          _context7.prev = 38;
          db.closeDB();
          return _context7.finish(38);

        case 41:
          _context7.next = 44;
          break;

        case 43:
          res.render('login');

        case 44:
        case "end":
          return _context7.stop();
      }
    }
  }, null, null, [[4, 35, 38, 41], [16, 20, 24, 32], [25,, 27, 31]]);
});
router.post('/boardDetail', function _callee8(req, res, next) {
  var boardId, db, result, comments, _iteratorNormalCompletion2, _didIteratorError2, _iteratorError2, _iterator2, _step2, comment;

  return regeneratorRuntime.async(function _callee8$(_context8) {
    while (1) {
      switch (_context8.prev = _context8.next) {
        case 0:
          if (!(req.session.ip && req.session.ip === req.ip)) {
            _context8.next = 43;
            break;
          }

          boardId = req.body.id;
          db = new SQLite3DB();
          req.session.boardId = boardId;
          _context8.prev = 4;
          _context8.next = 7;
          return regeneratorRuntime.awrap(db.connectDB());

        case 7:
          _context8.next = 9;
          return regeneratorRuntime.awrap(db.select('select * from board where id = ?', [boardId]));

        case 9:
          result = _context8.sent;
          _context8.next = 12;
          return regeneratorRuntime.awrap(db.selectList("select * from comment where board_id = ?", [boardId]));

        case 12:
          comments = _context8.sent;
          _iteratorNormalCompletion2 = true;
          _didIteratorError2 = false;
          _iteratorError2 = undefined;
          _context8.prev = 16;

          for (_iterator2 = comments[Symbol.iterator](); !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
            comment = _step2.value;

            if (comment.email === req.session.email) {
              comment.del = true;
            } else {
              comment.del = false;
            }
          }

          _context8.next = 24;
          break;

        case 20:
          _context8.prev = 20;
          _context8.t0 = _context8["catch"](16);
          _didIteratorError2 = true;
          _iteratorError2 = _context8.t0;

        case 24:
          _context8.prev = 24;
          _context8.prev = 25;

          if (!_iteratorNormalCompletion2 && _iterator2["return"] != null) {
            _iterator2["return"]();
          }

        case 27:
          _context8.prev = 27;

          if (!_didIteratorError2) {
            _context8.next = 30;
            break;
          }

          throw _iteratorError2;

        case 30:
          return _context8.finish(27);

        case 31:
          return _context8.finish(24);

        case 32:
          res.render("boardDetail", {
            id: result.id,
            title: result.title,
            created_at: result.created_at,
            author: result.author,
            content: result.content,
            comments: comments,
            message: undefined
          });
          _context8.next = 38;
          break;

        case 35:
          _context8.prev = 35;
          _context8.t1 = _context8["catch"](4);
          console.log(_context8.t1);

        case 38:
          _context8.prev = 38;
          db.closeDB();
          return _context8.finish(38);

        case 41:
          _context8.next = 44;
          break;

        case 43:
          res.render('login');

        case 44:
        case "end":
          return _context8.stop();
      }
    }
  }, null, null, [[4, 35, 38, 41], [16, 20, 24, 32], [25,, 27, 31]]);
});
router.post('/addComment', function _callee9(req, res, next) {
  var boardId, db, result, result2, comments, _iteratorNormalCompletion3, _didIteratorError3, _iteratorError3, _iterator3, _step3, comment;

  return regeneratorRuntime.async(function _callee9$(_context9) {
    while (1) {
      switch (_context9.prev = _context9.next) {
        case 0:
          if (!(req.session.ip && req.session.ip === req.ip && req.session.email)) {
            _context9.next = 49;
            break;
          }

          boardId = req.body.id;
          db = new SQLite3DB();
          _context9.prev = 3;
          _context9.next = 6;
          return regeneratorRuntime.awrap(db.connectDB());

        case 6:
          _context9.next = 8;
          return regeneratorRuntime.awrap(db.insert('insert into comment(board_id, email, content) values (?, ?, ?)', [boardId, req.session.email, req.body.content]));

        case 8:
          result = _context9.sent;

          if (!result) {
            _context9.next = 38;
            break;
          }

          _context9.next = 12;
          return regeneratorRuntime.awrap(db.select('select * from board where id = ?', [boardId]));

        case 12:
          result2 = _context9.sent;
          _context9.next = 15;
          return regeneratorRuntime.awrap(db.selectList("select * from comment where board_id = ?", [boardId]));

        case 15:
          comments = _context9.sent;
          _iteratorNormalCompletion3 = true;
          _didIteratorError3 = false;
          _iteratorError3 = undefined;
          _context9.prev = 19;

          for (_iterator3 = comments[Symbol.iterator](); !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
            comment = _step3.value;

            if (comment.email === req.session.email) {
              comment.del = true;
            } else {
              comment.del = false;
            }
          }

          _context9.next = 27;
          break;

        case 23:
          _context9.prev = 23;
          _context9.t0 = _context9["catch"](19);
          _didIteratorError3 = true;
          _iteratorError3 = _context9.t0;

        case 27:
          _context9.prev = 27;
          _context9.prev = 28;

          if (!_iteratorNormalCompletion3 && _iterator3["return"] != null) {
            _iterator3["return"]();
          }

        case 30:
          _context9.prev = 30;

          if (!_didIteratorError3) {
            _context9.next = 33;
            break;
          }

          throw _iteratorError3;

        case 33:
          return _context9.finish(30);

        case 34:
          return _context9.finish(27);

        case 35:
          res.render("boardDetail", {
            id: result2.id,
            title: result2.title,
            created_at: result2.created_at,
            author: result2.author,
            content: result2.content,
            comments: comments,
            message: undefined
          });
          _context9.next = 39;
          break;

        case 38:
          res.render('main', {
            message: '댓글 등록에 실패하였습니다.'
          });

        case 39:
          _context9.next = 44;
          break;

        case 41:
          _context9.prev = 41;
          _context9.t1 = _context9["catch"](3);
          console.log(_context9.t1);

        case 44:
          _context9.prev = 44;
          db.closeDB();
          return _context9.finish(44);

        case 47:
          _context9.next = 50;
          break;

        case 49:
          res.render('login');

        case 50:
        case "end":
          return _context9.stop();
      }
    }
  }, null, null, [[3, 41, 44, 47], [19, 23, 27, 35], [28,, 30, 34]]);
});
router.post('/delComment', function _callee10(req, res, next) {
  var commentId, boardId, db, result, result2, comments, _iteratorNormalCompletion4, _didIteratorError4, _iteratorError4, _iterator4, _step4, comment;

  return regeneratorRuntime.async(function _callee10$(_context10) {
    while (1) {
      switch (_context10.prev = _context10.next) {
        case 0:
          if (!(req.session.ip && req.session.ip === req.ip && req.session.email)) {
            _context10.next = 50;
            break;
          }

          commentId = req.body.commentId;
          boardId = req.body.boardId;
          db = new SQLite3DB();
          _context10.prev = 4;
          _context10.next = 7;
          return regeneratorRuntime.awrap(db.connectDB());

        case 7:
          _context10.next = 9;
          return regeneratorRuntime.awrap(db["delete"]('delete from comment where id = ? and email = ?', [commentId, req.session.email]));

        case 9:
          result = _context10.sent;

          if (!result) {
            _context10.next = 39;
            break;
          }

          _context10.next = 13;
          return regeneratorRuntime.awrap(db.select('select * from board where id = ?', [boardId]));

        case 13:
          result2 = _context10.sent;
          _context10.next = 16;
          return regeneratorRuntime.awrap(db.selectList("select * from comment where board_id = ?", [boardId]));

        case 16:
          comments = _context10.sent;
          _iteratorNormalCompletion4 = true;
          _didIteratorError4 = false;
          _iteratorError4 = undefined;
          _context10.prev = 20;

          for (_iterator4 = comments[Symbol.iterator](); !(_iteratorNormalCompletion4 = (_step4 = _iterator4.next()).done); _iteratorNormalCompletion4 = true) {
            comment = _step4.value;

            if (comment.email === req.session.email) {
              comment.del = true;
            } else {
              comment.del = false;
            }
          }

          _context10.next = 28;
          break;

        case 24:
          _context10.prev = 24;
          _context10.t0 = _context10["catch"](20);
          _didIteratorError4 = true;
          _iteratorError4 = _context10.t0;

        case 28:
          _context10.prev = 28;
          _context10.prev = 29;

          if (!_iteratorNormalCompletion4 && _iterator4["return"] != null) {
            _iterator4["return"]();
          }

        case 31:
          _context10.prev = 31;

          if (!_didIteratorError4) {
            _context10.next = 34;
            break;
          }

          throw _iteratorError4;

        case 34:
          return _context10.finish(31);

        case 35:
          return _context10.finish(28);

        case 36:
          res.render("boardDetail", {
            id: result2.id,
            title: result2.title,
            created_at: result2.created_at,
            author: result2.author,
            content: result2.content,
            comments: comments,
            message: '댓글을 삭제하였습니다.'
          });
          _context10.next = 40;
          break;

        case 39:
          res.render('main', {
            message: '댓글 등록에 실패하였습니다.'
          });

        case 40:
          _context10.next = 45;
          break;

        case 42:
          _context10.prev = 42;
          _context10.t1 = _context10["catch"](4);
          console.log(_context10.t1);

        case 45:
          _context10.prev = 45;
          db.closeDB();
          return _context10.finish(45);

        case 48:
          _context10.next = 51;
          break;

        case 50:
          res.render('login');

        case 51:
        case "end":
          return _context10.stop();
      }
    }
  }, null, null, [[4, 42, 45, 48], [20, 24, 28, 36], [29,, 31, 35]]);
});
router.post('/writeBoard', function _callee11(req, res, next) {
  var db, email, title, content, result, boardId;
  return regeneratorRuntime.async(function _callee11$(_context11) {
    while (1) {
      switch (_context11.prev = _context11.next) {
        case 0:
          if (!(req.session.ip && req.session.ip === req.ip)) {
            _context11.next = 25;
            break;
          }

          db = new SQLite3DB();
          _context11.prev = 2;
          _context11.next = 5;
          return regeneratorRuntime.awrap(db.connectDB());

        case 5:
          // 세션에서 이메일을 가져옵니다
          email = req.session.email; // 이메일이 없는 경우 에러 응답

          if (email) {
            _context11.next = 8;
            break;
          }

          return _context11.abrupt("return", res.status(400).json({
            error: '로그인 하셔야 합니다.'
          }));

        case 8:
          // 요청 본문에서 제목과 내용을 가져옵니다
          title = req.body.title;
          content = req.body.content; // 게시글을 데이터베이스에 삽입

          _context11.next = 12;
          return regeneratorRuntime.awrap(db.insert("INSERT INTO board (title, content, author) VALUES (?, ?, ?)", [title, content, email]));

        case 12:
          result = _context11.sent;
          boardId = result.lastID;
          res.redirect("/boardDetail?id=".concat(boardId));
          _context11.next = 20;
          break;

        case 17:
          _context11.prev = 17;
          _context11.t0 = _context11["catch"](2);
          // 에러 발생 시 에러 핸들링 미들웨어로 전달
          next(_context11.t0);

        case 20:
          _context11.prev = 20;
          // 데이터베이스 연결 해제
          db.closeDB();
          return _context11.finish(20);

        case 23:
          _context11.next = 26;
          break;

        case 25:
          // 세션이 유효하지 않거나 IP가 일치하지 않는 경우 메인 페이지로 리다이렉트
          res.redirect('/main');

        case 26:
        case "end":
          return _context11.stop();
      }
    }
  }, null, null, [[2, 17, 20, 23]]);
});
router.post('/boardCount', function _callee12(req, res, next) {
  var db, notForEmail, result, _result;

  return regeneratorRuntime.async(function _callee12$(_context12) {
    while (1) {
      switch (_context12.prev = _context12.next) {
        case 0:
          db = new SQLite3DB();
          notForEmail = req.body.notForEmail == 'true' ? true : false;
          _context12.prev = 2;
          _context12.next = 5;
          return regeneratorRuntime.awrap(db.connectDB());

        case 5:
          if (!(req.session.email && !notForEmail)) {
            _context12.next = 12;
            break;
          }

          _context12.next = 8;
          return regeneratorRuntime.awrap(db.select("SELECT count(*) as count FROM board where author = ?", [req.session.email]));

        case 8:
          result = _context12.sent;
          res.send(result);
          _context12.next = 16;
          break;

        case 12:
          _context12.next = 14;
          return regeneratorRuntime.awrap(db.select('SELECT count(*) as count FROM board'));

        case 14:
          _result = _context12.sent;
          res.send(_result);

        case 16:
          _context12.next = 22;
          break;

        case 18:
          _context12.prev = 18;
          _context12.t0 = _context12["catch"](2);
          // 에러 발생 시 에러 핸들링 미들웨어로 전달
          console.log(_context12.t0);
          next(_context12.t0);

        case 22:
          _context12.prev = 22;
          // 데이터베이스 연결 해제
          db.closeDB();
          return _context12.finish(22);

        case 25:
        case "end":
          return _context12.stop();
      }
    }
  }, null, null, [[2, 18, 22, 25]]);
});
router.post('/loadBoard', function _callee13(req, res, next) {
  var db, offset, cnt, notForEmail, result;
  return regeneratorRuntime.async(function _callee13$(_context13) {
    while (1) {
      switch (_context13.prev = _context13.next) {
        case 0:
          db = new SQLite3DB();
          offset = req.body.offset;
          cnt = req.body.cnt;
          notForEmail = req.body.notForEmail == 'true' ? true : false;
          _context13.prev = 4;
          _context13.next = 7;
          return regeneratorRuntime.awrap(db.connectDB());

        case 7:
          if (!(req.session.email && !notForEmail)) {
            _context13.next = 13;
            break;
          }

          _context13.next = 10;
          return regeneratorRuntime.awrap(db.selectList('SELECT id, title, author, created_at FROM board WHERE author = ? ORDER BY id desc LIMIT $1 OFFSET $2', [req.session.email, Number(cnt), Number(offset)]));

        case 10:
          result = _context13.sent;
          _context13.next = 16;
          break;

        case 13:
          _context13.next = 15;
          return regeneratorRuntime.awrap(db.selectList('SELECT id, title, author, created_at FROM board ORDER BY id desc LIMIT $1 OFFSET $2', [Number(cnt), Number(offset)]));

        case 15:
          result = _context13.sent;

        case 16:
          res.send(result);
          _context13.next = 23;
          break;

        case 19:
          _context13.prev = 19;
          _context13.t0 = _context13["catch"](4);
          // 에러 발생 시 에러 핸들링 미들웨어로 전달
          console.log(_context13.t0);
          next(_context13.t0);

        case 23:
          _context13.prev = 23;
          // 데이터베이스 연결 해제
          db.closeDB();
          return _context13.finish(23);

        case 26:
        case "end":
          return _context13.stop();
      }
    }
  }, null, null, [[4, 19, 23, 26]]);
});
router.post('/deletePost', function _callee14(req, res, next) {
  var db, id, result;
  return regeneratorRuntime.async(function _callee14$(_context14) {
    while (1) {
      switch (_context14.prev = _context14.next) {
        case 0:
          db = new SQLite3DB();
          _context14.prev = 1;
          _context14.next = 4;
          return regeneratorRuntime.awrap(db.connectDB());

        case 4:
          id = req.body.id;

          if (!(req.session.email && req.session.ip && req.session.ip === req.ip)) {
            _context14.next = 12;
            break;
          }

          _context14.next = 8;
          return regeneratorRuntime.awrap(db["delete"]("delete FROM board where author = ? and id = ?", [req.session.email, id]));

        case 8:
          result = _context14.sent;

          if (result.changes > 0) {
            res.render('profile', {
              message: '삭제하였습니다.'
            });
          } else {
            res.render('profile', {
              message: '삭제에 실패하였습니다.'
            });
          }

          _context14.next = 13;
          break;

        case 12:
          res.render('profile', {
            message: '삭제에 실패하였습니다.'
          });

        case 13:
          _context14.next = 19;
          break;

        case 15:
          _context14.prev = 15;
          _context14.t0 = _context14["catch"](1);
          // 에러 발생 시 에러 핸들링 미들웨어로 전달
          console.log(_context14.t0);
          next(_context14.t0);

        case 19:
          _context14.prev = 19;
          // 데이터베이스 연결 해제
          db.closeDB();
          return _context14.finish(19);

        case 22:
        case "end":
          return _context14.stop();
      }
    }
  }, null, null, [[1, 15, 19, 22]]);
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

router.post('/userProfile', function _callee15(req, res, next) {
  var db, email, user;
  return regeneratorRuntime.async(function _callee15$(_context15) {
    while (1) {
      switch (_context15.prev = _context15.next) {
        case 0:
          db = new SQLite3DB();
          _context15.prev = 1;
          _context15.next = 4;
          return regeneratorRuntime.awrap(db.connectDB());

        case 4:
          // 요청 본문에서 이메일을 가져옵니다
          email = req.session.email; // 이메일이 없는 경우 에러 응답

          if (email) {
            _context15.next = 7;
            break;
          }

          return _context15.abrupt("return", res.status(400).json({
            error: '로그인 하셔야합니다.'
          }));

        case 7:
          console.log(email); // 이메일로 사용자 정보를 조회

          _context15.next = 10;
          return regeneratorRuntime.awrap(db.select("SELECT name, email, image FROM users WHERE email = ?", [email]));

        case 10:
          user = _context15.sent;
          console.log(user); // 사용자 정보가 없는 경우

          if (!(user == undefined)) {
            _context15.next = 16;
            break;
          }

          return _context15.abrupt("return", res.status(404).json({
            error: '사용자를 찾을 수 없습니다.'
          }));

        case 16:
          console.log(user); // 사용자 정보를 응답으로 전송

          res.json(user);

        case 18:
          _context15.next = 23;
          break;

        case 20:
          _context15.prev = 20;
          _context15.t0 = _context15["catch"](1);
          next(_context15.t0); // 에러 핸들링 미들웨어로 전달

        case 23:
          _context15.prev = 23;
          db.closeDB(); // 데이터베이스 연결 해제

          return _context15.finish(23);

        case 26:
        case "end":
          return _context15.stop();
      }
    }
  }, null, null, [[1, 20, 23, 26]]);
});
router.post('/updateProfile', function _callee16(req, res, next) {
  var db, email, name, image, imageBlob, updateRes;
  return regeneratorRuntime.async(function _callee16$(_context16) {
    while (1) {
      switch (_context16.prev = _context16.next) {
        case 0:
          db = new SQLite3DB();
          _context16.prev = 1;
          _context16.next = 4;
          return regeneratorRuntime.awrap(db.connectDB());

        case 4:
          email = req.session.email;
          name = req.body.name;
          image = req.files ? req.files['profile-image'] : null;
          imageBlob = null;

          if (image) {
            imageBlob = image.data;
          }

          _context16.next = 11;
          return regeneratorRuntime.awrap(db.update("UPDATE users SET name = ?, image = ? WHERE email = ?", [name, imageBlob, email]));

        case 11:
          updateRes = _context16.sent;

          if (updateRes.changes > 0) {
            res.status(200).json({
              message: '프로필이 업데이트되었습니다.'
            });
          } else {
            res.status(400).json({
              error: '프로필 업데이트에 실패했습니다.'
            });
          }

          _context16.next = 19;
          break;

        case 15:
          _context16.prev = 15;
          _context16.t0 = _context16["catch"](1);
          console.error(_context16.t0);
          res.status(500).json({
            error: '서버 오류가 발생했습니다.'
          });

        case 19:
          _context16.prev = 19;
          _context16.next = 22;
          return regeneratorRuntime.awrap(db.closeDB());

        case 22:
          return _context16.finish(19);

        case 23:
        case "end":
          return _context16.stop();
      }
    }
  }, null, null, [[1, 15, 19, 23]]);
});
router.post('/signUp', function _callee17(req, res, next) {
  var db, email, name, password, existEmail, insertRes;
  return regeneratorRuntime.async(function _callee17$(_context17) {
    while (1) {
      switch (_context17.prev = _context17.next) {
        case 0:
          db = new SQLite3DB();
          _context17.prev = 1;
          _context17.next = 4;
          return regeneratorRuntime.awrap(db.connectDB());

        case 4:
          email = req.body.email;
          name = req.body.name;
          password = req.body.password;
          _context17.next = 9;
          return regeneratorRuntime.awrap(db.select("SELECT COUNT(*) AS count FROM users WHERE email = ?", [email]));

        case 9:
          existEmail = _context17.sent;

          if (!(existEmail.count > 0)) {
            _context17.next = 12;
            break;
          }

          return _context17.abrupt("return", res.send({
            success: false,
            errorMessage: '이메일로 가입한 내역이 존재합니다.'
          }));

        case 12:
          _context17.next = 14;
          return regeneratorRuntime.awrap(db.insert("INSERT INTO users(email, name, password) VALUES (?, ?, ?)", [email, name, password]));

        case 14:
          insertRes = _context17.sent;

          if (!insertRes) {
            _context17.next = 19;
            break;
          }

          return _context17.abrupt("return", res.send({
            success: true,
            successMessage: '회원가입에 성공했습니다.'
          }));

        case 19:
          return _context17.abrupt("return", res.send({
            success: false,
            errorMessage: '회원가입에 실패했습니다.'
          }));

        case 20:
          _context17.next = 26;
          break;

        case 22:
          _context17.prev = 22;
          _context17.t0 = _context17["catch"](1);
          console.error('Error:', _context17.t0);
          return _context17.abrupt("return", res.status(500).send({
            errorMessage: '서버 오류가 발생했습니다.'
          }));

        case 26:
          _context17.prev = 26;
          db.closeDB(); // 데이터베이스 연결 해제

          return _context17.finish(26);

        case 29:
        case "end":
          return _context17.stop();
      }
    }
  }, null, null, [[1, 22, 26, 29]]);
});
router.post('/login', function _callee18(req, res, next) {
  var db, email, password, existEmail;
  return regeneratorRuntime.async(function _callee18$(_context18) {
    while (1) {
      switch (_context18.prev = _context18.next) {
        case 0:
          db = new SQLite3DB();
          _context18.prev = 1;
          _context18.next = 4;
          return regeneratorRuntime.awrap(db.connectDB());

        case 4:
          email = req.body.email;
          password = req.body.password;
          _context18.next = 8;
          return regeneratorRuntime.awrap(db.select("SELECT COUNT(*) AS count FROM users WHERE email = ? and password = ?", [email, password]));

        case 8:
          existEmail = _context18.sent;

          if (!(existEmail.count == 1)) {
            _context18.next = 15;
            break;
          }

          // 세션 남기기
          req.session.email = email;
          req.session.ip = req.ip;
          return _context18.abrupt("return", res.send({
            success: true,
            successMessage: '로그인되었습니다.'
          }));

        case 15:
          return _context18.abrupt("return", res.send({
            success: false,
            errorMessage: '이메일이나 패스워드가 일치하지 않습니다.'
          }));

        case 16:
          _context18.next = 22;
          break;

        case 18:
          _context18.prev = 18;
          _context18.t0 = _context18["catch"](1);
          console.error('Error:', _context18.t0);
          return _context18.abrupt("return", res.status(500).send({
            errorMessage: '서버 오류가 발생했습니다.'
          }));

        case 22:
          _context18.prev = 22;
          db.closeDB(); // 데이터베이스 연결 해제

          return _context18.finish(22);

        case 25:
        case "end":
          return _context18.stop();
      }
    }
  }, null, null, [[1, 18, 22, 25]]);
});
module.exports = router;