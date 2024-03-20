const Device = require("../models/device.js");
const Record = require("../models/record.js");
const { raise } = require("../utils/err.js");
const { successMessage } = require("../utils/response.js");

const getDevices = async (req, res, next) => {
  const { org } = req;
  try {
    const all = await Device.aggregate([
      {
        $match: {
          organization: org._id,
        },
      },
      {
        $group: {
          _id: "$Type",
          devices: {
            $push: {
              _id: "$_id",
              description: "$description",
            },
          },
        },
      },
      {
        $sort: {
          "devices.updatedAt": -1,
        },
      },
      {
        $project: {
          _id: 1,
          devices: {
            $slice: ["$devices", 2],
          },
        },
      },
    ]);
    return successMessage(res, 200, "Sucessfully Returned Data", all);
  } catch (error) {
    next(error);
  }
};

const addDevice = async (req, res, next) => {
  const { org, body } = req;
  try {
    const isNameDuplicate = await Device.findOne({
      $and: [{ organization: org._id }, { name: body.name }],
    });
    if (isNameDuplicate) raise(409, "Already Have a Device with same name.");
    const newDevice = new Device({ organization: org._id, ...body });
    await newDevice.save();
    return successMessage(res, 201, "Sucessfully Added new Device", newDevice);
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
    device = await Device.findByIdAndUpdate(deviceId, req.body, {
      new: true,
    }).select("_id descrip");
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
        $sort: {
          updatedAt: -1,
        },
      },
      {
        $project: {
          description: 1,
          name: 1,
        },
      },
    ]);
    return successMessage(res, 200, "devices found", devices);
  } catch (error) {
    next(error);
  }
};

const devicesName = async (req, res, next) => {
  try {
    const names = await Device.find({ organization: req.org._id }).select(
      "name"
    );
    return successMessage(res, 200, "Devices", names);
  } catch (error) {
    next(error);
  }
};

const deviceStat = async (req, res, next) => {
  try {
    const { _id } = req.org;
    const totalDevices = await Device.countDocuments({ organization: _id });
    const allocatedDevices = await Record.countDocuments({
      organization: _id,
      available: false,
    });
    const notAllocatedDevices = totalDevices - allocatedDevices;
    return successMessage(res, 200, "Device stat", {
      totalDevices,
      allocatedDevices,
      notAllocatedDevices,
    });
  } catch (err) {
    next(err);
  }
};

module.exports = {
  getDevices,
  addDevice,
  update,
  remove,
  typeWiseDevice,
  devicesName,
  deviceStat,
};
