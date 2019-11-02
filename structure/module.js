"use strict";

const Log = require('./logger.js');

module.exports = class Module {

	constructor(homeBot) {

		if (this.new === Module) {
			throw new TypeError("Cannot construct a Module instances directly, use its subclasses");
		}

		this.bot = homeBot;
		this.log = new Log();

		this.registerListeners();
	}

	registerListeners() {
		console.err("This module is not overriding the registerListeners() method");
	}

}