const { checkSchema, body } = require("express-validator");
const { addOne, update, remove, getOne } = require("../controllers/employee");
const { validateSchema } = require("../utils/validator");
const { validateObjectId } = require("../validator/mongoId");
const validationSchemaForEmployee = require("../validator/employee");
const { emp, empTwo } = require("../middlewires/emp");
const { isLoggedIn } = require("../middlewires/auth");
const router = require("express").Router();

// Remove this ...... line ...
// const dummy = require("../dummy/employee.js");
// router.post('/dummy',dummy);
const validateBodyNotEmpty = body().custom((value) => {
  // Check if the request body contains at least one key-value pair
  if (Object.keys(value).length === 0) {
    throw new Error("No Value Provided to update");
  }
  return true;
});

// Employee Id.
router.get("/:id",validateObjectId,validateSchema,isLoggedIn,getOne);

// Company Id.
router.post(
  "/:id",
  validateObjectId,
  checkSchema(validationSchemaForEmployee),
  validateSchema,
  isLoggedIn,
  emp,
  addOne
);

// Employee Id.
router.patch(
  "/:id",
  validateObjectId,
  validateBodyNotEmpty,
  validateSchema,
  isLoggedIn,
  update
);
router.delete("/:id", validateObjectId, validateSchema,empTwo,isLoggedIn, remove);


router.use((req,res,next) => {
  next({status: 404,message: "No Routes Found!!"});
});

module.exports = router;
