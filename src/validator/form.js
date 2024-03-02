const validationSchemaForSignup = {
  name: {
    trim: true,
    notEmpty: {
      errorMessage: "Must provide Name",
    },
    isString: {
      errorMessage: "Only String is Allowed",
    },
    isLength: {
      options: {
        min: 2,
        max: 50,
      },
      errorMessage: "Please Choose a name between 2 - 50 charaters",
    },
  },
  address: {
    trim: true,
    notEmpty: {
      errorMessage: "Must provide Address",
    },
    isString: {
      errorMessage: "Only String is Allowed",
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
  password: {
    trim: true,
    notEmpty: {
      errorMessage: "Must provide Password",
    },
    isLength: {
      options: {
        min: 8,
      },
      errorMessage: "Password Must Be minimum 8 length",
    },
  },
};
const validationSchemaForLogin = {
  email: {
    trim: true,
    notEmpty: {
      errorMessage: "Must provide Email",
    },
    isEmail: {
      errorMessage: "Enter a valid email",
    },
  },
  password: {
    trim: true,
    notEmpty: {
      errorMessage: "Must provide Password",
    },
  },
};
const validationSchemaForBranch = {
  branch: {
    trim: true,
    notEmpty: {
      errorMessage: "Must provide Branch Name",
    },
    isString: {
      errorMessage: "Branch Name must be string",
    }
  },
};
module.exports = {
  validationSchemaForSignup,
  validationSchemaForLogin,
  validationSchemaForBranch,
};
