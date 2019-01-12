"use strict";

const Module = require('../structure/module');

const schedule = require('node-schedule');

module.exports = class Test extends Module{

	registerListeners(){
		this.bot.onText(/\/test/, (msg, match) => {
			const chatId = msg.chat.id;
			this.bot.sendMessage(chatId, chatId);
			this.bot.negativeAnswer(chatId);
		});
	}
}
