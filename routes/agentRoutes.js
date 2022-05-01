const {validateFirebaseIdToken} = require("../middlewares/validateFirebaseIdToken");
const router = require("express").Router();
const {isAgent} = require("../middlewares/isAgent");
const {getAgent, editAgentDetails, addAgentSocialMedia, addAgentContactDetail,
    addAgentIntroduction, addAgentEducation, updateAgentEducation, deleteAgentEducation, addAgentContactVia,
    updateAgentLoanTypes, getAllAgents, createAgentSubscription, getPaymentPortal
} = require("../controllers/userControllers/agentController");

// router.use(isAgent);
router.get("/", getAgent)
router.get("/all", getAllAgents);
router.patch("/:uid/basicDetails", editAgentDetails);
router.post("/:uid/socialMedia", addAgentSocialMedia);
router.post("/:uid/contactDetail",addAgentContactDetail)
router.patch("/:uid/introduction", addAgentIntroduction);
router.patch("/:uid/contactVia", addAgentContactVia);

//education routes
router.post("/:uid/education",addAgentEducation)
router.patch("/:uid/education/:eid", updateAgentEducation)
router.delete("/:uid/education/:eid",deleteAgentEducation)

//work routes
router.post("/:uid/work")
router.patch("/:uid/work/:wid")
router.delete("/:uid/work/:wid")

//loan routes
router.patch("/:uid/loan", updateAgentLoanTypes)

// payment Routes
router.get("/subscription", createAgentSubscription)
router.get("/paymentPortal", getPaymentPortal)


module.exports = router;

