const router = require("express").Router();
const { getAllUsers, getUser, createUser, updateUser, deleteUser } = require("../../controllers/user-controller");

router.route("/").get(getAllUsers)
router.route("/:id").get(getUser)
router.route("/").post(createUser)
router.route("/:id").put(updateUser);
router.route("/:id").delete(deleteUser);

module.exports = router;
