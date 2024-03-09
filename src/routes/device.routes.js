const {
  getDevices,
  addDevice,
  update,
  remove,
  typeWiseDevice
} = require("../controllers/device.controller.js");

const { validateSchema } = require("../utils/validator.js");
const validationSchemaForDevice = require("../validator/device.js");
const { isLoggedIn } = require("../middlewires/auth.js");


const mongoose = require("mongoose");
const { checkSchema, body,param } = require("express-validator");
const router = require("express").Router();


const validateBodyNotEmpty = body().custom((value) => {
  if (Object.keys(value).length === 0) {
    throw new Error("No Value Provided to update");
  }
  return true;
});
const validateObjectId = param("deviceId").custom((value) => {
  if (!mongoose.Types.ObjectId.isValid(value)) {
    throw new Error("Invalid ObjectId");
  }
  return true;
});

// Comment this ...... line ...
// const dummy = require("../dummy/device.js");
// router.post('/dummy',dummy);

router.get("/", isLoggedIn, getDevices);

router.get('/search',isLoggedIn,typeWiseDevice);

router.post(
  "/",
  checkSchema(validationSchemaForDevice),
  validateSchema,
  isLoggedIn,
  addDevice
);

router.patch(
  "/:deviceId",
  validateObjectId,
  validateBodyNotEmpty,
  validateSchema,
  isLoggedIn,
  update
);
router.delete(
  "/:deviceId",
  validateObjectId,
  validateSchema,
  isLoggedIn,
  remove
);

router.use((req, res, next) => {
  next({ status: 404, message: "No Routes Found!!" });
});

module.exports = router;
