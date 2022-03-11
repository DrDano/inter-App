const router = require("express").Router();
const { getAllUsers, getUser, createUser } = require("../../controllers/user-controller");

router.route("/").get(getAllUsers)
router.route("/:id").get(getUser)
router.route("/").post(createUser)

module.exports = router;
