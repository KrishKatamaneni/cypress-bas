const { defineConfig } = require("cypress");
const { loginToTMA } = require("./puppeteer");
const { loginToSOSAA } = require("./puppeteer");
const {downloadFile} = require('cypress-downloadfile/lib/addPlugin');

module.exports = defineConfig({
  env: {
    login_url: '/login',
    base_url: 'https://test.',
    mailHogUrl: 'https://beta.buyandsell.gc.ca/mailhog/',
  },
  e2e: {
    setupNodeEvents(on, config) {
      on('task', {
        loginToTMA: loginToTMA
      }),
      on('task', {
        loginToSOSAA: loginToSOSAA
      })
      on('task', {
        downloadFile
      })
      return require('./cypress/plugins/index.js')(on, config);
    },
    specPattern: "**/*.feature",
  },
  reporter: 'cypress-multi-reporters',
  reporterOptions: {
    reporterEnabled: 'spec, mocha-junit-reporter',
    mochaJunitReporterReporterOptions: {
      mochaFile: '/home/artifacts/cypress/results/results-[hash].xml',
    },
  },
  screenshotsFolder: '/home/artifacts/cypress/screenshots',
  videosFolder: '/home/artifacts/cypress/videos',
  experimentalStudio: true,
  scrollBehavior: 'center',
  chromeWebSecurity: false,
  videoUploadOnPasses: false,
  viewportHeight: 800,
  viewportWidth: 1200,
  taskTimeout: 360000,
  pageLoadTimeout: 360000,
  execTimeout: 360000,
  responseTimeout: 360000,
  requestTimeout: 360000,
  defaultCommandTimeout: 360000,
});

