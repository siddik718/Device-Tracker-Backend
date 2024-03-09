const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");

// Import Routes
const authRouter = require("./routes/auth.routes.js");
const deviceRouter = require("./routes/device.routes.js");
const employeeRouter = require("./routes/empolyee.routes.js");
const organizationRouter = require("./routes/organization.routes.js");
const departmentRouter = require("./routes/department.routes.js");
const recordRouter = require("./routes/record.routes.js");

const app = express();

// MiddleWires.
app.use(cors());
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Routes
app.use("/api/auth", authRouter);
app.use("/api/dev", deviceRouter);
app.use("/api/rec", recordRouter);
app.use("/api/emp", employeeRouter);
app.use("/api/org", organizationRouter);
app.use("/api/dept", departmentRouter);

module.exports = app;
