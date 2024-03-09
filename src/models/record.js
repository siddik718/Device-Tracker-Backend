const { Schema, model } = require("mongoose");

const schema = new Schema(
  {
    organization: {
      type: Schema.Types.ObjectId,
      ref: "Organization",
    },
    device: {
      type: Schema.Types.ObjectId,
      ref: "Device",
    },
    employee: {
      type: Schema.Types.ObjectId,
      ref: "Employee",
    },
    givenDate: {
      type: Date,
      default: Date.now,
    },
    condition: {
      type: String,
      required: [true, "Please Give Condition details"],
    },
    returnCondition: {
      type: String,
    },
    available: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

const Record = model("Record", schema);

module.exports = Record;
