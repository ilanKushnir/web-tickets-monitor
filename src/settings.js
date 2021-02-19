const URL = 'https://hermon.pres.global/vouchers';
const DAYS_TO_CHECK = ['20','21','22','23'];
const ASYNC_CALENDAR_PATH = '//*[@id="app"]/div/main/div/div/div[2]/div[1]/div[2]/div/div/div[2]';
const ASSERTIONS_INTERVAL = 60000; // milliseconds

module.exports = {
    URL,
    DAYS_TO_CHECK,
    ASSERTIONS_INTERVAL,
    ASYNC_CALENDAR_PATH,
}
