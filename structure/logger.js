"use strict";

const fs = require('fs');
const https = require('https');
const tokens = require('../secrets.json');

module.exports = class Log {

    constructor() {
        let env;
        if (process.argv[2]) {
            env = process.argv[2];
        } else {
            env = "prod";
        }
        this._token = tokens[env];
    }

    e(tag, what) {
        const date = new Date();
        const toLog = date.toLocaleString() + '->' + '[' + tag + '] ' + what;
        console.error(toLog);

        this.f(tag, what, null);

        //tries to send the error back to the admin chat.
        // TODO fix hardcoded chatId
        const toSend = encodeURIComponent(toLog);
        https.get(
            "https://api.telegram.org/bot" +
            this._token +
            "/sendMessage?chat_id=84840252&text=" +
            toSend
        );
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
    }
}
