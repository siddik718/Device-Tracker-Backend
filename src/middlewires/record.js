
const Device  = require('../models/device.js');
const Employee  = require('../models/employee.js');
const Company  = require('../models/company.js');


const checkInfoFirst = async(req,res,next) => {
    const {body,params} = req;
    try {
         // find if company exist.
         const isCompanyExist = await Company.findOne({_id: params.id});
         // find if Device exist.
         const isDeviceExist = await Device.findOne({
            $and: [
                {_id: body.model},
                {company: params.id}
            ]
         });
         // find if Employee exist.
         const isEmployeeExist = await Employee.findOne({
            $and: [
                {_id: body.allocatedTo},
                {company: params.id}
            ]
         });
 
         if(!isCompanyExist || !isDeviceExist || !isEmployeeExist) {
             throw {status: 404, message: "No Relevent Information Found"};
         }
         
         next();
    } catch (error) {
        next(error);
    }
}

module.exports = checkInfoFirst;