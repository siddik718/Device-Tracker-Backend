const validationSchemaForDevice = {
  Type: {
    trim: true,
    notEmpty: {
      errorMessage: "Must provide Type of The Device",
    },
    isString: {
      errorMessage: "Type Must Be String",
    },
  },
  name: {
    trim: true,
    notEmpty: {
      errorMessage: "Must provide name of The Device",
    },
    isString: {
      errorMessage: "Type Must Be String",
    },
  },
  description: {
    trim: true,
    notEmpty: {
      errorMessage: "Must provide Type of The Device",
    },
    isString: {
      errorMessage: "Type Must Be String",
    },
    isLength: {
      options: {
        min: 20,
      },
      errorMessage: "Description must be atlest 20 character long.",
    },
  },
};

module.exports = validationSchemaForDevice;