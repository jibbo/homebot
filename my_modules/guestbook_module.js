"use strict";

const Module = require('../structure/module');
const fs = require('fs');

module.exports = class Guestbook extends Module {

	registerListeners() {
		this.bot.onText(/\/msg (.+)/, (msg, match) => {
			const chatId = msg.chat.id;
			this.bot.sendMessage(chatId, 'Se, vabbeh, grazie!');

			var name = msg.from.first_name;
			var last = msg.from.last_name;
			var username = msg.from.username;
			var content = name + ' ' + last + ' @' + username + ' says: ' + match[1];

			fs.writeFile('guestbook.txt', content, function (err) {
				if (err) this.log.e('ERROR', err);
			});

			this.log.c('MSG', content);
		});
	}
};