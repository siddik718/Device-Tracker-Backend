
const { validateId } = require("../utils/validator");
const validationSchemaForRecord = {
  device: {
    trim: true,
    notEmpty: {
      errorMessage: "Device ID must be given",
    },
    custom: {
      options: value => validateId(value),
    },
  },
  employee: {
    trim: true,
    notEmpty: {
      errorMessage: "Employee ID must be given",
    },
    custom: {
      options: value => validateId(value),
    },
  },
  condition: {
    trim: true,
    notEmpty: {
      errorMessage: "Given Condition Must Be Given",
    },
    isString: {
      errorMessage: "Given Condition Must Be String",
    },
  },
};





module.exports = validationSchemaForRecord;
