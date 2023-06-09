/* eslint-disable no-undef */
'use strict'

const puppeteer = require('puppeteer')
const fs = require('fs')


function delay(time) {
  return new Promise(function (resolve) {
    setTimeout(resolve, time)
  })
}

function validateOptions(options) {
  if (!options.username || !options.password) {
    throw new Error('Username or Password missing for social login')
  }
}

function takeScreenshot(page, options) {
  if (options.screenshotOnError) {
    if (!fs.existsSync('./cypress/screenshots/cypresssociallogin/')) {
      fs.mkdirSync('./cypress/screenshots/cypresssociallogin/', { recursive: true })
    }
    page.screenshot({ path: './cypress/screenshots/cypresssociallogin/SocialLoginError.png' })
  }
}

async function login({ page, options } = {}) {
  if (options.preLoginSelector && !options.preLoginSelectorIframe) {
    await page.waitForSelector(options.preLoginSelector)
    await page.click(options.preLoginSelector)
  } else if (options.preLoginSelector && options.preLoginSelectorIframe) {
    await page.waitForSelector(options.preLoginSelectorIframe)
    const elementHandle = await page.$(options.preLoginSelectorIframe)
    const frame = await elementHandle.contentFrame()
    await frame.waitForSelector(options.preLoginSelector)
    await frame.click(options.preLoginSelector)
    if (options.preLoginSelectorIframeDelay !== false) {
      await delay(options.preLoginSelectorIframeDelay)
    }
  }

  if (options.loginSelector) {
    await page.waitForSelector(options.loginSelector)

    if (options.loginSelectorDelay !== false) {
      await delay(options.loginSelectorDelay)
    }

    await page.click(options.loginSelector)
  }
}

async function getCookies({ page, options, browser } = {}) {
  await page.waitForNavigation({
    waitUntil: `networkidle2`,
  });
  const client = await page.target().createCDPSession();
  const cookies = (await client.send('Network.getAllCookies')).cookies;


  if (options.logs) {
    console.log(cookies)
  }

  return cookies
}

async function getLocalStorageData({ page, options } = {}) {


  const localStorageData = await page.evaluate(() => {
    let json = {}
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i)
      json[key] = localStorage.getItem(key)
    }
    return json
  })
  if (options.logs) {
    console.log(localStorageData)
  }

  return localStorageData
}

async function getSessionStorageData({ page, options } = {}) {

  const sessionStorageData = await page.evaluate(() => {
    let json = {}
    for (let i = 0; i < sessionStorage.length; i++) {
      const key = sessionStorage.key(i)
      json[key] = sessionStorage.getItem(key)
    }
    return json
  })
  if (options.logs) {
    console.log(sessionStorageData)
  }

  return sessionStorageData
}

async function getCookiesForAllDomains(page) {
  const cookies = await page._client.send('Network.getAllCookies', {})
  return cookies.cookies
}

async function finalizeSession({ page, browser, options } = {}) {
  await browser.close()
}

async function waitForMultipleSelectors(selectors, options, page) {
  const navigationOutcome = await racePromises(
    selectors.map(selector => page.waitForSelector(selector, options))
  )
  return selectors[parseInt(navigationOutcome)]
}

async function racePromises(promises) {
  const wrappedPromises = []
  let resolved = false
  promises.map((promise, index) => {
    wrappedPromises.push(
      new Promise(resolve => {
        promise.then(
          () => {
            resolve(index)
          },
          error => {
            if (!resolved) {
              throw error
            }
          }
        )
      })
    )
  })
  return Promise.race(wrappedPromises).then(index => {
    resolved = true
    return index
  })
}

async function baseLoginConnect(
  typeUsername,
  typePassword,
  options
)
  validateOptions(options)
  let debuggingPort = "";
  setDebuggingPortMyService(port) {

    if (port) [, debuggingPort] = port;

    return null;
  };
  const launchOptions = { headless: false }

  if (options.args && options.args.length) {
    launchOptions.args = options.args
  }
  const browser = await puppeteer.connect({

    browserURL: `http://127.0.0.1:${debuggingPort}`,

    defaultViewport: null,

  });
  // const browser = await puppeteer.launch({ headless: false, args: ['--no-sandbox'] });
  let page = await browser.newPage()
  await page.setViewport({ width: 1280, height: 800 })
  await page.setExtraHTTPHeaders({
    'Accept-Language': 'en-USq=0.9,enq=0.8'
  })
  await page.setUserAgent(
    'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/105.0.0.0 Safari/537.36'
  )
  await page.authenticate({ 'username': 'pwp', 'password': 'eye-T$B33!' });
  await page.goto(options.loginUrl);
  //await login({page, options})


  await typeUsername({ page, options })
  await typePassword({ page, options })


  const cookies = await getCookies({ page, options, browser })
  const lsd = await getLocalStorageData({ page, options })
  const ssd = await getSessionStorageData({ page, options })
  await finalizeSession({ page, browser, options })

  return {
    cookies,
    lsd,
    ssd
  }
}

