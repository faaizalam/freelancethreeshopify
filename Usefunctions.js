import { error } from "console";
import CvsMaking from "csv-writer"
import fs from "fs"
import { AuthenticationForAddAppPage, Login } from "./LoginPage.js";
import { delyTime } from "./UseTimeout.js";
const Partneremial = "junaid.12194@iqra.edu.pk"
const PartnerPassword = "Junaid03243384301"
const PrintFullEmail = "faaiz.13527@iqra.edu.pk"
const PrinFullPassword = "karachipakistan123@"

// const csvHeaders = [
//     { id: 'id', title: 'ID' },

//     { id: 'api', title: 'API' },

//     { id: 'name', title: 'Name' },
//   ];

//   // Define the data for your CSV file
// const csvData = [
//   { id: 1, api: 'example.com/api1', name: 'API 1' },

//   { id: 2, api: 'example.com/api2', name: 'API 2' },

//   { id: 3, api: 'example.com/api3', name: 'API 3' },
// ];

export const OpenWebsite = (async (url, page) => {

  try {
    await page.setDefaultNavigationTimeout(100000);
    await page.goto(url);
    try {
      await Login(page, Partneremial, PartnerPassword)

    } catch (error) {
      console.log(error.message, "error from login inside openWebiste Function")

    }

  } catch (error) {

    console.log(error.message, "error from open website from  openWebiste Function its likly internet issue")
  }

  // const waitToGopagelogin=setTimeout(()=>2000)
  // await page.waitForNavigation();


  // try {
  //     const c=CvsMaking.createObjectCsvWriter({
  //         path: 'output.csv',
  //         header: csvHeaders,
  //       });

  //       // Write the data to the CSV file

  //         c.writeRecords(csvData)
  //         .then(() => console.log('CSV file successfully written'))
  //         .catch((err) => console.error(err))

  // } catch (error) {
  //     console.log(error.message)

  // }





})


export const MainFunctionForPartner = (async (page, idsArray, browser) => {

  // loop starting

  try {

    for (const IDNum of idsArray) {
      // this link is given to only specific different user meaning if you use your credentail -- 
      // so will be given different id 2935432 this id makes sure 
      // see your id by inspecting it then just change this id with yours (if you use your credentials)
      // await page.goto("https://partners.shopify.com/2935432/stores")
      // await page.waitForSelector('.Polaris-Button__Content');
      await page.goto("https://partners.shopify.com/2935432/stores/new?store_type=client_store")
      console.log(await page.url())
      await page.waitForSelector("#PolarisTextField1")
      await page.type("#PolarisTextField1", IDNum)
      await delyTime(2000)
      try {
        await page.waitForSelector("#PolarisRadioButton4")
        await page.evaluate(() => {
          document.querySelector("#PolarisRadioButton4").click()

        });


      } catch (error) {
        console.log(error.message, "message from radio button")

      }

      // creating store button clicking
      try {
        await delyTime(3000)
        await page.waitForSelector("#AppFrameMain > div > div > div.Polaris-Page--divider > form > div > div:nth-child(2) > div > div > div > button")
        await page.evaluate(() => {
          document.querySelector("#AppFrameMain > div > div > div.Polaris-Page--divider > form > div > div:nth-child(2) > div > div > div > button").click()
        })

        // after
        console.log("done from loading after making the store")
        await page.waitForNavigation();
        const urlcheck = await page.url()
        if (urlcheck.includes("https://accounts.shopify.com/lookup?rid")) {
          await AuthenticationForAddAppPage(page, Partneremial, PartnerPassword)


        } else {
          console.log("not working")
        }
        // console.log("done",IDNum)

      } catch (error) {
        console.log(error.message, "message from create development store button")

      }

      // after clicking on create store working on Add apps
      await page.waitForNavigation()
      await AddAppSection(page, browser)





    }


  } catch (error) {
    console.log(error.message, "this is from mainPartner Loop Main catch Block")

  }





})



const AddAppSection = (async (page, browser) => {
  try {
    await page.waitForSelector('div.B0BXh > button.p4_T8', {timeout:10000, visible: true });
    console.log("will click after 10 sec")
    await delyTime(50000)
    await page.evaluate(() => {
      document.querySelector("div.B0BXh > button.p4_T8").click()
    })
    console.log("clicked on Add app")
    // await page.waitForNavigation()

  } catch (error) {
    console.log(error.message, "error from clicking at add app button")

  }




  // div.MFHcw > button > span
  try {
    await page.waitForSelector('button[aria-label="Directly install Printful: Print on Demand"]', { timeout:20000, visible: true });


    console.log("will click after 10 sec")
    // await delyTime(10000)
    await page.evaluate(() => {
      document.querySelector('button[aria-label="Directly install Printful: Print on Demand"]').click()
    })

    await Newtabfunction(page, browser)
  } catch (error) {
    console.log(error.message, "error while getting button which redirects to install app")

  }






})







