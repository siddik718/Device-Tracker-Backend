const router = require("express").Router();
const {
  update,
  register,
  remove,
  department,
  updateManager,
  numberOfEmployee,
  findManager,
  noOfDept,
} = require("../controllers/department.controller.js");

const mongoose = require("mongoose");
const { body, param } = require("express-validator");
const { validateSchema } = require("../utils/validator.js");
const { isLoggedIn } = require("../middlewires/auth.js");

const validateBody = body("name")
  .notEmpty()
  .withMessage("No Departemnt name is provided");

const validateObjectId = param("deptId").custom((value) => {
  if (!mongoose.Types.ObjectId.isValid(value)) {
    throw new Error("Invalid ObjectId");
  }
  return true;
});

// Comment this ...... line ...
// const dummy = require("../dummy/department.js");
// router.post('/dummy',dummy);

router.get("/", isLoggedIn, department);
router.get('/find-manager',isLoggedIn,findManager)
router.get('/number-of-employee',isLoggedIn,numberOfEmployee);
router.get('/departments',isLoggedIn,noOfDept);

router.post("/add-dept", validateBody, validateSchema, isLoggedIn, register);

router.patch(
  "/update-manager",
  body("manager").notEmpty().withMessage("manager id is undefined"),
  body("deptName").notEmpty().withMessage("Department Name is undefined"),
  validateSchema,
  isLoggedIn,
  updateManager
);

router.patch(
  "/:deptId/update-name",
  validateObjectId,
  validateBody,
  validateSchema,
  isLoggedIn,
  update
);

router.delete("/:deptId", validateObjectId, validateSchema, isLoggedIn, remove);

router.use((req, res, next) => {
  next({ status: 404, message: "No Routes Found!!" });
});

module.exports = router;
