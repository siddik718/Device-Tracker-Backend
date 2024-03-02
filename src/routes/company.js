const {
  signup,
  login,
  addBranch,
  removeBranch,
  update,
  findAll,
  findByID,
  logout,
} = require("../controllers/company");

const {
  validationSchemaForSignup,
  validationSchemaForLogin,
  validationSchemaForBranch,
} = require("../validator/form");

const { isEmailExist, isIdExist, isLoggedIn } = require("../middlewires/auth");
const { checkSchema } = require("express-validator");
const { validateSchema } = require("../utils/validator");
const { validateObjectId } = require("../validator/mongoId");

const router = require("express").Router();

// Comment this ...... line ...
// const dummy = require("../dummy/company.js");
// router.post('/dummy',dummy);

router.get("/", findAll);

router.get("/:id", validateObjectId, validateSchema, isIdExist, findByID);

router.post(
  "/signup",
  checkSchema(validationSchemaForSignup),
  validateSchema,
  isEmailExist,
  signup
);
router.post(
  "/login",
  checkSchema(validationSchemaForLogin),
  validateSchema,
  isEmailExist,
  login
);
router.post("/logout", logout);

router.patch(
  "/:id", 
  validateObjectId, 
  validateSchema, 
  isLoggedIn,
  update
);

router.patch(
  "/:id/add-branch",
  validateObjectId,
  checkSchema(validationSchemaForBranch),
  validateSchema,
  isIdExist,
  isLoggedIn,
  addBranch
);

router.delete(
  "/:id/remove-branch",
  validateObjectId,
  checkSchema(validationSchemaForBranch),
  validateSchema,
  isIdExist,
  isLoggedIn,
  removeBranch
);

router.use((req, res, next) => {
  next({ status: 404, message: "No Routes Found!!" });
});

module.exports = router;
