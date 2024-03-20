const Department = require("../models/department.js");
const Employee = require("../models/employee.js");
const { raise } = require("../utils/err.js");

const { successMessage } = require("../utils/response.js");

const addEmployee = async (req, res, next) => {
  const { org, body } = req;
  try {
    let employee = await Employee.findOne({
      $or: [{ email: body.email }, { nid: body.nid }],
    });
    if (employee) {
      raise(406, "Employee Already Exist with the same email/NID");
    }
    const department = await Department.findOne({
      $and: [{ organization: org._id }, { name: body.dept }],
    });
    if (!department) {
      raise(406, "No Department Found");
    }
    employee = new Employee({
      organization: org._id,
      ...body,
    });
    await employee.save();
    department.employees.push(employee._id);
    await department.save();
    return successMessage(res, 201, "Sucessfully Created Employee Data", {
      employee,
      department,
    });
  } catch (error) {
    next(error);
  }
};

const update = async (req, res, next) => {
  const {
    org,
    params: { empId },
    body,
  } = req;
  try {
    if (body.email || body.nid) {
      const isEmailNotUnique = await Employee.findOne({
        $or: [{ email: body?.email }, { nid: body?.nid }],
      });
      if (isEmailNotUnique) raise(406, "Email/NID Already Exist");
    }
    const employee = await Employee.findByIdAndUpdate(empId, body, {
      new: true,
    })
      .populate("allocatedDevice")
      .select("-organization");

    if (!employee) raise(404, "No Employee Found");
    return successMessage(res, 200, "Sucessfully Updated Employee", employee);
  } catch (error) {
    next(error);
  }
};

const remove = async (req, res, next) => {
  const { empId } = req.params;
  try {
    let employee = await Employee.findById(empId);
    if (!employee) raise(404, "No Employee Found");

    // Find Department to remove employee .
    let department = await Department.findOne({ name: employee.dept });
    if (!department) raise(404, "No Department Found");

    // If the empId matches the manager of the department, clear the manager field.
    if (department.manager && department.manager.equals(empId)) {
      department.manager = null;
    }

    // Remove employee from department's employees list.
    department.employees.pull(employee._id);
    await department.save();

    // remove employee .
    await Employee.findByIdAndDelete(empId);
    return successMessage(res, 200, "Sucessfully Removed Employee Data");
  } catch (error) {
    next(error);
  }
};

const filterEmployee = async (req, res, next) => {
  try {
    const filter = req.query.filter;
    const { org } = req;
    if (!filter) {
      raise(
        404,
        'Filter parameter is required. Use "filter=date" or "filter=deviceTaken"'
      );
    }

    let employees;
    if (filter === "date") {
      employees = await Employee.find({ organization: org._id })
        .select("-organization")
        .sort({ joinDate: 1 });
    } else {
      employees = await Employee.aggregate([
        {
          $match: { organization: org._id },
        },
        {
          $lookup: {
            from: "devices",
            localField: "allocatedDevice",
            foreignField: "_id",
            as: "devices",
          },
        },
        {
          $project: {
            _id: 1,
            name: 1,
            dept: 1,
            numOfDevicesTaken: { $size: "$devices" },
          },
        },
        {
          $sort: { numOfDevicesTaken: -1 },
        },
      ]);
    }

    return successMessage(
      res,
      200,
      "Successfully Return search data",
      employees
    );
  } catch (error) {
    next(error);
  }
};

const totalEmployee = async (req, res, next) => {
  const org = req.org;
  try {
    const data = await Employee.countDocuments({ organization: org._id });
    return successMessage(res, 200, "Data Found", {
      totalEmployee: data,
    });
  } catch (error) {
    next(error);
  }
};

const employees = async (req, res, next) => {
  try {
    const emps = await Employee.find({ organization: req.org._id }).select(
      "name dept designation email"
    );
    return successMessage(res, 200, "Data Returned", emps);
  } catch (err) {
    next(err);
  }
};

const employee = async (req, res, next) => {
  try {
    const { empId } = req.params;
    const result = await Employee.findById(empId)
      .populate("allocatedDevice")
      .select("-organization");
    if (!result) raise(404, "No Employee Found..");
    return successMessage(res, 200, "Data Found", result);
  } catch (err) {
    next(err);
  }
};

const lastEmployee = async (req, res, next) => {
  try {
    const emp = await Employee.findOne(
      { organization: req.org._id },
      {
        name: 1,
        dept: 1,
        designation: 1,
        email: 1,
      }
    ).sort({ createdAt: -1 });
    return successMessage(res,200,'Recent Employee',emp);
  } catch (err) {
    next(err);
  }
};

module.exports = {
  addEmployee,
  update,
  remove,
  filterEmployee,
  totalEmployee,
  employees,
  employee,
  lastEmployee,
};
