const Organization = require("../models/organization.js");
const jwt = require("jsonwebtoken");

const { raise } = require("../utils/err.js");
const { successMessage } = require("../utils/response.js");
const { REFRESH_TOKEN } = require("../secret.js");

const generateAccessAndRefreshToken = async (user) => {
  try {
    const access_token = user.generateAccessToken();
    const refresh_token = user.generateRefreshToken();
    user.refreshToken = refresh_token;
    await user.save({ validateBeforeSave: false });
    return {
      access_token,
      refresh_token,
    };
  } catch (error) {
    raise(500, "Something went Wrong.. Please try again.");
  }
};

const signup = async (req, res, next) => {
  try {
    const { email, password, address, name } = req.body;
    const org = await Organization.findOne({
      $or: [{ name: name }, { email: email }],
    });
    if (org) {
      raise(404, "Data Already Exist");
    }
    const new_org = new Organization({
      name,
      email,
      password,
      address,
    });
    await new_org.save();
    return successMessage(res, 201, "Registration Sucessful", {data: passwordLess(new_org)} );
  } catch (error) {
    next(error);
  }
};

const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const org = await Organization.findOne({ email });
    if (!org) {
      raise(404, "No Data Exist");
    }
    const isPasswordValid = await org.isPasswordMatch(password);
    if (!isPasswordValid) {
      raise(404, "No Data Exist");
    }
    const tokens = await generateAccessAndRefreshToken(org);
    manageCookie(res, tokens);
    return successMessage(res, 200, "Log In SucessFull", {
      data: passwordLess(org),
      accessToken: tokens.access_token,
      refreshToken: tokens.refresh_token,
    });
  } catch (error) {
    next(error);
  }
};

const logout = async (req, res, next) => {
  const { org } = req;
  try {
    manageCookie(res);
    await Organization.findByIdAndUpdate(
      org._id,
      { $set: { refreshToken: undefined } },
      { new: true }
    );
    return successMessage(res, 200, "Log out Successful");
  } catch (error) {
    next(error);
  }
};

const accessByRefreshToken = async (req, res, next) => {
  
  try {
    const incomingToken = req.cookies?.refreshToken || req.body?.refreshToken;
    if (!incomingToken) {
      raise(401, "session expired");
    }
    const decoded_org = jwt.verify(incomingToken, REFRESH_TOKEN);
    const org = await Organization.findById(decoded_org?._id);
    if (!org || org.refreshToken !== incomingToken) {
      raise(404, "session expired");
    }
    const tokens = await generateAccessAndRefreshToken(org);
    manageCookie(res, tokens);
    return successMessage(res, 200, "ReLog In SucessFull", {
      data: passwordLess(org),
      accessToken: tokens.access_token,
      refreshToken: tokens.refresh_token,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  signup,
  login,
  logout,
  accessByRefreshToken,
};

function passwordLess(user) {
  const org = user.toObject();
  delete org.password;
  if (org.refreshToken) {
    delete org.refreshToken;
  }
  return org;
}

function manageCookie(res, tokens = "default") {
  const options = {
    httpOnly: true,
    secure: true,
  };
  if (tokens === "default") {
    res
      .clearCookie("accessToken", options)
      .clearCookie("refreshToken", options);
  } else {
    res
      .cookie("accessToken", tokens.access_token, options)
      .cookie("refreshToken", tokens.refresh_token, options);
  }
  return;
}
