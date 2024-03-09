const {
  update,
  organization,
} = require("../controllers/organization.controller.js");


const { isLoggedIn } = require("../middlewires/auth.js");

const router = require("express").Router();


router.get("/", isLoggedIn, organization);

router.patch('/',isLoggedIn, update);

router.use((req, res, next) => {
  next({ status: 404, message: "No Routes Found!!" });
});

module.exports = router;
