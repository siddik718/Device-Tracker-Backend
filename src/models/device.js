const { Schema, model } = require("mongoose");

const schema = new Schema(
  {
    company: {
      type: Schema.Types.ObjectId,
      ref: "Company",
    },
    Type: {
      type: String,
      required: [true, "Device Type Should be given"],
    },
    description: {
      type: String,
      required: [true, "Description Should be given"],
    },

  },
  { timestamps: true }
);

const Device = model("Device", schema);
module.exports = Device;
