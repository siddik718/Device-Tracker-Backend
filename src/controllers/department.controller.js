const Department = require("../models/department.js");
const Employee = require("../models/employee.js");
const { raise } = require("../utils/err.js");
const { successMessage } = require("../utils/response.js");

const department = async (req, res, next) => {
  const { org } = req;
  try {
    const dept = await Department.find({ organization: org._id }).populate(
      "employees"
    );
    return successMessage(res, 200, "Department Found", dept);
  } catch (error) {
    next(error);
  }
};

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
    const { manager , deptName } = req.body;
    if(!manager || !deptName) {
      raise(400,'manager / deptName is undefined.');
    }
    // check if manager exist in employee document
    const isEmployeeExist = await Employee.findOne({
      $and: [{ _id: manager }, { dept: deptName }],
    });
    const isDepartmentExist = await Department.findOne({ name: deptName });
    if (!isEmployeeExist || !isDepartmentExist) {
      raise(404,  "No Employee or department found" );
    }

    const updatedDepartment = await Department.findByIdAndUpdate(
      isDepartmentExist._id,
      { manager: manager },
      { new: true }
    );
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


const findManager = async (req, res, next) => {
  const { org } = req;
  try {
    const { deptName } = req.query;
    console.log(deptName);
    if (!deptName) {
      raise(
        400,
        "Please Provide Department name in the query like 'deptName=it'.."
      );
    }
    const department = await Department.findOne({
      $and: [
        { organization: org._id },
        { name : deptName}
      ],
    }).populate("manager", "-_id -organization");

    if (!department) {
      raise(404, "No Department Found");
    }
    if (!department.manager) {
      raise(404, "No manager assigned");
    }
    return successMessage(res, 200, "Manager Found",
      {manager: department.manager});
  } catch (error) {
    next(error);
  }
};

const numberOfEmployee = async (req, res, next) => {
  const { org } = req;
  try {
    const { deptName } = req.query;
    const isDepartmentExist = await Department.aggregate([
      {
        $match: {
          $and: [
            { organization: org._id },
            { name: { $regex: new RegExp(deptName, "i") } },
          ],
        },
      },
    ]);

    if (!isDepartmentExist) {
      raise(404, "No Department Found");
    }
    const noOfEmployee = await Department.aggregate([
      {
        $match: {
          $and: [
            { organization: org._id },
            { name: { $regex: new RegExp(deptName, "i") } },
          ],
        },
      },
      {
        $lookup: {
          from: "employees",
          localField: "employees",
          foreignField: "_id",
          as: "employees",
        },
      },
      {
        $project: {
          numberOfEmployees: {
            $size: "$employees",
          },
        },
      },
    ]);
    return successMessage(res, 200, "SucessFully Return data", noOfEmployee);
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
module.exports = {
  department,
  register,
  update,
  remove,
  updateManager,
  numberOfEmployee,
  findManager,
  noOfDept
};
