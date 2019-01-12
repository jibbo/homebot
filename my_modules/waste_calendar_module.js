"use strict";

const schedule = require('node-schedule');
const Module = require('../structure/module');

const invernalCalendar = ['Un cazzo ❌', 'Carta 🗞', 'Umido ☣', 'Secco ♻',
	'Plastica e Lattine', 'Umido 🐛', 'Sta minchia! 🍌'];
const summerCalendar = ['Umido 🐷','Carta 🗞', 'Umido ☣', 'Secco ♻', 'Umido ☣',
	'Plastica e Lattine', 'Un cazzo ❌'];

const reminderRecipients = ["84840252", "96703266"];

module.exports = class WasteCalendar extends Module {

	constructor(homeBot){
	    super(homeBot);
	    const rule = new schedule.RecurrenceRule();
	    rule.dayOfWeek = new schedule.Range(2,5);
	    rule.hour = 20;
	    rule.minute = 0;

	    schedule.scheduleJob(rule, () => {
		const what = this._getWhatToThrowAway();
		for( var recipient in reminderRecipients){
		    this.bot.sendMessage(
			recipient, 
			'Ohu, buttate via ' + what + 'oggi, va!'
		    );
		}
	    });
	}

	registerListeners(){
		this.bot.onText(/\/spazzatura/, (msg, match) => {
		    this._computeAnswer(msg.from.id);
		});
		this.bot.on(/\/ricordami/, (msg, match) => {

		});
		this.bot.on('text', (msg) =>{
		    if(msg.text.includes('buttare')){
			    this._computeAnswer(msg.from.id);
		    }
		});
	}

	_computeAnswer(chatId){
		const what  = this._getWhatToThrowAway();
		this.bot.sendMessage(chatId, what + '!');
	}

	_getWhatToThrowAway(){
		const date = new Date();
		const month = date.getMonth();

		// summer calendar goes from june to august 
		var cal; 
		if (month>=6 && month<=8) {
			cal = summerCalendar;
		} else {
			cal = invernalCalendar;
		}

		const index = date.getDay()-1;
		return cal[index];
	}
}
