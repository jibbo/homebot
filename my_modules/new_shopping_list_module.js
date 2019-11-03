"use strict";

const Module = require('../structure/module');
const Auth = require('../structure/auth');

module.exports = class ShoppingList extends Module {

    constructor(bot, db) {
        super(bot, db);
        this.auth = new Auth();
        this._prepareDB();
    }

    // Overrides
    registerListeners() {

        this.bot.on('text', (msg) => {
            // tries to understand what the user wants to do
            // and triggers the right action
            const text = msg.text.toLowerCase();
            if (text.includes('comprare') || text.includes('spesa')) {
                this._showGroceryList(msg);
            }
            else if (text.includes('compra')) {
                const match = text.substring(text.indexOf('compra') + 7);
                this._buy(msg, match)
            }
            else if (text.includes('pres')) {
                const match = text.substring(text.indexOf('pres') + 6);
                this._taken(msg, match)
            } else {
                this.bot.notUnderstoodAnswer(msg.chat.id);
            }
        })

        this.bot.onText(/\/nuovalista/, (msg, match) => {
            this._startGroceryList(msg);
        });

        this.bot.onText(/\/cancellalista/, (msg, match) => {
            this._newGroceryList(msg);
        });
    }

    // private functions

    _sendGroceries(chatId) {
        this.db.all("SELECT * FROM GroceryList", (err, rows) => {
            if (err) {
                this.log.e("GLIST", err);
                return;
            }

            if (!rows) {
                this.bot.sendAnimation(chatId, "https://media.giphy.com/media/g01ZnwAUvutuK8GIQn/giphy.gif");
                return;
            }

            var out = '';
            rows.forEach(row => {
                let state = '  ';
                if (row.taken != 0) {
                    state = ' X ';
                }
                out = out + '[' + state + '] ' + row.item + '\n';
            });

            if (out.length == 0) {
                this.bot.sendAnimation(chatId, "https://media.giphy.com/media/g01ZnwAUvutuK8GIQn/giphy.gif");
                return;
            }

            this.bot.sendMessage(chatId, out);
        });
    }

    _buy(msg, what) {
        const chatId = msg.chat.id;
        if (this.auth.isEnabled(chatId)) {
            this.log.c("GLIST", "adding " + what);
            let stmt = this.db.prepare("INSERT OR IGNORE INTO GroceryList VALUES (?,?)");
            stmt.run(what, 0);
            this._sendGroceries(chatId);
        } else {
            this.log.c("GLIST", "unauth /buy by" + msg);
        }
    }

    _showGroceryList(msg) {
        const chatId = msg.chat.id;
        if (this.auth.isEnabled(chatId)) {
            this._sendGroceries(chatId);
        }
    }

    _taken(msg, what) {
        const chatId = msg.chat.id;
        if (this.auth.isEnabled(chatId)) {
        }
    }

    _startGroceryList(msg) {
        const chatId = msg.chat.id;
        if (this.auth.isEnabled(chatId)) {

        }
    }

    _newGroceryList(msg) {
        const chatId = msg.chat.id;
        if (this.auth.isEnabled(chatId)) {

        }
    }

    // DB functions
    _prepareDB() {
        this.db.run("CREATE TABLE IF NOT EXISTS GroceryList (item TEXT NOT NULL UNIQUE, taken INT DEFAULT 0)");
    }

}
