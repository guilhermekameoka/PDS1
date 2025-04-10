const path = require("path");

module.exports = {
  PORT: process.env.PORT || 3000,
  STATIC_PATH: path.join(__dirname, "../frontend"),
  ASSETS_PATH: path.join(__dirname, "../assets"),
  JS_PATH: path.join(__dirname, "../js"),
};