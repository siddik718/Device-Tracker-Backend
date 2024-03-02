const mongoose = require("mongoose");

const validationSchemaForEmployee = {
  dept: {
    trim: true,
    notEmpty: {
      errorMessage: "Dept ID must be given",
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
  name: {
    trim: true,
    notEmpty: {
      errorMessage: "Employee Name must be given",
    },
    isString: {
      errorMessage: "Name must be String",
    },
  },
  nid: {
    trim: true,
    notEmpty: {
      errorMessage: "Employee Name must be given",
    },
    isString: {
      errorMessage: "Name must be String",
    },
  },
  email: {
    trim: true,
    notEmpty: {
      errorMessage: "Must provide Email",
    },
    isEmail: {
      errorMessage: "Enter a valid email",
    },
  },
  designation: {
    trim: true,
    notEmpty: {
      errorMessage: "Employee Designation must be given",
    },
    isString: {
      errorMessage: "Designation must be String",
    },
  },
  salary: {
    trim: true,
    notEmpty: {
      errorMessage: "Employee Salary must be given",
    },
    isNumeric: {
      errorMessage: "Salary must be Number",
    },
  },
};

module.exports = validationSchemaForEmployee;
