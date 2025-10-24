const serverless = require("serverless-http");
const app = require("../index"); // src ke under path ../index

module.exports = serverless(app);
