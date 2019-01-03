"use strict";

const Module = require('../structure/module');

module.exports = class Test extends Module{

	registerListeners(){
		this.bot.onText(/\/test/, (msg, match) => {
			const chatId = msg.chat.id;
			this.bot.negativeAnswer(chatId);
		});
	}
}