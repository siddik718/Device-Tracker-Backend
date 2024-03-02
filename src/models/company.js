const { Schema, model } = require("mongoose");
const { validateEmail } = require("../utils/validator");
const schema = new Schema(
  {
    name: {
      type: String,
      required: [true, "Name of the Office Must be given."],
      trim: true,
      minlength: [2, "Name must be at least 2 characters long."],
      maxlength: [50, "Name cannot exceed 50 characters."],
    },
    address: {
      type: String,
      required: [true, "Please provide the address."],
      trim: true,
    },
    email: {
      type: String,
      required: [true, "Please provide the a Email."],
      trim: true,
      lowercase: true,
      unique: [true,'Email Already Exist'],
      validate: [validateEmail,'Please fill a valid email address']
    },
    password: {
        type: String,
        required: [true,'Please select a strong password'],
        minLength: [8,'Min Length is atleast eight characters'],
        // validate: [validatePassword, 'Minimum eight characters, at least one uppercase letter, one lowercase letter, one number and one special character is required'],
    },
    dept: [{ type: Schema.Types.ObjectId, ref: "Department" }],
    branch: [String],
  },
  { timestamps: true }
);

const Company = model("Company", schema);

module.exports = Company;

