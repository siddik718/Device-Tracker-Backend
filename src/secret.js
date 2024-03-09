require("dotenv").config();

const PORT = process.env.PORT || 3000;
const DBURL = process.env.DBURL;
const ACCESS_TOKEN = process.env.ACCESS_TOKEN;
const ACCESS_TOKEN_EXPIRY = process.env.ACCESS_TOKEN_EXPIRY;
const REFRESH_TOKEN = process.env.REFRESH_TOKEN;
const REFRESH_TOKEN_EXPIRY = process.env.REFRESH_TOKEN_EXPIRY;

module.exports = {
  PORT,
  DBURL,
  ACCESS_TOKEN,
  ACCESS_TOKEN_EXPIRY,
  REFRESH_TOKEN,
  REFRESH_TOKEN_EXPIRY,
};
