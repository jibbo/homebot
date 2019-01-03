"use strict";

const Module = require('../structure/module');

// only these users can use this module
const whitelist = [84840252, 96703266];
// TODO make usage of a db, look into why sequelize doesn't compile on this machine.
var groceryList = {};

module.exports = class ShoppingList extends Module{
	
	registerListeners(){

		this.bot.on('text', (msg) =>{
			if(msg.text.includes('comprare')|| msg.text.includes('spesa')){
				this._showGroceryList(msg);
			}
			else if(msg.text.includes('compra')){
				const text = msg.text;
				const match = text.substring(text.indexOf('compra')+7);
				this._buy(msg, match)
			}
			else if(msg.text.includes('pres')){
				const text = msg.text;
				const match = text.substring(text.indexOf('pres')+6);
				this._taken(msg, match)
			}
		})

		this.bot.onText(/\/nuova/, (msg,match) => {
			this._startGroceryList(msg);
		});

		this.bot.onText(/\/cancella/, (msg, match) => {
		    this._newGroceryList(msg);
		});
	}

	_isAuthenticated(user){
		if(whitelist.indexOf(user.id)>=0){
			return true;
		}
		return false;
	}

	_groceriesToString(){
	    var out = '';
	    for(var itemKey in groceryList){
			out= out + '['+ groceryList[itemKey] + '] ' + itemKey +'\n';
	    }
	    if( out.length==0 ){
	    	return 'O hai il frigo pieno o mangi cazzi!';
	    }
	    return out;
	}

	_buy(msg, what){
		const chatId = msg.chat.id;
	    if(this._isAuthenticated(msg.from)){
	    	groceryList[what] = '   ';
			this.bot.affermativeAnswer(chatId);
			this.bot.sendMessage(chatId, this._groceriesToString());
			this.log.c("GLIST-BUY", what, msg.from);
	    } else {
			this.log.f('UNAUTHORIZED', '/buy', msg.from);
	    }
	}

	_showGroceryList(msg){
		const chatId = msg.chat.id;
	    const userId = msg.from.id;
	    if(this._isAuthenticated(msg.from)){
		    this.bot.doSomethingAnswer(chatId);
		    this.bot.sendMessage(chatId, this._groceriesToString());
		    this.log.c("GLIST", "request", msg.from);
	    } else {
			this.log.f('UNAUTHORIZED', '/showGroceryList', msg.from);
	    }
	}

	_taken(msg, what){
	    const chatId = msg.chat.id;
	    const userId = msg.from.id;
		if(this._isAuthenticated(msg.from)){
				for(var itemKey in groceryList){
					if(itemKey == what){
						groceryList[itemKey] = ' X ';
						this.bot.sendMessage(chatId, 'Bye, Bye 💸');
						this.bot.sendMessage(chatId, this._groceriesToString());
						this.log.c('GLIST-TAKE', 'request', msg.from);
						return;
					}
				}
				// item not found
				this.log.c('UNRECOGNIZED', 'GLIST-TAKE', what);
				this.bot.sendMessage(chatId, 'Ma che stai a dì? 🤔');
				return;
			}
			this.log.f('UNAUTHORIZED', '/take', msg.from);
	}

	_startGroceryList(msg){
		const chatId = msg.chat.id;
	    const userId = msg.from.id;
	    if(this._isAuthenticated(msg.from)){
	    	for(var itemKey in groceryList){
				if(groceryList[itemKey] === ' X '){
					delete groceryList[itemKey];
				}
			}
	    	this.bot.doneAnswer(chatId);
			this.bot.sendMessage(chatId, this._groceriesToString());
			groceryList = {};
			this.log.c('GLIST-NEW', 'request', msg.from);
	    } else {
			this.log.f('UNAUTHORIZED', '/newGroceryList', msg.from);
	    }
	}

	_newGroceryList(msg){
		const chatId = msg.chat.id;
	    const userId = msg.from.id;
	    if(this._isAuthenticated(msg.from)){
	    	this.bot.doneAnswer(chatId);
			this.bot.sendMessage(chatId, 'Tolgo tutto!');
			groceryList = {};
			this.log.c('GLIST-START', 'request', msg.from);
	    } else {
			this.log.f('UNAUTHORIZED', '/startGroceryList', msg.from);
	    }
	}
}
