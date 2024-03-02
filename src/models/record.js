const { Schema, model } = require("mongoose");

const schema = new Schema(
  {
    company: {
      type: Schema.Types.ObjectId,
      ref: "Company",
    },
    model: {
      type: Schema.Types.ObjectId,
      ref: "Device",
    },
    allocatedTo: {
      type: Schema.Types.ObjectId,
      ref: "Employee",
    },
    givenDate: {
      type: Date,
      default: Date.now,
    },
    givenCondition: {
      type: String,
      required: [true, "Please Give Condition details"],
    },
    backCondition: {
      type: String,
    },
    currentEmployee: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

const Record = model("Record", schema);

module.exports = Record;