const Newtabfunction = (async (page, browser) => {
  try {
    
 
  const target = await browser.waitForTarget(target => target.opener() === page.target());
  const newPage = await target.page();
  await newPage.waitForNavigation();
  // console.log()
  try {
    console.log(await newPage.url())
    await newPage.waitForSelector("button.Polaris-Button_r99lw ", { visible: true });
    console.log("done visible")
    await delyTime(6000)
    console.log("now going to click on install")
    await newPage.evaluate(() => {
      // Find the button element with class Polaris-Button_r99lw that is a direct child of a div element with class Polaris-Box_375yx
      document.querySelector('div.Polaris-Box_375yx > button.Polaris-Button_r99lw').click()
      // Simulate a click on the button element

    });


    // await page.evaluate(()=>{
    //    document.querySelector(".Polaris-Box_375yx").click()
    // })
    console.log("installed")
    // await page.waitForNavigation()
    // await newPage.waitForNavigation();
    // await newPage.waitForNavigation({ waitUntil: 'networkidle2' });
    await Printfull(newPage,page,browser);

    // await Printfull(newPage)


    // this down function for Printfull page'
   
    // // await page.waitForNavigation()
    //   await Printfull(originalPage)
  } catch (error) {
    console.log(error.message, "error while clicking on install app")

  }
} catch (error) {
  console.log(error,"this is the isnide functon of the new tab")
    
}

})

// the work of https://www.printful.com/dashboard/connect-confirm from here

const Printfull = (async (newPage,page,browser) => {
  console.log("worked Printfull func")
  const whichPageits=await newPage.url()
 if (whichPageits.includes("https://www.printful.com/auth/login")) {
  await printfulLogin(newPage)
  }else{

 
  await newPage.waitForNavigation()
  console.log("stopped loading")
  // const continueBtn = await newPage.$('#content > div > div > div > div.col-xs-12.col-md-6.pf-py-64.pf-p-md-64.main-auth__info > div.pf-my-auto > div > div:nth-child(1) > div.pf-d-flex.pf-justify-content-center > div > div > div > div > div > div > div > div > div.col-sm-auto.pf-mt-8.pf-my-sm-auto > button');
  await newPage.waitForSelector('#content > div > div > div > div.col-xs-12.col-md-6.pf-py-64.pf-p-md-64.main-auth__info > div.pf-my-auto > div > div:nth-child(1) > div.pf-d-flex.pf-justify-content-center > div > div > div > div > div > div > div > div > div.col-sm-auto.pf-mt-8.pf-my-sm-auto > button',{timeout:10000, visible: true })
  console.log("continue button found");
  await newPage.click("#content > div > div > div > div.col-xs-12.col-md-6.pf-py-64.pf-p-md-64.main-auth__info > div.pf-my-auto > div > div:nth-child(1) > div.pf-d-flex.pf-justify-content-center > div > div > div > div > div > div > div > div > div.col-sm-auto.pf-mt-8.pf-my-sm-auto > button");
  await newPage.waitForSelector("#connect-confirm-button", { visible: true });
  await delyTime(5000);
  await newPage.click("#connect-confirm-button");

 
  console.log("done all now start working for api")
 }
  // await newPage.goto(page);
  // await newPage.close()
  await newPage.close();

  // Switch back to the original tab
  await page.bringToFront();
  
})









export async function printfulLogin(page) {
  
  await page.goto("https://www.printful.com/auth/login", { timeout: 0 });
  await delyTime(5000);
  // c
  console.log("worked Printfull login func")
  try {
    await page.waitForSelector('button[data-test="allow-all-cHLDkrEfrVoYQEQ"]',{ timeout:20000, visible: true })
    await page.evaluate(() => {
      document.querySelector('button[data-test="allow-all-cHLDkrEfrVoYQEQ"]').click()
    })
    console.log("clicked")
  } catch (error) {
    console.log(error.message, "error while clicking the cookies of printfull")
  }
  // c
  await page.type("#login-email", PrintFullEmail, { delay: 100 })
  await page.type("#login-password", PrinFullPassword, { delay: 100 })
  await delyTime(3000)
  await page.evaluate(() => {
    document.querySelector('input[value="Sign in"]').click()
  });
  // const existCaptcha = await newPage.waitForSelector("#rc-imageselect");
  await delyTime(5000)
  console.log("checking for the captcha")
   
  let existCaptcha=false
  existCaptcha = await page.evaluate(() => {
    const captchaElement = document.querySelector('iframe[title="recaptcha challenge expires in two minutes"]')!==null
    return captchaElement
    });
  
  console.log(existCaptcha)
  
  while (existCaptcha) {
    
    if (existCaptcha) {
      existCaptcha=false
      await printfulLogin(page)
      
    }
  }
  console.log("captcha exists will try back after 10 sec")
  await delyTime(10000)
  // await delyTime(5000);



}