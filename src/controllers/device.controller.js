const Device = require("../models/device.js");
const { raise } = require("../utils/err.js");
const { successMessage } = require("../utils/response.js");

const getDevices = async (req, res, next) => {
  const { org } = req;
  try {
    const all = await Device.find({ organization: org._id });
    return successMessage(res, 200, "Sucessfully Returned Data", all);
  } catch (error) {
    next(error);
  }
};

const addDevice = async (req, res, next) => {
  const { org, body } = req;
  try {
    const newDevice = new Device({ organization: org._id, ...body });
    newDevice.save();
    return successMessage(res, 200, "Sucessfully Added new Device", newDevice);
  } catch (error) {
    next(error);
  }
};

const update = async (req, res, next) => {
  const { deviceId } = req.params;
  try {
    let device = await Device.findById(deviceId);
    if (!device) {
      raise(404, "No Device Found");
    }
    device = await Device.findByIdAndUpdate(deviceId, req.body, { new: true });
    return successMessage(res, 200, "Sucessfully Updated Device", device);
  } catch (error) {
    next(error);
  }
};

const remove = async (req, res, next) => {
  const id = req.params.deviceId;
  try {
    const device = await Device.findById(id);
    if (!device) {
      raise(404, "No Device Found");
    }
    await Device.findByIdAndDelete(id);
    return successMessage(res, 200, "Sucessfully Removed Device");
  } catch (error) {
    next(error);
  }
};

const typeWiseDevice = async (req, res, next) => {
  const { org } = req;
  try {
    const { type } = req.query;
    if (!type) {
      raise(400, "Please Provide type like type=mobile in query. ");
    }
    const devices = await Device.aggregate([
      {
        $match: {
          $and: [
            { organization: org._id },
            { Type: { $regex: new RegExp(type, "i") } },
          ],
        },
      },
      {
        $project: {
          organization: 0,
        },
      },
    ]);
    return successMessage(res, 200, "devices found", devices);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getDevices,
  addDevice,
  update,
  remove,
  typeWiseDevice,
};
