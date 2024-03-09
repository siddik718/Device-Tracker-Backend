const { Schema, model } = require("mongoose");

const schema = new Schema({
    organization: {
        type: Schema.Types.ObjectId,
        ref: 'Organization',
    },
    name: {
        type: String,
        required: [true,'Department Name Should be given'],
    },
    manager: {
        type: Schema.Types.ObjectId,
        ref: 'Employee',
    },
    employees: [{type: Schema.Types.ObjectId,ref:'Employee'}],
}, {timestamps : true});

const Department = model('Department',schema);
module.exports = Department;

