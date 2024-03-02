const { checkSchema } = require("express-validator");
const {
  add,
  remove,
  recordOne,
  recordMany,
} = require("../controllers/record");

const { validateSchema } = require("../utils/validator");
const { validateObjectId } = require("../validator/mongoId");
const validationSchemaForRecord = require("../validator/record");
const checkInfoFirst = require("../middlewires/record");
const { isLoggedIn } = require('../middlewires/auth.js');

const router = require("express").Router();

// Record Id.
router.get("/:id/one", validateObjectId, validateSchema, 
isLoggedIn,recordOne);

// Company/Employee/Device ID.
router.get("/:id", validateObjectId, validateSchema, isLoggedIn, recordMany);

// Company ID.
router.post(
  "/:id",
  validateObjectId,
  checkSchema(validationSchemaForRecord),
  validateSchema,
  isLoggedIn,
  checkInfoFirst,
  add
);

// Record Id.
router.delete("/:id", validateObjectId, validateSchema,isLoggedIn, remove);

router.use((req, res, next) => {
  next({ status: 404, message: "No Routes Found!!" });
});

module.exports = router;
