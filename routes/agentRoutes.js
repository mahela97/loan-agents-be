const {validateFirebaseIdToken} = require("../middlewares/validateFirebaseIdToken");
const router = require("express").Router();
const {isAgent} = require("../middlewares/isAgent");

router.use(isAgent);
router.get("/", (req, res) => res.status(200).send("Success"))

module.exports = router;