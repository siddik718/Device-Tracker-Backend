const router = require("express").Router();
const {
  update,
  register,
  remove,
  department,
  updateManager,
} = require("../controllers/department");

const { body } = require("express-validator");
const { validateSchema } = require("../utils/validator");
const { validateObjectId } = require("../validator/mongoId");
const { isIdExist, isLoggedIn } = require("../middlewires/auth");

const validateBody = body("name").notEmpty().withMessage("No Departemnt name is provided");


// Comment this ...... line ...
// const dummy = require("../dummy/department.js");
// router.post('/dummy',dummy);


// Company Id.
router.get(
  "/:id",
  validateObjectId,
  validateSchema,
  isIdExist,
  isLoggedIn,
  department
);

// Company ID.
router.post(
  "/:id/register-dept",
  validateObjectId,
  validateBody,
  validateSchema,
  isIdExist,
  isLoggedIn,
  register
);

// Department Id.
router.patch(
  "/:id/update-dept-manager",
  validateObjectId,
  body("manager").notEmpty().withMessage("No Manager id is provided"),
  validateSchema,
  isLoggedIn,
  updateManager
);

router.patch(
  "/:id/update-dept",
  validateObjectId,
  validateBody,
  validateSchema,
  isLoggedIn,
  update
);

router.delete("/:id",isLoggedIn, remove);

router.use((req,res,next) => {
  next({status: 404,message: "No Routes Found!!"});
});


module.exports = router;
