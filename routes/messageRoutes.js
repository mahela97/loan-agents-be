const router = require("express").Router();
const {validateFirebaseIdToken} = require("../middlewares/validateFirebaseIdToken");
const {sendMessage, getConversationList} = require("../controllers/messageController/messageController");


//router.use(validateFirebaseIdToken);

router.post("/", sendMessage)
router.get("/conversationList", getConversationList )
// router.get("/conversation", getChatList )


module.exports = router;

