const Company = require("../models/company.js");
const { JWTLOGIN } = require("../secret.js");
const { createToken } = require("../utils/jwt.js");
const { successMessage } = require("../utils/response.js");
const bcrypt = require('bcrypt');

const findAll = async (req, res,next) => {
  try {
    const companies = await Company.find({}, { password: 0 });
    return successMessage(res, 200, "Data returned succesfully", { companies });
  } catch (error) {
    next(error);
  }
};


const findByID = async (req, res,next) => {
  try {
    return successMessage(res, 200, "Data returned succesfully", {
      payload: req.isExist,
    });
  } catch (error) {
   next(error);
  }
};


const signup = async (req, res,next) => {
  const { isExist, body } = req;
  try {
    // find if email exist
    if (isExist) {
      throw { status: 404, message: "Already Registered" };
    }
    // Otherwise save it to database.
    const hashPassword = bcrypt.hashSync(body.password,10);
    body.password = hashPassword;
    const newCompany = new Company(body);
    await newCompany.save();
    return successMessage(res, 201, "Data Saved succesfully", { newCompany });
  } catch (error) {
    next(error);
  }
};


const login = async (req, res,next) => {
  const { body: {email,password},isExist } = req;
  try {
    // If user does not exist
    if (!isExist || !await bcrypt.compare(password, isExist.password)) {
      throw {
        status: 404,
        message: 'Invalid Email/Password',
      };
    }

    // if exist save it to cookies.
    const token = await createToken({id:isExist._id},JWTLOGIN,"15m");
    res.cookie("token", token, {
      maxAge: 60 * 60 * 100000,
    });
    //Then return data.
    return successMessage(res, 200, "Data returned succesfully", {
      payload: isExist,
    });
  } catch (error) {
    next(error);
  }
};


const logout = async (req, res,next) => {
  try {
    res.clearCookie("token");
    return successMessage(res, 200, "Log out Successful");
  } catch (error) {
    next(error);
  }
};

const update = async (req, res,next) => {
  const {
    body,
    params: { id },
  } = req;
  try {
    const isExist = await Company.findByIdAndUpdate(id, body, { new: true });
    if (!isExist) {
      throw { status: 404, message: `No Data Found with this ${id}` };
    }
    return successMessage(res, 200, "Data returned succesfully", { isExist });
  } catch (error) {
    next(error);
  }
};


const addBranch = async (req, res,next) => {
  const {
    body,
    params: { id },
    isExist,
  } = req;
  try {
    isExist.branch.push(body.branch);
    isExist.save();
    return successMessage(res, 200, "Data returned succesfully", { isExist });
  } catch (error) {
    next(error);
  }
};

const removeBranch = async (req, res,next) => {
  const {
    body,
    params: { id },
    isExist,
  } = req;
  try {
    // check if body.branch exist.
    const index = isExist.branch.indexOf(body.branch);
    if (index != -1) {
      // remove the branch.
      isExist.branch.splice(index, 1);
    } else {
      throw { status: 404, message: `No Branch Found` };
    }
    await isExist.save();
    return successMessage(res, 200, "Data returned succesfully", { isExist });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  findAll,
  findByID,
  signup,
  login,
  logout,
  update,
  addBranch,
  removeBranch,
};
