const { $, browser } = require("@wdio/globals");
const BasePage = require("./base.page");

const SELECTORS = {
  username: '//*[@data-test="username"]',
  password: '//*[@data-test="password"]',
  loginBtn: '//*[@data-test="login-button"]',
  errorMessage: '//h3[@data-test="error"]',
};

class LoginPage extends BasePage {
  get usernameInput() {
    return $(SELECTORS.username);
  }

  get passwordInput() {
    return $(SELECTORS.password);
  }

  get loginButton() {
    return $(SELECTORS.loginBtn);
  }

  get errorMessage() {
    return $(SELECTORS.errorMessage);
  }

  /**
   * Opens the login page
   * @returns {Promise<void>}
   */
  async open() {
    await super.open("/");
  }

  /**
   * Clicks the login button
   * @returns {Promise<void>}
   */
  async clickLoginBtn() {
    await this.loginButton.waitForClickable({ timeout: 5000 });
    await this.loginButton.click();
  }

  /**
   * Sets input value for username or password field
   * @param {'username' | 'password'} field
   * @param {{username?: string, password?: string}} credentials
   */
  async setField(field, credentials) {
    if (Array.isArray(field)) {
      for (const f of field) {
        await this.setField(f, credentials);
      }
      return;
    }
    const element =
      field === "username" ? this.usernameInput : this.passwordInput;
    const value =
      field === "username" ? credentials.username : credentials.password;

    await this.clearField(element);
    await element.setValue(value);
  }

  /**
   * Clears both input fields
   */
  async clearFields() {
    await this.clearField(this.usernameInput);
    await this.clearField(this.passwordInput);
  }

  /**
   * Convenience: Set only username
   */
  async setUsername(username) {
    await this.setField("username", { username });
  }

  /**
   * Convenience: Set only password
   */
  async setPassword(password) {
    await this.setField("password", { password });
  }

  /**
   * Clears only the username field
   */
  async clearUsername() {
    await this.clearField(this.usernameInput);
  }

  /**
   * Clears only the password field
   */
  async clearPassword() {
    await this.clearField(this.passwordInput);
  }

  /**
   * Combined login flow
   */
  async login(credentials) {
    await this.setField(["username", "password"], credentials);
    await this.clickLoginBtn();
  }

  /**
   * Returns the error message text
   */
  async getErrorMessageText() {
    await this.errorMessage.waitForDisplayed({ timeout: 5000 });
    return this.errorMessage.getText();
  }

 
}

module.exports = new LoginPage();
