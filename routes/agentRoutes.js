const {validateFirebaseIdToken} = require("../middlewares/validateFirebaseIdToken");
const router = require("express").Router();
const {isAgent} = require("../middlewares/isAgent");
const {getAgent, editAgentDetails} = require("../controllers/userControllers/agentController");

// router.use(isAgent);
router.get("/", getAgent)
router.patch("/:uid/basicDetails",editAgentDetails);
// router.get("/details",getAgentDetails)

module.exports = router;