const Company = require("../models/company");
const { JWTLOGIN } = require("../secret");
const { verifyToken } = require("../utils/jwt");

const isEmailExist = async (req, res, next) => {
  try {
    req.isExist = await Company.findOne(
      { email: req.body.email }
    );
    next();
  } catch (error) {
    next(error);
  }
};

const isIdExist = async (req, res, next) => {
  const { id } = req.params;
  try {
    const isExist = await Company.findById(id, { password: 0 });
    if (!isExist) {
      throw { status: 404, message: `No Data Found with this ${id}` };
    }
    req.isExist = isExist;
    next();
  } catch (error) {
    next(error);
  }
};

const isLoggedIn = async(req,res,next) => {
  try {
    const token = req.cookies.token;
    if(token === null || token === "" || token === undefined) {
      throw {status: 401, message: 'Access token not found'};
    }
    const decodedData = verifyToken(token,JWTLOGIN);
    req.decodedData = decodedData;
    next();
  }catch(error) {
    next(error);
  }
}

module.exports = {
  isEmailExist,
  isIdExist,
  isLoggedIn,
};
