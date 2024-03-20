
const validationSchemaForRecord = {
  device: {
    trim: true,
    notEmpty: {
      errorMessage: "Device Name must be given",
    },
    isString: {
      errorMessage: "Device Name must Be String",
    },
  },
  employee: {
    trim: true,
    notEmpty: {
      errorMessage: "Employee Name must be given",
    },
    isString: {
      errorMessage: "Employee Name must Be String",
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
