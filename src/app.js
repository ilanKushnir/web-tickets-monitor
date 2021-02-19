const open = require('open');
const axios = require('axios').default;
const player = require('play-sound')(opts = {})
const puppeteer = require('puppeteer');
const {
    setIntervalAsync,
    clearIntervalAsync
} = require('set-interval-async/dynamic')

const {
    URL,
    APP_KEY,
    PUSH_URL,
    APP_SECRET,
    PUSH_CONTENT,
    DAYS_TO_CHECK,
    ASYNC_CALENDAR_PATH,
    ASSERTIONS_INTERVAL,
} = require('./settings')

let page;
let browser;
let counter = 1;
let assertionsLoop;

startMonitoring();

async function startMonitoring() {
    await initPuppeteer();
    alertLog(`started monitoring`, '-');
    infoLog(`started at: ${new Date()}`, '🏁')
    infoLog(`refresh rate: every ${ASSERTIONS_INTERVAL / 1000} seconds`, '🔄')
    infoLog(`url: ${URL}`, '🌍')
    infoLog('GOOD LUCK', '🙏')

    assertionsLoop = setIntervalAsync(async () => {
            await assertHermonTickets(URL);
        },
        ASSERTIONS_INTERVAL
    )
}

async function assertHermonTickets(url) {
    console.log(`\n> assertions counter: ${counter++}\n`);

    await page.goto(url)
    infoLog(`reached url: ${URL}`, '🖥')

    // wait for async calendar load
    if (ASYNC_CALENDAR_PATH != '') {
        await page.waitForXPath(ASYNC_CALENDAR_PATH)
        infoLog('async calendar loaded', '📆')
    }

    // takeScreenshot(page)
    console.log('\n    _________________________')
    for await (day of DAYS_TO_CHECK) {
        process.stdout.write(`    | - checking day: ${day}`);
        const dayParentElements = await getDayParentElements(day);
        const style = extractParentButtonStyles(dayParentElements);
        styleCheck(style);
    }
    console.log('    -------------------------')
}

async function initPuppeteer() {
    alertLog('initializing puppeteer', '-')
    browser = await puppeteer.launch()
    infoLog('created puppeteer browser')
    page = await browser.newPage()
    infoLog('created new page\n')
    takeScreenshot(page, 'init', counter)
}

function notifyAvailability() {
    clearIntervalAsync(assertionsLoop);
    console.log(' ✅ |');
    alertLog(`TICKETS SALE! ⏱ ${new Date().toString()}`, '🏂');
    playSiren()
    sendPushNotification()
    open(URL)
}

async function sendPushNotification() {
    if (APP_SECRET && APP_KEY && PUSH_CONTENT && PUSH_URL) {
        var data = JSON.stringify({
            "app_key": APP_KEY,
            "app_secret": APP_SECRET,
            "target_type": "app",
            "content": PUSH_CONTENT
        });

        var config = {
            method: 'post',
            url: PUSH_URL,
            headers: {
                'Content-Type': 'application/json',
            },
            data : data
        };

        axios(config)
            .then(function (response) {
                infoLog('Push notification sent successfuly', '🔔')
            })
            .catch(function (error) {
                infoLog('Failed to send push notification', '🚫')
            });
    } else {
        infoLog('Missing push notifications settings', '🚫');
    }
}

function styleCheck(style = '') {
    if (!style.includes('transparent')) {
        notifyAvailability()
    } else {
        console.log(' ❌ |')
    }
}

async function getDayParentElements(day) {
    return await page.$x(`//*[contains(text(), '${day}')]/parent::*`);
}

function extractParentButtonStyles(parentElementsList) {
    let parentButtonStyles = '';
    parentElementsList.forEach(element => {
        if (element._remoteObject.className === 'HTMLButtonElement'){
            parentButtonStyles = element._remoteObject.description;
        }
    })
    return parentButtonStyles;
}

function alertLog(str = '', alertChar = '#') {
    let output =
`${alertChar.repeat(str.length + 10)}
${alertChar.repeat(4)} ${str} ${alertChar.repeat(4)}
${alertChar.repeat(str.length + 10)}
`;
    console.log(output);
}

function playSiren(interval = 13000) {
    setInterval(() => {
        player.play('./assets/sounds/alert.mp3', function(err){
            if (err) throw err
        })
        alertLog(`BUY NOW! at: ${URL}`, '🎫');
    }, interval)
}

function infoLog(str, char = '•') {
    console.log(char,'-', str);
}

function takeScreenshot(page, name = 'screenshot', counter = '') {
    page.screenshot({path: `./screenshots/${name}${counter}.png`});
    infoLog('took screenshot and saved', '📸')
}
