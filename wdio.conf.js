require('dotenv').config();

exports.config = {
  runner: "local",
  baseUrl: "https://www.saucedemo.com",
  specs: ["./src/specs/**/*.js"],
  maxInstances: 3,

  capabilities: [{ browserName: "chrome" }, { browserName: "MicrosoftEdge" }],

  logLevel: "error",
   outputDir: './logs',
  framework: "mocha",

  reporters: [
    [
      "spec",
      {
        stdout: true,
      },
    ],
    [
      "allure",
      {
        outputDir: "allure-results",
        disableWebdriverStepsReporting: true,
        disableWebdriverScreenshotsReporting: false,
      },
    ],
  ],

  mochaOpts: {
    ui: "bdd",
    timeout: 60000,
  },
    afterTest: async function(test, context, { error, result, duration, passed, retries }) {
        if (!passed) {
            await browser.takeScreenshot();
        }
    },
};
