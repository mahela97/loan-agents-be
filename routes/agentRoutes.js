const {validateFirebaseIdToken} = require("../middlewares/validateFirebaseIdToken");
const router = require("express").Router();
const {isAgent} = require("../middlewares/isAgent");
const {getAgent, editAgentDetails, addAgentSocialMedia} = require("../controllers/userControllers/agentController");

// router.use(isAgent);
router.get("/", getAgent)
router.patch("/:uid/basicDetails", editAgentDetails);
router.post("/:uid/socialMedia", addAgentSocialMedia);
// router.get("/details",getAgentDetails)

module.exports = router;