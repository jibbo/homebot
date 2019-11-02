"use strict";

const authChats = require('../auth_chats.json');

module.exports = class Auth {

    isEnabled(chatId){
        return authChats.indexOf(chatId) > -1;
    }
}