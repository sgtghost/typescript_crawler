# typescript_crawler

A simple CLI script to retrieve and present the top 5 priced DeFi coins listed on the Binance exchange.

This crawler is written in pure Typescript (https://www.typescriptlang.org/), using the Puppeteer (https://github.com/puppeteer/puppeteer) tooling to perform the web scraping.

You can check the notes in code file for more details.

## Deployment

### For windows

#### Install TypeScript & Puppeteer
npm install typescript --save-dev

npm i puppeteer
### For linux
#### Install TypeScript & Puppeteer

'# Using Ubuntu
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt-get install -y nodejs

# Using Debian, as root
curl -fsSL https://deb.nodesource.com/setup_18.x | bash -
apt-get install -y nodejs'

##### Important: You need to install latest npm & node.js manually because Ubuntu package update sucks.
References: https://github.com/nodesource/distributions/blob/master/README.md

Please refer to the Installation instructions section.






## Execution & Result

### Execution
npx ts-node MyFirstTSCrawler.ts

### Result
The results will be printed out in the console.

And it should be something like this:

-------------------

 TOP 5 DEFI PRICES
 
-------------------

1. YFI - A$14,489.79
2. YFII - A$1,498.66
3. MKR - A$1,130.43
4. BIFI - A$580.06
5. AUTO - A$421.74

-------------------
