const Department = require("../models/department.js");
const Employee = require("../models/employee.js");
const { raise } = require("../utils/err.js");
const { successMessage } = require("../utils/response.js");

const register = async (req, res, next) => {
  const { org, body } = req;
  try {
    let department = await Department.findOne({
      $and: [{ organization: org._id }, { name: body.name }],
    });
    if (department) {
      raise(406, "Department Already Exist");
    }
    department = new Department({
      organization: org._id,
      name: body.name,
    });
    await department.save();
    org.dept.push(department._id);
    await org.save();
    return successMessage(
      res,
      201,
      "Sucessfully Created Department And Updated Company",
      { department, org }
    );
  } catch (error) {
    next(error);
  }
};

const update = async (req, res, next) => {
  const { org, body, params } = req;
  try {
    let department = await Department.findOne({
      $and: [{ organization: org._id }, { name: body.name }],
    });
    if (department) {
      raise(406, "Department Already Exist");
    }
    const newDept = await Department.findByIdAndUpdate(
      { _id: params.deptId },
      { $set: { name: body.name } },
      { new: true }
    );
    if (!newDept) {
      raise(404, "No Department Found");
    }
    return successMessage(res, 200, "Name Updated Successfully.", newDept);
  } catch (error) {
    next(error);
  }
};

const remove = async (req, res, next) => {
  try {
    const { deptId } = req.params;
    // find the department.
    const dept = await Department.findById({ _id: deptId });
    if (!dept) {
      raise(404, "No Department Found");
    }
    // console.log(dept);
    // remove all employee of the department
    await Employee.deleteMany({ dept: dept.name });
    // remove department id from orgabization.
    req.org.dept.pull(deptId);
    await req.org.save();
    // remove depratment from department.
    await Department.findByIdAndDelete({ _id: deptId });
    return successMessage(
      res,
      200,
      "Sucessfully Removed Department And Updated Company"
    );
  } catch (error) {
    next(error);
  }
};

const updateManager = async (req, res, next) => {
  try {
    const { manager, deptName } = req.body;
    const { org } = req;
    // console.log(req.body);
    if (!manager || !deptName) {
      raise(400, "manager / deptName is undefined.");
    }
    // check if manager exist in employee document
    const isEmployeeExist = await Employee.findOne({
      $and: [{ _id: manager }, { dept: deptName }],
    });
    const isDepartmentExist = await Department.findOne({
      $and: [{ organization: org._id }, { name: deptName }],
    });
    if (!isEmployeeExist || !isDepartmentExist) {
      raise(404, "No Employee or department found");
    }
    // console.log(isDepartmentExist);
    const updatedDepartment = await Department.findByIdAndUpdate(
      isDepartmentExist._id,
      { manager: manager },
      { new: true }
    );
    // console.log(updatedDepartment);
    return successMessage(
      res,
      200,
      "Sucessfully Updated Depertment Manager",
      updatedDepartment
    );
  } catch (error) {
    next(error);
  }
};

const noOfDept = async (req, res, next) => {
  const org = req.org;
  try {
    const depts = await Department.aggregate([
      {
        $match: {
          organization: org._id,
        },
      },
      {
        $lookup: {
          from: "employees",
          localField: "employees",
          foreignField: "_id",
          as: "emoplyees",
        },
      },
      {
        $project: {
          _id: 1,
          name: 1,
          numberOfEmployee: { $size: "$employees" },
        },
      },
    ]);
    return successMessage(res, 200, "Data Found", depts);
  } catch (error) {
    next(error);
  }
};

const Details = async (req, res, next) => {
  const { deptId } = req.params;
  try {
    const result = await Department.findById(deptId)
      .populate({
        path: "employees",
        select: "name designation salary email",
      })
      .populate({
        path: "manager",
        select: "name email",
      })
      .select("name employees manager");

    return successMessage(res, 200, "Data Found", result);
  } catch (error) {
    next(error);
  }
};

const deptStat = async (req, res, next) => {
  try {
    const total = await Department.countDocuments({
      organization: req.org._id,
    });
    const dept = await Department.find({ organization: req.org._id })
      .select("name")
      .sort({ createdAt: -1 })
      .limit(5);
    return successMessage(res, 200, "Deptartments", {
      dept,
      total,
    });
  } catch (err) {
    next(err);
  }
};

module.exports = {
  register,
  update,
  remove,
  updateManager,
  noOfDept,
  Details,
  deptStat,
};
