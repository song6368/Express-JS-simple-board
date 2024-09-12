"use strict";

var _hasSession = _interopRequireDefault(require("/javascripts/hasSession.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

$('.btn').click(function (e) {
  e.preventDefault();
  console.log();
});

window.onload = function _callee() {
  var navMenu, isLoggedIn;
  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          navMenu = document.getElementById('nav-menu');
          _context.next = 3;
          return regeneratorRuntime.awrap((0, _hasSession["default"])());

        case 3:
          isLoggedIn = _context.sent;

          if (isLoggedIn) {
            navMenu.innerHTML = "\n                <a href=\"/writeBoardPage\">\uAC8C\uC2DC\uAE00 \uC791\uC131</a>\n                <a href=\"/profile\">\uB0B4 \uD504\uB85C\uD544</a>\n                <a href=\"/logout\">\uB85C\uADF8\uC544\uC6C3</a>\n            ";
          } else {
            navMenu.innerHTML = "\n                <a href=\"/loginPage\">\uB85C\uADF8\uC778</a>\n            ";
          }

          $.ajax({
            url: '/loadBoard',
            type: 'POST',
            data: {
              'cnt': 5,
              'offset': 0
            },
            success: function success(res) {
              res.forEach(function (e) {
                var id = e.id;
                var title = e.title;
                var author = e.author;
                var created_at = e.created_at;
                $('#board-content').append("\n                    <form action=\"/boardDetail\" method=\"post\">\n                        <div class=\"post\">\n                            <h2>".concat(title, "</h2>\n                            <p>\uC791\uC131\uC790: ").concat(author, " | \uC791\uC131\uC77C: ").concat(created_at, "</p>\n                            <input style=\"display:none\" name=\"id\" value=").concat(id, ">\n                            <button type=\"submit\" class=\"btn\">\uC790\uC138\uD788 \uBCF4\uAE30</button>\n                        </div>\n                    </form>\n                    "));
              });
            }
          });

        case 6:
        case "end":
          return _context.stop();
      }
    }
  });
};