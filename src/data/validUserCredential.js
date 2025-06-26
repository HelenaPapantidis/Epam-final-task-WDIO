
require('dotenv').config();

const validUser = {
  username: process.env.TESTUSERNAME,
  password: process.env.TESTPASSWORD,
  
}

console.log("ENV loaded USERNAME:", process.env.TESTUSERNAME);
console.log("ENV loaded PASSWORD:", process.env.TESTPASSWORD);

if (!process.env.TESTUSERNAME || !process.env.TESTPASSWORDPASSWORD) {
  throw new Error('Missing USERNAME or PASSWORD env variables');
}
module.exports = validCredentials;
