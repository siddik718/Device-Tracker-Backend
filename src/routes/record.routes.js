const mongoose = require("mongoose");
const { checkSchema, param } = require("express-validator");
const {
  add,
  remove,
  recordOne,
  recordMany,
  recordsOfAOrganization,
  recordsOfADevice,
  recordsOfAEmployee,
  updateRecord,
} = require("../controllers/record.controller.js");

const { validateSchema } = require("../utils/validator.js");
const validationSchemaForRecord = require("../validator/record.js");
const { isLoggedIn } = require("../middlewires/auth.js");
const router = require("express").Router();

const validateObjectId = param("recId").custom((value) => {
  if (!mongoose.Types.ObjectId.isValid(value)) {
    throw new Error("Invalid ObjectId");
  }
  return true;
});

router.get("/", isLoggedIn, recordMany);

router.get("/one", isLoggedIn, recordsOfAOrganization);

router.get("/device", isLoggedIn, recordsOfADevice);
router.get("/employee", isLoggedIn, recordsOfAEmployee);

router.get("/:recId", validateObjectId, validateSchema, isLoggedIn, recordOne);

router.post(
  "/",
  checkSchema(validationSchemaForRecord),
  validateSchema,
  isLoggedIn,
  add
);

// Patch Requests..
router.patch(
  "/:recId",
  validateObjectId,
  validateSchema,
  isLoggedIn,
  updateRecord
);

// Delete Requests..
router.delete("/:recId", validateObjectId, validateSchema, isLoggedIn, remove);

router.use((req, res, next) => {
  next({ status: 404, message: "No Routes Found!!" });
});

module.exports = router;
