const { Schema, model } = require("mongoose");
const { validateEmail } = require("../utils/validator");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const {
  ACCESS_TOKEN,
  ACCESS_TOKEN_EXPIRY,
  REFRESH_TOKEN,
  REFRESH_TOKEN_EXPIRY,
} = require("../secret");

const schema = new Schema(
  {
    name: {
      type: String,
      required: [true, "Name of the Office Must be given."],
      trim: true,
      minlength: [3, "Name must be at least 3 characters long."],
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
      unique: [true, "Email Already Exist"],
      validate: [validateEmail, "Please fill a valid email address"],
    },
    password: {
      type: String,
      required: [true, "Please select a strong password"],
      minLength: [8, "Min Length is atleast eight characters"],
    },
    refreshToken: String,
    dept: [{ type: Schema.Types.ObjectId, ref: "Department" }],
  },
  { timestamps: true }
);

schema.pre("save", async function (next) {
  if (this.isModified("password")) {
    this.password = await bcrypt.hash(this.password, 10);
  }
  next();
});

schema.methods.isPasswordMatch = async function (password) {
  return await bcrypt.compare(password, this.password);
};

schema.methods.generateAccessToken = function () {
  return jwt.sign(
    {
      _id: this._id,
      email: this.email,
    },
    ACCESS_TOKEN,
    {
      expiresIn: ACCESS_TOKEN_EXPIRY,
    }
  );
};

schema.methods.generateRefreshToken = function () {
  return jwt.sign(
    {
      _id: this._id,
    },
    REFRESH_TOKEN,
    {
      expiresIn: REFRESH_TOKEN_EXPIRY,
    }
  );
};

const Organization = model("Organization", schema);

module.exports = Organization;
