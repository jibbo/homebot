"use strict";

const Module = require('../structure/module');
const Auth = require('../structure/auth');

module.exports = class ShoppingList extends Module {

	constructor(bot) {
		super(bot);
		// TODO make usage of a db, look into why sequelize doesn't compile on this machine.
		this.groceryList = {};
		this.auth = new Auth();
	}
	registerListeners() {

		this.bot.on('text', (msg) => {
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

	_groceriesToString() {
		var out = '';
		for (var itemKey in this.groceryList) {
			out = out + '[' + this.groceryList[itemKey] + '] ' + itemKey + '\n';
		}
		if (out.length == 0) {
			return 'O hai il frigo pieno o mangi cazzi!';
		}
		return out;
	}

	_buy(msg, what) {
		const chatId = msg.chat.id;
		if (this.auth.isEnabled(chatId)) {
			this.groceryList[what] = '   ';
			this.bot.sendMessage(chatId, this._groceriesToString());
			this.log.c("GLIST-BUY", what, msg.from);
		}
	}

	_showGroceryList(msg) {
		const chatId = msg.chat.id;
		const userId = msg.from.id;
		if (this.auth.isEnabled(chatId)) {
			this.bot.sendMessage(chatId, this._groceriesToString());
			this.log.c("GLIST", "request", msg.from);
		}
	}

	_taken(msg, what) {
		const chatId = msg.chat.id;
		const userId = msg.from.id;
		if (this.auth.isEnabled(chatId)) {
			for (var itemKey in this.groceryList) {
				if (itemKey == what) {
					this.groceryList[itemKey] = ' X ';
					this.bot.sendMessage(chatId, this._groceriesToString());
					this.log.c('GLIST-TAKE', 'request', msg.from);
					return;
				}
			}
			// item not found
			this.log.c('UNRECOGNIZED', 'GLIST-TAKE', what);
			this.bot.notUnderstoodAnswer(chatId);
			return;
		}
	}

	_startGroceryList(msg) {
		const chatId = msg.chat.id;
		const userId = msg.from.id;
		if (this.auth.isEnabled(chatId)) {
			for (var itemKey in this.groceryList) {
				if (this.groceryList[itemKey] === ' X ') {
					delete this.groceryList[itemKey];
				}
			}
			this.bot.sendMessage(chatId, this._groceriesToString());
			//this.groceryList = {};
			this.log.c('GLIST-NEW', 'request', msg.from);
		}
	}

	_newGroceryList(msg) {
		const chatId = msg.chat.id;
		const userId = msg.from.id;
		if (this.auth.isEnabled(chatId)) {
			this.bot.sendMessage(chatId, 'Tolgo tutto!');
			this.groceryList = {};
			this.log.c('GLIST-START', 'request', msg.from);
		}
	}
}
