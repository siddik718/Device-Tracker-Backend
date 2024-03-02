const express = require("express");
const cookieParser = require('cookie-parser');

const companyRouter = require('./routes/company.js');
const departmentRouter = require('./routes/department.js');
const employeeRouter = require('./routes/empolyee.js');
const deviceRouter = require('./routes/device.js');
const recordRouter = require('./routes/record.js');

const app = express();

// MiddleWires.
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

// Import Routes.
app.use('/api/company',companyRouter);
app.use('/api/dept',departmentRouter);
app.use('/api/emp',employeeRouter);
app.use('/api/dev',deviceRouter);
app.use('/api/rec',recordRouter);

module.exports = app;
