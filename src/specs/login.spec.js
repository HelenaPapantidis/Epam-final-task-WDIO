require('dotenv').config();

const { LoginPage, DashboardPage } = require("../po/pages");
const validCredentials = { username: process.env.TESTUSERNAME, password: process.env.TESTPASSWORD };
describe("Login Page Tests - saucedemo.com", () => {
  beforeEach(async () => {
    await LoginPage.open();
  });

  describe("UC-1: Test Login form with empty credentials", () => {
    it("Should show an error when both fields are empty", async () => {
      await LoginPage.setField(["username", "password"], validCredentials);
      await LoginPage.clearFields();

      await expect(LoginPage.usernameInput).toHaveValue("");
      await expect(LoginPage.passwordInput).toHaveValue("");

      await LoginPage.clickLoginBtn();

      const errorText = await LoginPage.getErrorMessageText();
      expect(errorText).toContain("Username is required");
    });
  });

  describe("UC-2: Test Login form with missing password", () => {
    it("Should show an error when password is missing", async () => {
      await LoginPage.setUsername(validCredentials.username);
      await LoginPage.clearField(LoginPage.passwordInput);

      await LoginPage.clickLoginBtn();

      const errorText = await LoginPage.getErrorMessageText();
      expect(errorText).toContain("Password is required");
    });
  });

  describe("UC-3: Login with valid credentials", () => {
    it('Should navigate to dashboard and display "Products" title and browser tab "Swag Labs"', async () => {
      await LoginPage.login(validCredentials);
      console.log("USERNAME:", validCredentials.username);
      console.log("PASSWORD:", validCredentials.password);

      //await expect(browser).toHaveUrlContaining("/inventory.html");
      await expect(DashboardPage.pageTitle).toHaveText("Products");

      const browserTitle = await DashboardPage.getBrowserTitle();
      expect(browserTitle).toEqual("Swag Labs");
    });
  });
});
