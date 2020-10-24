const HomeBot = require('./structure/homebot');
const configs = require('./config.json');

let env;
if (process.argv[2]) {
    env = process.argv[2];
} else {
    env = "prod";
}

// configures DB
const Db = require('./structure/db');
const db = new Db(configs["db_name"][env]).conn;

// Starts the bot 
const token = configs["tokens"][env];
const bot = new HomeBot(token, { polling: true });


// Start command
const Start = require('./my_modules/start_module');
new Start(bot);

// Guestbook commands
const Guestbook = require('./my_modules/guestbook_module');
new Guestbook(bot);

// Grocery shopping events
const ShoppingList = require('./my_modules/shopping_list_module');
new ShoppingList(bot, db);

// Waste calendar
const WasteCalendar = require('./my_modules/waste_calendar_module');
new WasteCalendar(bot);

// test
const Test = require('./my_modules/test_module');
new Test(bot);

// Error handling
var Log = require('./structure/logger');
Log = new Log();
bot.on('polling_error', (error) => {
    Log.e("ERROR", error);
});

if (env == 'prod') {
    // Healthchecks.io (monitors if the bot is up and online)
    const https = require('https');
    setInterval(() => {
        https.get("https://hc-ping.com/263a623a-cf73-4eab-949e-0bb42654296c");
    }, 30 * 60 * 1000); // every 30 minutes
    https.get("https://hc-ping.com/263a623a-cf73-4eab-949e-0bb42654296c");
} else {
    Log.c("Main", "Skipped Healthcheks.io on staging")
}

//Main
Log.c('Main', 'Bot Casa Defra-Tac ready! @' + env);
