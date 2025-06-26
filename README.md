# WebdriverIO Test Suite for <https://www.saucedemo.com/>

## Description

This project contains automated tests for the login functionality of the website [https://www.saucedemo.com/](https://www.saucedemo.com/).

The tests cover the following use cases:

- **UC-1:** Login with empty username and password  
- **UC-2:** Login with username only  
- **UC-3:** Successful login with valid credentials  

## Technologies Used

- **WebDriverIO** v8.15.0  
- **Mocha** test framework  
- **Selenium Standalone Service**  
- **Allure Reporter**  
- **XPath** selectors (instead of CSS, per assignment)  
- **Page Object Model (POM)**  
- **dotenv** for environment variable management  
- **Parallel browser execution** (Chrome + Edge)

## Project Structure  

- `po/` – Contains page classes with centralized locators and common actions  
- `specs/` – Contains test files with defined test scenarios  
- `data/` – Dynamic loader for test credentials using dotenv  
- `wdio.conf.js` – Main WebDriverIO configuration including browser settings, parallel execution, reporters, etc.  
- `.gitignore` – File to ignore unnecessary files from version control  
- `package.json` and `package-lock.json` – Project dependencies and scripts  
- `.env` – Environment variables: stores sensitive test data like username and password

## Installation and Running Tests

1. Clone the repository:

```bash
git clone <repository-url>
cd <project-folder>
npm install
```

## Set environment variables in .env file  

TESTUSERNAME=standard_user  
TESTPASSWORD=secret_sauce  

1. Run all tests:
npm run testall  
2. Run a specific test:  
npm run teststanalone  
3. Run parametrized version  
npm run testparametrised  

## Test Scenarios  

| UC | Test Case Description |
|----|-----------------------|
| UC-1 | Login with empty credentials – shows "Username is required" |
| UC-2 | Login with missing password – shows "Password is required" |
| UC-3 | Valid login – navigates to dashboard showing "Products" |

## Browser Support

Tests are executed in parallel on:

- ✅ **Google Chrome**
- ✅ **Microsoft Edge**

Configured in `wdio.conf.js` using `capabilities`.

## Known Issues

- Logger is not compatible with WebdriverIO v8.15 – `console.log` is used instead.
- XPath selectors are used as required by task (although CSS selectors or `data-testid` may be more stable).

## Author

Helena Papantidis  
Feel free to reach out with any questions
