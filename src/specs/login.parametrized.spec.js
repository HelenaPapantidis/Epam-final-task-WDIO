const { LoginPage, DashboardPage } = require("../po/pages");
const loginCases = require("../data/loginCasesScenarios.js");
const logger = require("../utils/logger.util");

describe("Login Form Tests (Data Driven) - BDD style", () => {
  loginCases.forEach(
    ({
      name,
      username,
      password,
      clearUsername,
      clearPassword,
      expectedError,
      expectedTitle,
    }) => {
      it(`should handle case: ${name}`, async () => {
        logger.info(`Running test case: ${name}`);

        // Given the user is on the login page
        await LoginPage.open();

        // When the user enters Credentials
        await LoginPage.setField(["username", "password"], {
          username,
          password,
        });

        // Clear fields if specified in the test data
        if (clearUsername) {
          await LoginPage.clearUsername();
          logger.debug("Cleared username field");
        }
        if (clearPassword) {
          await LoginPage.clearPassword();
          logger.debug("Cleared password field");
        }

        // And: clicks the login button
        await LoginPage.clickLoginBtn();

        // Then: validate the outcome
        logger.info(`Validating outcome for case: ${name}`);
        if (expectedError) {
          await expect(LoginPage.errorMessage).toBeDisplayed();
          await expect(LoginPage.errorMessage).toHaveTextContaining(
            expectedError
          );
          logger.warn(`Expected error shown: "${expectedError}"`);
          const text = await LoginPage.getErrorMessageText();
          expect(text).toEqual(expectedError);
        }
        if (expectedTitle) {
          await expect(browser).toHaveUrlContaining("inventory.html");
          await expect(DashboardPage.pageTitle).toHaveText(expectedTitle);
          const browserTitle = await DashboardPage.getBrowserTitle();
          expect(browserTitle).toEqual("Swag Labs");
          logger.info(`Login successful. Title: ${browserTitle}`);
        }
      });
    }
  );

  afterEach(async function () {
    if (this.currentTest.state === "failed") {
      const screenshot = await browser.takeScreenshot();
      await allure.addAttachment(
        "Failure Screenshot",
        Buffer.from(screenshot, "base64"),
        "image/png"
      );
      logger.error(
        `Test failed. Screenshot captured: ${this.currentTest.title}`
      );
    } else {
      logger.info(`Test passed: ${this.currentTest.title}`);
    }
  });
});
