const Company = require("../models/company.js");
const Department = require("../models/department.js");
const Employee = require("../models/employee.js");
const { successMessage } = require("../utils/response.js");

const department = async (req,res,next) => {
  const { id } = req.params;
  try {
    const depts = await Department.find({company : id}).populate('employees');
    return successMessage(res,200,"Sucessfully Data Returned",depts);
  } catch (error) {
    next(error);
  }
};

const register = async (req, res, next) => {
  const {
    params: { id },
    body: { name },
    isExist
  } = req;
  try {
    const newDept = new Department({
      company: id,
      name: name,
    });
    await newDept.save();
    isExist.dept.push(newDept._id);
    isExist.save();
    return successMessage(res,201,"Sucessfully Created Department And Updated Company",{newDept,isExist});
  } catch (error) {
    next(error);
  }
};

const update = async (req, res,next) => {
  console.log('Update');
  const { params: { id }, body : { name } } = req;
  try {
    const newDept = await Department.findByIdAndUpdate(id,{name: name},{new:true});
    if(!newDept) {
      throw { status: 404, message: "No Department Found" };
    }
    return successMessage(res,200,"Name Updated Successfully.",newDept);
  } catch (error) {
    next(error);
  }
};

const remove = async (req, res, next) => {
  try{
    const { id } = req.params;
    // find the department.
    const dept = await Department.findById(id);
    if(!dept) {
      throw { status: 404, message: "No Department Found" };
    }
    // find company.
    const company = await Company.findOne({_id: dept.company});
    // remove department id from company.
    company.dept.pull(id);
    // save it.
    company.save();
    // remove depratment from department.
    await Department.deleteOne({_id: id});
    return successMessage(res,200,"Sucessfully Removed Department And Updated Company");
  }catch(error) {
    next(error);
  }
};

const updateManager = async (req,res,next) => {
  try{
    const { params: {id}, body: { manager }} = req;
    // check if manager exist in employee document
    const isEmployeeExist = await Employee.findOne({
      $and: [
        {_id : manager},
        {dept: id}
      ]
    });
    const isDepartmentExist = await Department.findById(id);
    if(!isEmployeeExist || !isDepartmentExist) {
      throw {status: 404, message: "No Employee or department found"};
    }
  
    const updatedDepartment = await Department.findByIdAndUpdate(id,{manager: manager},{new:true});
    return successMessage(res,200,"Sucessfully Updated Depertment Manager",updatedDepartment);
  }catch(error) {
    next(error);
  }
}

module.exports = {
  department,
  register,
  update,
  remove,
  updateManager,
};
