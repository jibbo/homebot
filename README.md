# Homebot - the telegram bot for houses 

An extensible telegram bot built for the 🏡 with ❤️

### Installation

- Clone the repo
- run `cp config.json.example config.json`
- Add your telegram bot token to the config.json
- start the bot with `npm start`
- On telegram, open a chat with the both and type `/test`
- copy that number in `config.json` inside the `auth_chats`
- stop the bot with CTRL+C
- start the bot again
- Enjoy!

### Adding modules

Simply drop any `.js` file inside the `my_modules` folder

### Removing modules

Simply move out (or delete) the unwanted module from the `my_modules` folder

### Create a module

Look at `test.js` inside the `my_module` folder, it's simple enough and gives you all you need to
start developing your own modules

### Next features
In no particular order:

- NLP
- Admin Module to add or remove users from using some modules
- Automatic `my_module` folder scanning to load scripts

### License

```
Copyright (C) 2019 Giovanni De Francesco (@jibbo, posta.giovanni.defrancesco@gmail.com)
This program is free software: you can redistribute it and/or modify it under the terms of the GNU General Public License as published by the Free Software Foundation, version 3.

This program is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU General Public License for more details.

You should have received a copy of the GNU General Public License along with this program. If not, see <https://www.gnu.org/licenses/>.
```
