// src/data/loginCasesScenarios.js

const loginCases = [
  {
    name: "Empty input fields (type then clear both fields)",
    username: "dummy",
    password: "dummy",
    clearUsername: true,
    clearPassword: true,
    expectedError: "Epic sadface: Username is required"
  },
  {
    name: "Empty password (type then clear password only)",
    username: "standard_user",
    password: "dummyPass",
    clearUsername: false,
    clearPassword: true,
    expectedError: "Epic sadface: Password is required"
  },
  {
    name: "Valid user",
    username: "standard_user",
    password: "secret_sauce",
    clearUsername: false,
    clearPassword: false,
    expectedTitle: "Products"
  }
];

module.exports = loginCases;
