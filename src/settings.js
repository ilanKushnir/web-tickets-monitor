const URL = 'https://hermon.pres.global/vouchers';
const ASYNC_CALENDAR_PATH = '//*[@id="app"]/div/main/div/div/div[2]/div[1]/div[2]/div/div/div[2]';
const ASSERTIONS_INTERVAL = 3000; // milliseconds
const DAYS_TO_CHECK = ['20','21','22','23'];

module.exports = {
    URL,
    ASSERTIONS_INTERVAL,
    ASYNC_CALENDAR_PATH,
    DAYS_TO_CHECK
}
