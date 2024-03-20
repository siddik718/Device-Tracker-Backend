const { Schema, model } = require("mongoose");

const schema = new Schema(
  {
    organization: {
      type: Schema.Types.ObjectId,
      ref: "Organization",
    },
    device: {
      type: String,
      required: [true, "Please Give device name"],
    },
    employee: {
      type: String,
      required: [true, "Please Give employee name"],
    },
    givenDate: {
      type: Date,
      default: Date.now,
    },
    returnDate: {
      type: Date,
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
