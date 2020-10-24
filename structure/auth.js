"use strict";

const authChats = require('../config.json')["auth_chats"];

module.exports = class Auth {

    isEnabled(chatId){
        return authChats.indexOf(chatId) > -1;
    }
}
