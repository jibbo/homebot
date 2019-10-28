"use strict";

const schedule = require('node-schedule');
const Module = require('../structure/module');

// Sunday, Monday, Tuesday, etc...
const invernalCalendar = ['Sta minchia! 🍌', 'Un cazzo ❌', 'Carta 🗞', 'Umido ☣', 'Secco ♻',
	'Plastica e Lattine', 'Umido 🐛'];
const summerCalendar = ['Un cazzo ❌', 'Umido 🐷', 'Carta 🗞', 'Umido ☣', 'Secco ♻', 'Umido ☣',
	'Plastica e Lattine'];

module.exports = class WasteCalendar extends Module {

	constructor(homeBot) {
		super(homeBot);
		this.rule = new schedule.RecurrenceRule();
		this.rule.dayOfWeek = [0, 1, 2, 3, 4, 5, 6];
		this.rule.hour = 20;
		this.rule.minute = 0;

		schedule.scheduleJob(this.rule, () => {
			const what = this._getWhatToThrowAway();
			try {
				this.bot.sendMessage(
					'84840252',
					'Ohu, buttate via ' + what + 'oggi, va!'
				);
			} catch (err) {
				this.bot.sendMessage('84840252', err);
				this.log.e("[SCHEDULE]", "Can't reach: " + recipient);
				this.log.f("[SCHEDULE]", err);
			}
		});
	}

	registerListeners() {
		this.bot.onText(/\/spazzatura/, (msg, match) => {
			this._computeAnswer(msg.from.id);
		});
		this.bot.on('text', (msg) => {
			msg.text = msg.text.toLowerCase();
			if (msg.text.includes('buttare')) {
				this._computeAnswer(msg.from.id);
			}
		});
	}

	_computeAnswer(chatId) {
		const what = this._getWhatToThrowAway();
		this.bot.sendMessage(chatId, what + '!');
	}

	_getWhatToThrowAway() {
		const date = new Date();
		const month = date.getMonth();

		// summer calendar goes from june to august 
		var cal;
		if (month >= 6 && month <= 8) {
			cal = summerCalendar;
		} else {
			cal = invernalCalendar;
		}

		this.log.c("WASTE-REQUEST", date);

		var index = date.getDay();

		return cal[index];
	}
}
