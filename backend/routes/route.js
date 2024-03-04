const express = require("express");
const {
  newUser,
  getUsers,
  patchUser,
  delUser
} = require("../controllers/userController")

const router = express.Router();

router.post("/new", newUser );

router.get("/", getUsers );

router.patch("/:_id", patchUser );

router.delete("/:_id", delUser );

module.exports = router;