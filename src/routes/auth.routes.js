const router = require("express").Router();

const {
  signup,
  login,
  logout,
  accessByRefreshToken,
} = require("../controllers/userauth.controller.js");
const { isLoggedIn } = require("../middlewires/auth.js");
const { checkSchema } = require("express-validator");
const { validateSchema } = require("../utils/validator");

const {
  validationSchemaForSignup,
  validationSchemaForLogin,
} = require("../validator/form");

router.post(
  "/signup",
  checkSchema(validationSchemaForSignup),
  validateSchema,
  signup
);

router.post(
  "/login",
  checkSchema(validationSchemaForLogin),
  validateSchema,
  login
);

router.post("/access-by-refresh-token", accessByRefreshToken);

router.post("/logout", isLoggedIn, logout);

router.use((req, res, next) => {
  next({ status: 404, message: "No Routes Found!!" });
});

module.exports = router;
