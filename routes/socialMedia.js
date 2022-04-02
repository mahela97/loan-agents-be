const {getAllSocialMedias} = require("../controllers/socialMediaControllers/socialMediaController");
const router = require("express").Router();

router.get("/", getAllSocialMedias);

module.exports = router;
