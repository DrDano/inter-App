const router = require("express").Router();
const { getAllThoughts, newThought, deleteAllThoughts, getThought, updateThought, addReaction } = require("../../controllers/thought-controller");

router.route("/").get(getAllThoughts);
router.route("/").post(newThought);
router.route("/").delete(deleteAllThoughts);
router.route("/:id").get(getThought);
router.route("/:id").put(updateThought);
router.route("/:id").post(addReaction);
router.route("/:id").delete(deleteReaction);

module.exports = router;
