const Record = require("../models/record.js");
const Device = require("../models/device.js");
const Employee = require("../models/employee.js");

const { successMessage } = require("../utils/response.js");
const { raise } = require("../utils/err.js");
const { validateId } = require("../utils/validator.js");

const recordMany = async (req, res, next) => {
  const { org } = req;
  try {
    const records = await Record.find({ organization: org._id });
    return successMessage(res, 200, "Successfully Return data", records);
  } catch (error) {
    next(error);
  }
};

const recordOne = async (req, res, next) => {
  const { recId } = req.params;
  try {
    const record = await Record.findById(recId);
    if (!record) {
      raise(404, "Sorry No Records Found");
    }
    return successMessage(res, 200, "Sucessfully Return Record", record);
  } catch (error) {
    next(error);
  }
};

const add = async (req, res, next) => {
  const { body, org } = req;
  try {
    // Check if device exist.
    const device = await Device.findById(body.device);
    const employee = await Employee.findById(body.employee);
    if (!device || !employee) {
      raise(404, "Invalid Device or employee id");
    }
    // check if already record is saved .
    const alreadyAllocatedToOther = await Record.findOne({
      $and: [{ device: body.device }, { available: false }],
    });
    if (alreadyAllocatedToOther) {
      raise(406, "Device is already allocated🙂");
    }
    // save data to records.
    const new_record = new Record({
      organization: org._id,
      ...body,
    });
    await new_record.save();
    employee.allocatedDevice.push(body.device);
    await employee.save();
    return successMessage(res, 201, "Sucessfully Saved Records", new_record);
  } catch (error) {
    next(error);
  }
};

const remove = async (req, res, next) => {
  const { recId } = req.params;
  try {
    const isRecordExist = await Record.findById(recId);
    if (!isRecordExist) {
      raise(404, "Sorry No Records Found");
    }
    await Record.findByIdAndDelete(recId);
    return successMessage(res, 200, "Sucessfully Record Removed");
  } catch (error) {
    next(error);
  }
};

const recordsOfAOrganization = async (req, res, next) => {
  try {
    const { org } = req;
    const records = await Record.find(
      { organization: org._id, available: false },
      {
        device: 0,
        employee: 0,
        organization: 0,
      }
    );
    return successMessage(res, 200, "all records", records);
  } catch (error) {
    next(error);
  }
};
const recordsOfADevice = async (req, res, next) => {
  try {
    const { id } = req.query;

    if (!id) {
      raise(404, "no device id given");
    }

    validateId(id);

    const records = await Record.find(
      { device: id, available: false },
      {
        device: 0,
        employee: 0,
        organization: 0,
      }
    );
    return successMessage(res, 200, "all records", records);
  } catch (error) {
    next(error);
  }
};
const recordsOfAEmployee = async (req, res, next) => {
  try {
    const { id } = req.query;

    if (!id) {
      raise(404, "no employee id given");
    }

    validateId(id);

    const records = await Record.find(
      { employee: id, available: false },
      {
        device: 0,
        employee: 0,
        organization: 0,
      }
    );
    return successMessage(res, 200, "all records", records);
  } catch (error) {
    next(error);
  }
};

const updateRecord = async (req, res, next) => {
  try {
    const { returnCondition, employeeId, deviceId } = req.body;
    if (!returnCondition || !employeeId || !deviceId) {
      raise(
        404,
        "Must provide returnCondition , employeeId and deviceId in the req body"
      );
    }
    validateId(employeeId);
    validateId(deviceId);
    const update_record = await Record.updateOne(
      { $and: [{ device: deviceId }, { employee: employeeId }] },
      { $set: { returnCondition: returnCondition, available: true } },
      { new: true }
    ).select("-organization -device -employee");
    return successMessage(res, 200, "Data Updated", update_record);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  recordMany,
  recordOne,
  add,
  remove,
  updateRecord,
  recordsOfAOrganization,
  recordsOfADevice,
  recordsOfAEmployee,
};
