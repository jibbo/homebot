"use strict";

const Module = require('../structure/module');

module.exports = class Start extends Module{
	registerListeners(){
		this.bot.onText(/\/start/, (msg, match) =>{
			const chatId = msg.chat.id;
			this.bot.sendMessage(chatId, "Ciao!👋 Lascia un messaggio con /msg ☺");
		});
	}
};