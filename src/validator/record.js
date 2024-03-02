const mongoose = require("mongoose");
const validationSchemaForRecord = {
  model: {
    trim: true,
    notEmpty: {
      errorMessage: "Device ID must be given",
    },
    custom: {
      options: (value) => {
        if (!mongoose.Types.ObjectId.isValid(value)) {
          throw new Error("Invalid ObjectId");
        }
        return true;
      },
    },
  },
  allocatedTo: {
    trim: true,
    notEmpty: {
      errorMessage: "Employee ID must be given",
    },
    custom: {
      options: (value) => {
        if (!mongoose.Types.ObjectId.isValid(value)) {
          throw new Error("Invalid ObjectId");
        }
        return true;
      },
    },
  },
  givenCondition: {
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
