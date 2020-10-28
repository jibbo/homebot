# Homebot - the telegram bot for houses 

An extensible telegram bot built for the 🏡 with ❤️

### Installation
Installation takes less than 10 steps! Let's go through them:

1. Clone the repo (or download the zip directly from github):

```
git clone https://github.com/jibbo/homebot.git
```

2. let's create a configuration file starting from the provided example

```
cp config.json.example config.json
```

3. Open `configs.json` in your favourite editor, here simply replace `<YOUR_API_TOKEN>` with the
token given by the botfather. If you don't know what I'm talking about, [here's a
guide.](https://core.telegram.org/bots#6-botfather)

4. You can now start the bot with `npm start`!

5. On telegram, open a chat with the bot (just look for the handle you created within botfather) and
type `/test`.  It will give you a number, copy it.

6. Stop the bot by pressing CTRL+C.

7. Open `configs.json` again and replace `"<YOUR_CHAT_ID>"` with  the number the bot gave you. The
result should looks approximatively like this:

```
{
    "bot_name": "My HomeBot"
    "tokens": {
	"prod": "abcdef.....blahBlah" //this is the botfather token
    },
    "db_name":{
	"prod": "prod.db"
    },
    "auth_chats" : [123456789] //this is the chat id given by the bot
}
```

8. start the bot again with `npm start`

9. Enjoy! 

### Adding modules

Simply drop a module file (it should be a valid `.js`) file inside the `my_modules` folder. Now
initialize the module inside the file `bot.js`. Just under the comment `// add your modules here`.

### Removing modules

Delete the module initialization inside the file `bot.js` anddelete the unwanted module file from the `my_module` folder.

### Create a module

Look at `test.js` inside the `my_module` folder, it's simple enough and gives you all you need to
start developing your own modules

### Next features
In no particular order:

- Translations and i18n
- NLP
- Admin Module to add or remove chat ids from authenticated ones
- Automatic `my_module` folder scanning to load scripts during runtime
