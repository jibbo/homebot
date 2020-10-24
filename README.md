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

- Translations and i18n
- NLP
- Admin Module to add or remove users from using some modules
- Automatic `my_module` folder scanning to load scripts during runtime
