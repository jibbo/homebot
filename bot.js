// Telegram config
const HomeBot = require('./structure/homebot');
const token = '788887646:AAETM8STPxQz6Bol6egLqqf-tNpUbQNBZ4I'
const bot = new HomeBot(token, { polling: true });

// Start command
const Start = require('./my_modules/start_module');
new Start(bot);

// Guestbook commands
const Guestbook = require('./my_modules/guestbook_module');
new Guestbook(bot);

// Grocery shopping events
const ShoppingList = require('./my_modules/shoppinglist_module');
new ShoppingList(bot);

// Waste calendar
const WasteCalendar = require('./my_modules/waste_calendar_module');
new WasteCalendar(bot);

// test
const Test = require('./my_modules/test_module');
new Test(bot);

// Error handling
var Log = require('./structure/log_module');
Log = new Log();
bot.on('polling_error', (error) => {
    Log.e("ERROR", error);
});

//Main
console.log('Bot Casa Defra-Tac ready!');
