// Import the puppeteer library
const puppeteer = require("puppeteer");

// Timeout handler. In case the page fails to load in time, reload it.
async function handleTimeout(page: any, url: string) {
    try {
        console.log("It's kinda freezing. Let's heat it up");
        await page.reload({ waitUntil: ["networkidle2", "domcontentloaded"] });
    }
    catch (e) {
        if (e instanceof puppeteer.errors.TimeoutError) {
            handleTimeout(page, url);
        }
    }
}

(
    async() => {
        // Setup up the browser & page
        // const browser = await puppeteer.launch({headless: false, executablePath: '/usr/bin/chromium-browser'}); For linux
        // *npm install puppeteer* seems to fail install chromium on Linux
        // Reference for linux setup: https://stackoverflow.com/questions/59979188/error-failed-to-launch-the-browser-process-puppeteer
        const browser = await puppeteer.launch({headless: false}); //For windows

        const page = await browser.newPage();
        // Make sure the critical elements will be loaded before we start any action
        // The div that holds all cryptos infos
        page.waitForXPath("//div[@class='css-1vuj9rf']", {visible:true});
        // The CHILD of the price filter we need to click
        page.waitForXPath("//div[@title='Price']", {visible:true});
        const url = "https://www.binance.com/en-AU/markets/coinInfo-defi";

        // Timeout handler. In case the page fails to load, refresh it.
        // Check the handleTimeout function above.
        try {
            console.log("Connecting to the target url...")
            await page.goto(url, {waitUntil : ["networkidle2", "domcontentloaded"]});
        }
        catch (e) {
            if (e instanceof puppeteer.errors.TimeoutError) {
                handleTimeout(page, url);
            }
        }

        // The page is loaded. let's switch to the price filter first.
        // Select the price filter using xpath
        const priceFilter = await page.$x("//div[@title='Price']/..");
        // Click the price tag twice to make sure the price list is sorted is descending order
        // And something WEIRD happened here.
        // await priceFilter[0].click() would return Error: Node is detached from document
        // Yet I did make sure the element to be clicked is loaded and visible.
        // Anyway let's continue the script solution.
        await page.evaluate((element: any) => {
            element.click()
          }, priceFilter[0]);
        await page.evaluate((element: any) => {
            element.click()
          }, priceFilter[0])
        // console.log("Price element clicked.");


        // // *Print* Just for debugging. To see if the element was clicked twice or not.
        // try {
        //     console.log("Printing the whole page...");
        //     await page.pdf({path: "crypto.pdf", format: "a4"});
        // }
        // // And for Puppeteer generating a pdf is currently only supported in Chrome headless.
        // catch (e) {
        //     if (e instanceof puppeteer.errors.ProtocolError) {
        //         console.log("We are not using headless mode. Skip it");
        //     }
        // }
        
        // // Yet another block for debugging.
        // console.log("Take a screenshot of this page...");
        // await page.screenshot({path: "crypto.png"});


        // console.log("Everything is checked!");
        // Alright. Now everything is checked, we can finally grab the cryptos
        // that we need and parse them.
        const cryptos = await page.$$(".css-vlibs4");
        // And we shall print it out in the format we want.
        console.log("-------------------");
        console.log(" TOP 5 DEFI PRICES");
        console.log("-------------------");
        for (let i = 0; i < 5; i++) {
            // Use script to get the text of the elements we want
            const temp = await page.evaluate((ele: any) => ele.innerText, cryptos[i]);
            // Split it up and concat the parts we need
            const texts = temp.split('\n');
            console.log((i + 1).toString() + ". " + texts[0] + " - " + texts[2]);
        }
        console.log("-------------------");
        
        // Everything is done and don't forget to close it.
        await browser.close();
        console.log("Done!");
    }
)();


