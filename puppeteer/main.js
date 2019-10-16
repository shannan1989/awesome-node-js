const chalk = require('chalk');
const puppeteer = require('puppeteer');
const devices = require('puppeteer/DeviceDescriptors');

const width = 1920;
const height = 1080;

(async () => {
    const browser = await puppeteer.launch({
        headless: true,
        devtools: true,
        args: ['--no-first-run', '-no-zygote', '--no-sandbox', '--disable-setuid-sandbox', '--disable-gpu', '--disable-dev-shm-usage']
    });

    console.log(chalk.green('start'));

    const page = await browser.newPage();

    await page.setViewport({
        width: width,
        height: height
    });

    await page.emulate(devices['iPhone X']);

    await page.goto('https://www.baidu.com');

    await page.type('#index-kw', '中国女排');

    await page.waitFor(500);

    await page.click('#index-bn');

    await page.waitFor(1000);

    const dimensions = await page.evaluate(() => {
        return {
            width: document.documentElement.clientWidth,
            height: document.documentElement.clientHeight,
            devicePixelRatio: window.devicePixelRatio
        };
    });
    console.log('dimensions', dimensions);

    page.on('error', () => {});
    page.on('request', () => {});
    page.on('response', () => {});

    await page.screenshot({
        path: 'screenshot.png'
    });

    await page.pdf({
        path: 'screenshot.pdf',
        format: 'A4'
    });

    await browser.close();

    console.log(chalk.yellow('finish'));
})();