const { $, browser } = require('@wdio/globals');
const BasePage = require('./base.page');
const HeaderComponent = require('../components/header.component');

const SELECTORS = {
  pageTitle: '[data-test="title"]',
};

class DashboardPage extends BasePage {
  constructor() {
    super();
    this.header = HeaderComponent;
  }

  get pageTitle() {
    return $(SELECTORS.pageTitle);
  }

  /**
   * Gets the visible page title text (e.g., "Products").
   * @returns {Promise<string>}
   */
  async getPageTitleText() {
    return this.getTextFromElement(this.pageTitle);
  }

  /**
   * Gets the current browser tab title (e.g., "Swag Labs").
   * @returns {Promise<string>}
   */
  async getBrowserTitle() {
    return browser.getTitle();
  }

  /**
   * Gets the logo text from the Header component.
   * @returns {Promise<string>}
   */
  async getHeaderLogoText() {
    return this.header.getLogoText();
  }

  /**
   * Checks whether the logo in the Header is visible.
   * @returns {Promise<boolean>}
   */
  async isHeaderLogoDisplayed() {
    return this.header.isLogoDisplayed();
  }
}

module.exports = new DashboardPage();
