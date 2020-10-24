"use strict";

const path = require('path')
const sqlite3 = require('sqlite3').verbose();
const Log = require('./logger');


module.exports = class Db {

    constructor(name) {
        this.log = new Log();
        const dbPath = path.resolve(__dirname, '../database/'+name+".sqlite");
        this.conn = new sqlite3.Database(dbPath, (err) => {
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
