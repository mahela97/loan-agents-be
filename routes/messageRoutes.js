const router = require("express").Router();
const {validateFirebaseIdToken} = require("../middlewares/validateFirebaseIdToken");
const {sendMessage, getConversationList, getConversation} = require("../controllers/messageController/messageController");


//router.use(validateFirebaseIdToken);

router.post("/", sendMessage)
router.get("/conversationList", getConversationList )
router.get("/conversation", getConversation )


module.exports = router;

