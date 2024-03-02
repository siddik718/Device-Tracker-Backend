const { Schema, model } = require("mongoose");
const { validateEmail } = require("../utils/validator");

const schema = new Schema(
  {
    company: {
      type: Schema.Types.ObjectId,
      ref: 'Company',
    },
    dept: {
      type: Schema.Types.ObjectId,
      ref: "Department",
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
