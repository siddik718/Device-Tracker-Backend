require("dotenv").config();

const PORT = process.env.PORT || 3000;
const DBURL = process.env.DBURL;
const JWTLOGIN = process.env.JWTLOGIN;

module.exports = {
  PORT,
  DBURL,
  JWTLOGIN,
};
