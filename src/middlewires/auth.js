const Organization = require("../models/organization.js");
const Record = require('../models/record.js');
const jwt = require('jsonwebtoken');
const { ACCESS_TOKEN } = require("../secret.js");
const { raise } = require("../utils/err.js");


const isLoggedIn = async(req,res,next) => {
  try {
    const token = req.cookies?.accessToken || req.header("Authorization")?.split(' ')[1];
    
    if(!token) {
      raise(401,"Not Authorized");
    }
    const decodedData = jwt.verify(token,ACCESS_TOKEN);
    const org = await Organization.findById(decodedData?._id).select('-password -refreshToken');
    if(!org) {
      raise(401,'Invalid Access Token Found')
    }
    req.org = org;
    next();
  }catch(error) {
    error.status = 401;
    next(error);
  }
}

const updateRecord = async(req,res,next) => {
  try{
    const { params: {empId}, org } = req;
    const upd_record = await Record.updateMany(
      {
        $and: [
          {organization: org._id},
          {employee: empId}
        ]
      },
      {
        $set: { available: true }
      }
    )
    next();
  }catch(error) {
    next(error);
  }
}

module.exports = {
  isLoggedIn,
  updateRecord,
};
