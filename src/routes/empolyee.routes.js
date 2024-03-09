const {
  addEmployee,
  update,
  remove,
  totalEmployee,
  filterEmployee,
} = require("../controllers/employee.controller.js");

const { isLoggedIn , updateRecord} = require("../middlewires/auth");
const { validateSchema } = require("../utils/validator");
const validationSchemaForEmployee = require("../validator/employee");

const mongoose = require("mongoose");
const router = require("express").Router();
const { checkSchema, body, param } = require("express-validator");


const validateBodyNotEmpty = body().custom((value) => {
  if (Object.keys(value).length === 0) {
    throw new Error("No Value Provided to update");
  }
  return true;
});

const validateObjectId = param("empId").custom((value) => {
  if (!mongoose.Types.ObjectId.isValid(value)) {
    throw new Error("Invalid ObjectId");
  }
  return true;
});

router.get('/',isLoggedIn,totalEmployee);
router.get('/search',isLoggedIn,filterEmployee);

router.post(
  "/",
  checkSchema(validationSchemaForEmployee),
  validateSchema,
  isLoggedIn,
  addEmployee
);

router.patch(
  "/:empId",
  validateObjectId,
  validateBodyNotEmpty,
  validateSchema,
  isLoggedIn,
  update
);

router.delete("/:empId", validateObjectId, validateSchema, isLoggedIn, updateRecord, remove);

router.use((req, res, next) => {
  next({ status: 404, message: "No Routes Found!!" });
});

module.exports = router;
