// db.js
var sqlite3 = require('sqlite3').verbose();

class SQLite3DB {
    constructor() {
        this.db = null;
    }

    // Connect to the SQLite database
    async connectDB() {
        this.db = new sqlite3.Database('./board.sqlite', (err) => {
            if (err) {
                console.error('Error opening database', err.message);
            } else {
                console.log('Connected to the SQLite database.');
            }
        });
    }

    // Close the database connection
    async closeDB() {
        if (this.db) {
            this.db.close((err) => {
                if (err) {
                    console.error('Error closing database', err.message);
                } else {
                    console.log('Database connection closed.');
                }
            });
        }
    }

    // Select data from the database (with promise)
    select(query, params) {
        return new Promise((resolve, reject) => {
            this.db.get(query, params, (err, row) => {

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

    selectList(query, params) {
        return new Promise((resolve, reject) => {
            this.db.all(query, params, (err, row) => {

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

    // Insert data into the database
    insert(query, params) {
        return new Promise((resolve, reject) => {
            this.db.run(query, params, function (err) {
                if (err) {
                    console.error('Error executing insert:', err.message);
                    reject(err);
                } else {
                    resolve({ lastID: this.lastID });
                }
            });
        });
    }

    // Update data in the database
    update(query, params) {
        return new Promise((resolve, reject) => {
            this.db.run(query, params, function (err) {
                if (err) {
                    console.error('Error executing update:', err.message);
                    reject(err);
                } else {
                    resolve({ changes: this.changes });
                }
            });
        });
    }

    // Delete data from the database
    delete(query, params) {
        return new Promise((resolve, reject) => {
            this.db.run(query, params, function (err) {
                if (err) {
                    console.error('Error executing delete:', err.message);
                    reject(err);
                } else {
                    resolve({ changes: this.changes });
                }
            });
        });
    }
}

module.exports = SQLite3DB;