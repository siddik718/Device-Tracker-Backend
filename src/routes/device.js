const { checkSchema, body } = require("express-validator");
const {
  getOne,
  getAll,
  addDevice,
  update,
  remove,
} = require("../controllers/device");

const router = require("express").Router();


const { validateSchema } = require("../utils/validator");
const validationSchemaForDevice = require("../validator/device");
const { validateObjectId } = require("../validator/mongoId");

const { isLoggedIn } = require('../middlewires/auth.js');

// Middleware to check if the request body contains at least one field to update
const validateBodyNotEmpty = body().custom((value) => {
  // Check if the request body contains at least one key-value pair
  if (Object.keys(value).length === 0) {
    throw new Error("No Value Provided to update");
  }
  return true;
});

// Comment this ...... line ...
// const dummy = require("../dummy/device.js");
// router.post('/dummy',dummy);

// Device Id.
router.get("/:id/one", validateObjectId, validateSchema, isLoggedIn, getOne);
// Company Id.
router.get("/:id", validateObjectId, validateSchema,isLoggedIn, getAll);

// Company Id.
router.post(
  "/:id",
  validateObjectId,
  checkSchema(validationSchemaForDevice),
  validateSchema,
  isLoggedIn,
  addDevice
);

// Device Id.
router.patch(
  "/:id",
  validateObjectId,
  validateBodyNotEmpty,
  validateSchema,
  isLoggedIn,
  update
);
// Device Id.
router.delete("/:id", validateObjectId, validateSchema,isLoggedIn, remove);

router.use((req,res,next) => {
  next({status: 404,message: "No Routes Found!!"});
});


module.exports = router;
