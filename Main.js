import puppeter from 'puppeteer-extra';
import StealthPlugin from 'puppeteer-extra-plugin-stealth'

puppeter.use(StealthPlugin())
import { MainFunctionForPartner, OpenWebsite, printfulLogin } from './Usefunctions.js';
import { delyTime } from './UseTimeout.js';
//browser new pageage
const url = "https://partners.shopify.com/"

const idsArray = ['nxfYMBo98O6M','nfmxyB055O6M']

const puppeterdiplay = (async () => {
  const browser = await puppeter.launch({
    headless: false,
    defaultViewpageort: null,
    args: ["--start-maximized"]
  })
  let page = await browser.newPage();
  await page.setViewport({
    width: 1400,
    height: 700,
    deviceScaleFactor: 2,
  });
  await OpenWebsite(url, page)
  await delyTime(1000)
  // main for loop for the partner
  await MainFunctionForPartner(page, idsArray, browser)
  //browser close
  // await browser.close()
})
puppeterdiplay()