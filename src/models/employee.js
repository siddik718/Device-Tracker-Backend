const { Schema, model } = require("mongoose");
const { validateEmail } = require("../utils/validator");

const schema = new Schema(
  {
    organization: {
      type: Schema.Types.ObjectId,
      ref: 'Organization',
    },
    dept: {
      type: String,
      required: [true, "Employee Dept Should be given"],
    },
    name: {
      type: String,
      required: [true, "Employee Name Should be given"],
    },
    nid: {
      type: String,
      required: [true, "Employee NID Should be given"],
    },
    email: {
      type: String,
      required: [true, "Please provide the a Email."],
      trim: true,
      lowercase: true,
      unique: [true, "Email Already Exist"],
      validate: [validateEmail, "Please fill a valid email address"],
    },
    designation: {
      type: String,
      required: [true, "Employee Designation Should be given"],
    },
    salary: {
      type: Number,
      required: [true, "Employee Salary Should be given"],
    },
    joinDate: {
      type: Date,
      default: Date.now,
    },
    allocatedDevice: [
      {
        type: Schema.Types.ObjectId,
        ref: "Device",
      },
    ],
  },
  { timestamps: true }
);

const Employee = model("Employee", schema);
module.exports = Employee;
