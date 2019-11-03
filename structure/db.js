"use strict";

const sqlite3 = require('sqlite3').verbose();
const Log = require('./logger');

module.exports = class Db {

    constructor() {
        this.log = new Log();
        this.conn = new sqlite3.Database(':memory:', (err) => {
            if (err) {
                return console.error(err.message);
            }
            this.log.c("DB", "Connection succeded")
        });
    }

    close() {
        this.conn.close((err) => {
            if (err) {
                return console.error(err.message);
            } this.log.c("DB", "Connection to DB closed")
        });
    }
}
