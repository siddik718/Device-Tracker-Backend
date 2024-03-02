
const Company = require('../models/company.js');
const Device = require('../models/device.js');

const { successMessage } = require('../utils/response.js');

const getOne = async (req, res, next) => {
    const {id} = req.params;
    try {
        const isDeviceExist = await Device.findOne({_id: id});
        if(!isDeviceExist) {
            throw {status: 404, message: 'No Device Found'};
        }
        return successMessage(res,200,"Sucessfully Returned Device Data",isDeviceExist);
    } catch (error) {
        next(error);
    }
};

const getAll = async (req, res,next) => {
    const { id }= req.params;
    try {
        const isCompanyExist = await Company.findOne({_id:id});
        if(!isCompanyExist) {
            throw {status: 404, message: 'No Compnay Found'};
        }
        const all = await Device.find({company: id});
        return successMessage(res,200,"Sucessfully Returned Data",all);
    } catch (error) {
        next(error);
    }
};

const addDevice = async (req, res, next) => {
    const {params : { id }, body} = req;
    try {
        const isCompanyExist = await Company.findOne({_id:id});
        if(!isCompanyExist) {
            throw {status: 404, message: 'No Compnay Found'};
        }
        const newDevice = new Device({company: id,...body});
        newDevice.save();
        return successMessage(res,200,"Sucessfully Added new Device",newDevice);
    } catch (error) {
        next(error);
    }
};


const update = async (req, res,next) => {
    const {id} = req.params;
    try {
        const isDeviceExist = await Device.findOne({_id: id});
        if(!isDeviceExist) {
            throw {status: 404, message: 'No Device Found'};
        }
        const newDevice = await Device.findByIdAndUpdate(id,req.body,{new:true});
        return successMessage(res,200,"Sucessfully Updated Device",newDevice);
    } catch (error) {
        next(error);
    }
};

const remove = async (req, res,next) => {
    const {id} = req.params;
    try {
        const isDeviceExist = await Device.findOne({_id: id});
        if(!isDeviceExist) {
            throw {status: 404, message: 'No Device Found'};
        }
        await Device.findByIdAndDelete(id);
        return successMessage(res,200,"Sucessfully Removed Device");
    } catch (error) {
        next(error);
    }
};

module.exports = {
  getOne,
  getAll,
  addDevice,
  update,
  remove,
};
