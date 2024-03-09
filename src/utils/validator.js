const { validationResult, matchedData } = require("express-validator");
const mongoose = require("mongoose");

const validateId = (value) => {
  if (!mongoose.Types.ObjectId.isValid(value)) {
    throw new Error("Invalid ObjectId");
  }
  return true;
}


function validateEmail(email) {
  const re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  return re.test(email);
}


function validateSchema(req,res,next) {
  const result = validationResult(req);
  if(result.isEmpty()) {
    next();
  }else {
    return res.status(403).json({
      matchData : matchedData(req),
      errors: result.array(),
    })
  }
}


module.exports = {
  validateEmail,
  validateSchema,
  validateId,
};
