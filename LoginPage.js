import fs from "fs"
import { delyTime } from "./UseTimeout.js"
import { printfulLogin } from "./Usefunctions.js"
export const Login = (async (page, Partneremial, PartnerPassword) => {
  if (fs.existsSync("./cookiess.json")) {
    const gettingcookies = await fs.promises.readFile("./cookiess.json")
    const savecook = JSON.parse(gettingcookies)
    console.log("checking cookies")
    if (savecook) {
      console.log("yes cookies present")
      await page.setCookie(...savecook)
      await page.waitForTimeout(2000)
      await printfulLogin(page);
      await page.goto("https://partners.shopify.com/2935432")
      return
    }

  } else {
    await printfulLogin(page);
    await page.goto("https://partners.shopify.com/organizations")

    try {
      // console.log("you have to be logged in")
      // await page.waitForSelector('#account_email')
      // await page.type("#account_email",Partneremial)
      // await page.waitForSelector("#account_lookup > button",{ timeout: 10000 })
      // await delyTime(6000)

      // await page.evaluate(() => {
      //   document.querySelector('#account_lookup > button').click()
      // })
      console.log("you have to be logged in")
      await page.waitForSelector('#account_email')
      await page.type("#account_email", Partneremial)
      // await page.evaluate(() => {
      //   document.querySelector('#account_lookup > button').click()
      // })
      // await page.waitForSelector('#account_lookup > button');
      await page.waitForSelector("#account_lookup > button", { timeout: 10000 })

      await page.waitForFunction(() => {
        const button = document.querySelector('#account_lookup > button');
        return !button.disabled;
      });
      await delyTime(6000)

      await page.evaluate(() => {
        document.querySelector('#account_lookup > button').click();
      });


      console.log("click on button")
      await page.waitForNavigation();

      await page.type("#account_password", PartnerPassword)
      await page.waitForTimeout(1000)
      await page.evaluate(() => {
        document.querySelector("#login_form").submit()
      })
      await page.waitForNavigation();
      const cookiess = await page.cookies()
      fs.promises.writeFile('./cookiess.json', JSON.stringify(cookiess, null, 2)).then(() => {
        console.log("sucessfully logged in and cookies have been saved")
      }).catch((error) => {
        console.log(error.message, "while saving the cookies")
      })
    } catch (error) {
      console.log(error.message, "from log in page")

    }
  }


})



export const AuthenticationForAddAppPage = (async (page, Partneremial, PartnerPassword) => {


  try {
    console.log("you have to be logged in")
    await page.waitForSelector('#account_email')
    await page.type("#account_email", Partneremial)
    await page.waitForSelector("#account_lookup > button", { visible: true })
    await delyTime(6000)
    await page.evaluate(() => {
      document.querySelector('#account_lookup > button').click()
    })

    await page.waitForNavigation();

    await page.type("#account_password", PartnerPassword)
    await page.waitForTimeout(1000)

    await page.evaluate(() => {
      document.querySelector("#login_form").submit()
    })
    await page.waitForNavigation();
    //   const cookiess=await page.cookies()
    //  fs.promises.writeFile("./AddStorecookies.json", JSON.stringify(cookiess, null, 2)).then(()=>{
    //    console.log("sucessfully logged in and cookies have been saved")

    //  }).catch((error)=>{
    //   console.log(error.message,"while saving the cookies")
    //  })


  } catch (error) {
    console.log(error.message, "from log in page")

  }




}
)