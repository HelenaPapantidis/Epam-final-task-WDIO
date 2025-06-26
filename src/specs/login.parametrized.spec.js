const { LoginPage, DashboardPage } = require("../po/pages");
const loginCases = require("../data/loginCasesScenarios.js");

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
        console.log(`Running test: ${name}`);

        // Given the user is on the login page
        await LoginPage.open();
       

        // When the user enters username and password
         await LoginPage.setField(["username", "password"], { username, password });

       

        // Clear fields if specified in the test data
        if (clearUsername) {
          await LoginPage.clearUsername();
          console.log("Cleared username field");
        }
        if (clearPassword) {
          await LoginPage.clearPassword();
          console.log("Cleared password field");
        }

        // And clicks the login button
        await LoginPage.clickLoginBtn();

        // Then appropriate results should be shown
        if (expectedError) {
          await expect(LoginPage.errorMessage).toBeDisplayed();
          await expect(LoginPage.errorMessage).toHaveTextContaining(expectedError);
          const text = await LoginPage.getErrorMessageText();
          
        }
        if (expectedTitle) {
          await expect(browser).toHaveUrlContaining("inventory.html");
          await expect(DashboardPage.pageTitle).toHaveText(expectedTitle);

          const browserTitle = await DashboardPage.getBrowserTitle();
          expect(browserTitle).toEqual("Swag Labs");
          console.log(`Login successful. Title: ${browserTitle}`);
        }
      });
    }
  );

  afterEach(async function () {
    console.log("Test finished.");

    if (this.currentTest.state === "failed") {
      const screenshot = await browser.takeScreenshot();
      await allure.addAttachment(
        "Failure Screenshot",
        Buffer.from(screenshot, "base64"),
        "image/png"
      );
      console.error(`Screenshot captured for failed test: ${this.currentTest.title}`);
    }
  });
});
