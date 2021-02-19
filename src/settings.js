const URL = 'https://hermon.pres.global/vouchers';
const DAYS_TO_CHECK = ['19','21','22','23'];
const ASYNC_CALENDAR_PATH = '//*[@id="app"]/div/main/div/div/div[2]/div[1]/div[2]/div/div/div[2]';
const ASSERTIONS_INTERVAL = 60000; // milliseconds

// Pushed notification settings (create account at: https://about.pushed.co/)
const APP_KEY = '';
const PUSH_URL = '';
const APP_SECRET = '';
const PUSH_CONTENT = '🎫 Tickets sale STARTED 🎫';

module.exports = {
    URL,
    APP_KEY,
    PUSH_URL,
    APP_SECRET,
    PUSH_CONTENT,
    DAYS_TO_CHECK,
    ASSERTIONS_INTERVAL,
    ASYNC_CALENDAR_PATH,
}
