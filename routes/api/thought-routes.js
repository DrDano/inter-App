const router = require("express").Router();
const { getAllThoughts, newThought } = require("../../controllers/thought-controller");

router.route("/").get(getAllThoughts);
router.route("/").post(newThought);

module.exports = router;
