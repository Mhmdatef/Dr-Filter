const UserController = require("../controllers/UserController");
const express = require("express");
const router = express.Router();

router.route("/").get(UserController.getAllUsers);
router.route("/makeAdmin/:id").patch(UserController.MakeUserAdmin);

router.route("/getuserdata").get(UserController.getUser);

router.route("/updatePassword").patch(UserController.updatePassword);

router
  .route("/:id")
  .patch(UserController.updateUser)
  .delete(UserController.deleteUser);

module.exports = router;
