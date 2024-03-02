const { validationResult, matchedData } = require("express-validator");

function validateEmail(email) {
  const re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  return re.test(email);
}

function validatePassword(password) {
  const passwordRegex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()\-_=+{};:,<.>]).{8,}$/;
  return passwordRegex.test(password);
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
  validatePassword,
  validateSchema,
};
