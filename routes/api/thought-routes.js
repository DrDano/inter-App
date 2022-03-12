const router = require("express").Router();
const { getAllThoughts, newThought, deleteAllThoughts } = require("../../controllers/thought-controller");

router.route("/").get(getAllThoughts);
router.route("/").post(newThought);
router.route("/").delete(deleteAllThoughts);

module.exports = router;
