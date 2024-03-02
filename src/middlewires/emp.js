const Company = require("../models/company.js");
const Department = require("../models/department.js");
const Employee = require("../models/employee.js");

const emp = async (req, res, next) => {
  const { body, params: { id } } = req;
  try {
    // check if company id is valid.
    const isCompanyExist = await Company.findById(id);
    // check if dept id is valid.
    const isDepartmentExist = await Department.findOne({ _id: body.dept });
    // check if employee already exist.
    const isExist = await Employee.findOne({ 
      $and: [
        {company: id},
        {dept: body.dept},
        {email: body.email},
      ]});
    if (isExist || !isCompanyExist || !isDepartmentExist) {
      throw { status: 404, message: "User Already Exist Or Invalid Data" };
    }
    req.isCompanyExist = isCompanyExist;
    req.isDepartmentExist = isDepartmentExist;
    req.isExist = isExist;
    next();
  } catch (error) {
    next(error);
  }
};
const empTwo = async( req,res,next) => {
    const { id } = req.params;
    try {
        const isEmployeeExist = await Employee.findById(id);
        if(!isEmployeeExist) {
            throw {status: 400, message: "No employee found"};
        }
        req.isEmployeeExist = isEmployeeExist;
        next();
    } catch (error) {
        next(error);
    }
}
module.exports = {
    emp,
    empTwo,
}