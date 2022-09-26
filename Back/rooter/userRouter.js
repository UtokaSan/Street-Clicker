const express = require("express");
const router = express.Router();
const userController = require("../Controllers/userController");

//realy Route with Login
router.post("/login", userController.login);

//realy Route Test
router.get(
  "/getTestToken",
  userController.authToken,
  userController.getTestToken
);

//realy Route no finish and with little test
router.post("/test", userController.test);
router.post("/create/test", userController.Testpost);
router.post("/create/user", userController.userCreator);
router.get("/a", userController.getAll);

router.patch("/update", userController.update);
router.post("/teste", userController.update);

module.exports = router;
