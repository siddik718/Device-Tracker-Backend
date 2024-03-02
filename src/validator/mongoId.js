const mongoose = require("mongoose");
const { param } = require("express-validator");
// Custom validation function to check if a string is a valid MongoDB ObjectId
const validateObjectId = param("id").custom((value) => {
  if (!mongoose.Types.ObjectId.isValid(value)) {
    throw new Error("Invalid ObjectId");
  }
  return true;
});

module.exports = {
  validateObjectId,
};
