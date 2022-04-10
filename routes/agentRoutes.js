const {validateFirebaseIdToken} = require("../middlewares/validateFirebaseIdToken");
const router = require("express").Router();
const {isAgent} = require("../middlewares/isAgent");
const {getAgent, editAgentDetails, addAgentSocialMedia, addAgentContactDetail,
    addAgentIntroduction} = require("../controllers/userControllers/agentController");

// router.use(isAgent);
router.get("/", getAgent)
router.patch("/:uid/basicDetails", editAgentDetails);
router.post("/:uid/socialMedia", addAgentSocialMedia);
router.post("/:uid/contactDetail",addAgentContactDetail)
router.patch("/:uid/introduction", addAgentIntroduction);
// router.get("/details",getAgentDetails)

module.exports = router;

