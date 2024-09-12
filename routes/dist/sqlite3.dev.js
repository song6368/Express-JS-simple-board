"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

// db.js
var sqlite3 = require('sqlite3').verbose();

var SQLite3DB =
/*#__PURE__*/
function () {
  function SQLite3DB() {
    _classCallCheck(this, SQLite3DB);

    this.db = null;
  } // Connect to the SQLite database


  _createClass(SQLite3DB, [{
    key: "connectDB",
    value: function connectDB() {
      return regeneratorRuntime.async(function connectDB$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              this.db = new sqlite3.Database('./board.sqlite', function (err) {
                if (err) {
                  console.error('Error opening database', err.message);
                } else {
                  console.log('Connected to the SQLite database.');
                }
              });

            case 1:
            case "end":
              return _context.stop();
          }
        }
      }, null, this);
    } // Close the database connection

  }, {
    key: "closeDB",
    value: function closeDB() {
      return regeneratorRuntime.async(function closeDB$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              if (this.db) {
                this.db.close(function (err) {
                  if (err) {
                    console.error('Error closing database', err.message);
                  } else {
                    console.log('Database connection closed.');
                  }
                });
              }

            case 1:
            case "end":
              return _context2.stop();
          }
        }
      }, null, this);
    } // Select data from the database (with promise)

  }, {
    key: "select",
    value: function select(query, params) {
      var _this = this;

      return new Promise(function (resolve, reject) {
        _this.db.get(query, params, function (err, row) {
          console.log(row);

          if (err) {
            console.error('Error executing query:', err.message);
            reject(err);
          } else {
            resolve(row);
          }
        });
      });
    }
  }, {
    key: "selectList",
    value: function selectList(query, params) {
      var _this2 = this;

      return new Promise(function (resolve, reject) {
        _this2.db.all(query, params, function (err, row) {
          console.log(row);

          if (err) {
            console.error('Error executing query:', err.message);
            reject(err);
          } else {
            resolve(row);
          }
        });
      });
    } // Insert data into the database

  }, {
    key: "insert",
    value: function insert(query, params) {
      var _this3 = this;

      return new Promise(function (resolve, reject) {
        _this3.db.run(query, params, function (err) {
          if (err) {
            console.error('Error executing insert:', err.message);
            reject(err);
          } else {
            resolve({
              id: this.lastID
            });
          }
        });
      });
    } // Update data in the database

  }, {
    key: "update",
    value: function update(query, params) {
      var _this4 = this;

      return new Promise(function (resolve, reject) {
        _this4.db.run(query, params, function (err) {
          if (err) {
            console.error('Error executing update:', err.message);
            reject(err);
          } else {
            resolve({
              changes: this.changes
            });
          }
        });
      });
    } // Delete data from the database

  }, {
    key: "delete",
    value: function _delete(query, params) {
      var _this5 = this;

      return new Promise(function (resolve, reject) {
        _this5.db.run(query, params, function (err) {
          if (err) {
            console.error('Error executing delete:', err.message);
            reject(err);
          } else {
            resolve({
              changes: this.changes
            });
          }
        });
      });
    }
  }]);

  return SQLite3DB;
}();

module.exports = SQLite3DB;