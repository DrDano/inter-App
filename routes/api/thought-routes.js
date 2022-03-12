const router = require("express").Router();
const { getAllThoughts, newThought, deleteAllThoughts, getThought, updateThought } = require("../../controllers/thought-controller");

router.route("/").get(getAllThoughts);
router.route("/").post(newThought);
router.route("/").delete(deleteAllThoughts);
router.route("/:id").get(getThought);
router.route("/:id").put(updateThought);

module.exports = router;
