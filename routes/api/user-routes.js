const router = require("express").Router();
const { getAllUsers, getUser, createUser, updateUser, deleteUser, addFriend } = require("../../controllers/user-controller");

router.route("/").get(getAllUsers)
router.route("/:id").get(getUser)
router.route("/").post(createUser)
router.route("/:id").put(updateUser);
router.route("/:id").delete(deleteUser);
router.route("/:id/friends").post(addFriend);

module.exports = router;
