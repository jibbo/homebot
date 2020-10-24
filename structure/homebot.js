"use strict";

const TelegramBot = require('node-telegram-bot-api');
const authChats = require('../config.json')["auth_chats"];

const affirmative = ['Sì!', 'Ok 👌', 'Va bene!'];
const done = ['Fatto! 🕴', 'Finito! 👌'];
const doSomething = ['Agli ordini! 👮', 'Vabbeh...😓', 'Se insisti...',
	'Solo per stavolta! 😠', 'Solo perché sei tu 😍', 'Eccoci! 🙃'];
const negative = ['Non posso...', 'Col cazzo! 😜', 'Fattelo da solo! 🖕'];
const notUnderstood = ['Ma che stai a dì? 🤔', 'Non ho capito 😅'];

module.exports = class HomeBot extends TelegramBot {

	affermativeAnswer(chatId) {
		this._answer(chatId, affirmative);
	}

	negativeAnswer(chatId) {
		this._answer(chatId, negative);
	}

	doSomethingAnswer(chatId) {
		this._answer(chatId, doSomething);
	}

	doneAnswer(chatId) {
		this._answer(chatId, done);
	}

	notUnderstoodAnswer(chatId) {
		this._answer(chatId, notUnderstood);
	}

	broadcast(what){
	    authChats.forEach(chatId =>{
	      this.sendMessage(chatId, what);
	    });
	}

	_answer(chatId, answerBucket) {
		var index = Math.floor((Math.random() * answerBucket.length) + 1) - 1;
		this.sendMessage(chatId, answerBucket[index]);
	}
}
