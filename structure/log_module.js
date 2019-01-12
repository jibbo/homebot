"use strict";

const fs = require('fs');

module.exports = class Log {
    e(tag, what) {
        const date = new Date();
        const toLog = date.toLocaleString() + '->' + '[' + tag + '] ' + what;
        console.error(toLog);
    }

    c(tag, what) {
        const date = new Date();
        const toLog = date.toLocaleString() + '->' + '[' + tag + '] ' + what;
        console.log(toLog);
    }

    f(tag, what, user) {
        const date = new Date();
        const formattedDate = date.toISOString().substring(0, 10);
        const fileName = 'log_' + formattedDate + '.txt';

        var userLog = ''
        if (user != null) {
            userLog = 'by ' + user.firstName + ' ' + user.lastName + ' @' + user.username;
        }

        const toLog = date.toLocaleString() + '->' + '[' + tag + '] ' + what + userLog;

        fs.writeFile(fileName, toLog, function (err) {
            if (err) {
                this.e('ERROR', err);
            }
        });

        this.c(tag, toLog);
    }
}
