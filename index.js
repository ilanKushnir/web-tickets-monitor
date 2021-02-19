const puppeteer = require('puppeteer');
const player = require('play-sound')(opts = {})
const {
    setIntervalAsync,
    clearIntervalAsync
} = require('set-interval-async/dynamic')

const URL = 'https://hermon.pres.global/vouchers';
const ASYNC_CALENDAR_PATH = '//*[@id="app"]/div/main/div/div/div[2]/div[1]/div[2]/div/div/div[2]';
const ASSERTIONS_INTERVAL = 60000; // milliseconds
const DAYS_TO_CHECK = ['20','21','22','23'];

let browser;
let page;
let counter = 1;
let assertionsLoop;

startMonitoring();

async function startMonitoring() {
    await init(URL);
    alertLog(`started monitoring`, '-');
    infoLog(`started at: ${new Date()}`)
    infoLog(`refresh rate: every ${ASSERTIONS_INTERVAL / 1000} seconds`)
    infoLog(`url: ${URL}`)
    infoLog('GOOD LUCK')

    assertionsLoop = setIntervalAsync(async () => {
            await assertHermonTickets(URL);
        },
        ASSERTIONS_INTERVAL
    )
}

async function assertHermonTickets(url) {
    console.log(`\n> assertions counter: ${counter++}\n`);

    await page.goto(url)
    infoLog(`reached url: ${URL}`)

    // wait for async calendar load
    if (ASYNC_CALENDAR_PATH != '') {
        await page.waitForXPath(ASYNC_CALENDAR_PATH)
        infoLog('async calendar loaded')
    }

    // takeScreenshot(page)
    console.log('\n    _________________________')
    for await (day of DAYS_TO_CHECK) {
        process.stdout.write(`    | - checking day: ${day}`);
        const dayParentElements = await getDayParentElements(day);
        const style = extractParentButtonStyles(dayParentElements);
        finalCheck(style);
    }
    console.log('    -------------------------')
}

async function init(url) {
    alertLog('initializing puppeteer', '-')
    browser = await puppeteer.launch()
    infoLog('created puppeteer browser')
    page = await browser.newPage()
    infoLog('created new page\n')
    takeScreenshot(page, 'init', counter)
}

function finalCheck(style = '') {
    if (!style.includes('transparent')) {
        console.log(' ✅ |');
        clearIntervalAsync(assertionsLoop);
        alertLog(`TICKETS SALE! ⏱ ${new Date().toString()}`, '🏂');
        playSiren(7000)
    } else {
        console.log(' ❌ |');
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

function playSiren(interval = 10000) {
    setInterval(() => {
        player.play('./assets/sounds/siren.wav', function(err){
            if (err) throw err
        })
        alertLog('BUY NOW!', '🎫');
    }, interval)
}

function infoLog(str) {
    console.log('•', str);
}

function takeScreenshot(page, name = 'screenshot', counter = '') {
    page.screenshot({path: `./screenshots/${name}${counter}.png`});
    infoLog('took screenshot and saved')
}
