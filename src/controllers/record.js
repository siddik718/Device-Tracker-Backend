
const Record  = require('../models/record.js');

const { successMessage } = require('../utils/response.js');

const recordMany = async (req,res,next) => {
    const { id } = req.params;
    try {
        const records = await Record.find({
            $or: [
                {company: id},
                {model: id},
                {allocatedTo: id}
            ]
        });

        if(!records) {
            throw {status: 404, message: "Sorry No Records Found"};
        }
        return successMessage(res,200,"Sucessfully Return Records Data",records);
    } catch (error) {
        next(error);
    }
}

const recordOne = async (req,res,next) => {
    const { id } = req.params;
    try {
        const records = await Record.findById(id);
        if(!records) {
            throw {status: 404, message: "Sorry No Records Found"};
        }
        return successMessage(res,200,"Sucessfully Return One Record Data",records);
    } catch (error) {
        next(error);
    }
}

const add = async(req,res,next) => {
    const {body,params} = req;
    try {
        const newRecord = new Record({company: params.id,...body});
        await newRecord.save();
        return successMessage(res,200,"Sucessfully Saved Record",newRecord);
    } catch (error) {
        next(error);
    }
}

const remove = async(req,res,next) => {
    const { id } = req.params;
    try {
        const isRecordExist = await Record.findById(id);
        if(!isRecordExist) {
            throw {status: 404,message:"No Records Found"};
        } 
        await Record.findByIdAndDelete(id);
        return successMessage(res,200,"Sucessfully Record Removed");
    } catch (error) {
        next(error);
    }
}


module.exports = {
    recordMany,
    recordOne,
    add,
    remove,
}