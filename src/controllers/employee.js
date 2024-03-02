
const Department = require('../models/department.js');
const Employee = require('../models/employee.js');

const { successMessage } = require('../utils/response.js');

const getOne = async(req,res,next) => {
    const { id } = req.params;
    try {
        const emp = await Employee.findById(id);
        if(!emp) {
            throw {
                status: 404,
                message: "No Employee Found",
            }
        }
        return successMessage(res,200,"Sucessfully Return Employee Data",emp);
    } catch (error) {
        next(error);   
    }
}


const addOne = async(req,res,next) => {
    const { body ,params: { id },isDepartmentExist } = req;
    try {
        const newEmp = new Employee({company: id,...body});
        await newEmp.save();
        isDepartmentExist.employees.push(newEmp._id);
        isDepartmentExist.save();
        return successMessage(res,200,"Sucessfully Added Employee Data",{
            payload: {newEmp,isDepartmentExist}
        });
    } catch (error) {
        next(error);
    }
}

const update = async(req,res,next) => {
    const { params:{ id }, body } = req;
    try{
        const upd = await Employee.findByIdAndUpdate(id,body,{new:true});
        if(!upd) {
            throw {
                status: 404,
                message: "No Employee Found",
            }
        }
        return successMessage(res,200,"Sucessfully Updated Employee Data",upd);
    }catch(error) {
        next(error);
    } 
}

const remove = async(req,res,next) => {
    const { params: {id},isEmployeeExist } = req;
    try{
        const isDepartmentExist = await Department.findOne({_id: isEmployeeExist.dept });
        if(!isDepartmentExist) {
            throw {
                status: 404,
                message: "No Department Found",
            }
        }
        isDepartmentExist.employees.pull(isEmployeeExist._id);
        isDepartmentExist.save();
        await Employee.findByIdAndDelete(id);
        return successMessage(res,200,"Sucessfully Removed Employee Data");
    }catch(error) {
        next(error);
    } 
}


module.exports = {
    getOne,
    addOne,
    update,
    remove,
}