// module.exports.baseLoginConnect = baseLoginConnect

// async function loginToTMA(options = {}){
//   let user = options.username;
//   let pass = options.password;
//   let btn = options.btn;
// const typeUsername = async function({page, options} = {}) {
//     try {
//       if(btn=='GCKey'){
//         const [button] = await page.$x(`//a[contains(., ${btn})]`)
//         await button.click()
//       }
//       else{
//         const [button] = await page.$x("//a[contains(., 'Sign-In Partner')]")
//         if(button){
//             await button.click()
//         }
//         await page.waitForNavigation({
//             waitUntil: `networkidle2`,
//           });
//     await page.waitForSelector('#SK_TEST1');
//     await page.click('#SK_TEST1')
//       const emailSelector = ':nth-child(1) > :nth-child(2) > input'
//       await page.waitForSelector(emailSelector)
//       await page.type(emailSelector, options.username, {visible: true})
//       }
//     } catch (err) {
//       console.log(err)
//       throw err
//     }
//   }

//   const typePassword = async function({page, options} = {}) {
//     try {
//       const passwordSelector = ':nth-child(2) > :nth-child(2) > input'
//       await page.waitForSelector(passwordSelector, {visible: true})
//       await page.type(passwordSelector, options.password)

//       // Submit first form
//       await page.click('.loginBtn')
//     } catch (err) {
//     console.log(err)
//       throw err
//     }
//     }
// return baseLoginConnect(typeUsername,typePassword,{loginUrl: "https://beta.buyandsell.gc.ca/tma", username:user, password:pass, postLoginSelector:'#wb-cont', logs: true, getCookiesForAllDomains: true })
// }

// module.exports.loginToTMA = loginToTMA

async function loginToSOSAA() {
  const typeUsername = async function ({ page, options } = {}) {
    try {
      const [button] = await page.$x("//a[contains(., 'Sign-In Partner')]")
      if (button) {
        await button.click()
      }
      await page.waitForNavigation({
        waitUntil: `networkidle2`,
      });
      await page.waitForSelector('#SK_TEST1');
      await page.click('#SK_TEST1')
      const emailSelector = ':nth-child(1) > :nth-child(2) > input'
      await page.waitForSelector(emailSelector)
      await page.type(emailSelector, options.username, { visible: true })
    } catch (err) {
      console.log(err)
      throw err
    }
  }

  const typePassword = async function ({ page, options } = {}) {
    try {
      const passwordSelector = ':nth-child(2) > :nth-child(2) > input'
      await page.waitForSelector(passwordSelector, { visible: true })
      await page.type(passwordSelector, options.password)

      // Submit first form
      await page.click('.loginBtn')
    } catch (err) {
      console.log(err)
      throw err
    }
  }
  return baseLoginConnect(typeUsername, typePassword, { loginUrl: "https://beta.buyandsell.gc.ca/standing-offers-and-supply-arrangements-application", username: 'at-admin', password: 'Provincial00', postLoginSelector: '#wb-cont', logs: true, getCookiesForAllDomains: true })
}

module.exports.loginToSOSAA = loginToSOSAA

module.exports.baseLoginConnect = baseLoginConnect

async function loginToTMA(options = {}) {
  let user = options.username;
  let pass = options.password;
  let logintype = options.logintype;
  console.log(logintype)
  console.log(options)
  const typeUsername = async function ({ page, options } = {}) {
    try {
      if (logintype == 'GCKey') {
        const [button] = await page.$x(`//a[contains(., 'GCKey')]`)
        await button.click()
        await page.waitForSelector('#token1');
        await page.type('#token1',options.username,{ visible: true})
        await page.waitForSelector('#token2');
        await page.type('#token2',options.password,{ visible: true})
        const [Sign_In] = await page.$x(`//button[contains(., 'Sign In')]`)
        await Sign_In.click()
      }
      else {
        const [button] = await page.$x("//a[contains(., 'Sign-In Partner')]")
        if (button) {
          await button.click()
          await page.waitForNavigation({
            waitUntil: `networkidle2`,
          });
          await page.waitForSelector('#SK_TEST1');
          await page.click('#SK_TEST1')
          const emailSelector = ':nth-child(1) > :nth-child(2) > input'
          await page.waitForSelector(emailSelector)
          await page.type(emailSelector, options.username, { visible: true })
        }
      }
    } catch (err) {
      console.log(err)
      throw err
    }
  }

  const typePassword = async function ({ page, options } = {}) {
    try {
      const passwordSelector = ':nth-child(2) > :nth-child(2) > input'
      await page.waitForSelector(passwordSelector, { visible: true })
      await page.type(passwordSelector, options.password)

      // Submit first form
      await page.click('.loginBtn')
    } catch (err) {
      console.log(err)
      throw err
    }
  }
  return baseLoginConnect(typeUsername, typePassword, { loginUrl: "https://beta.buyandsell.gc.ca/tma", username: user, password: pass, postLoginSelector: '#wb-cont', logs: true, getCookiesForAllDomains: true })
}

module.exports.loginToTMA = loginToTMA