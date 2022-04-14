const router = require("express").Router();
const {validateFirebaseIdToken} = require("../middlewares/validateFirebaseIdToken");
const {sendMessage, getChatList} = require("../controllers/messageController/messageController");


//router.use(validateFirebaseIdToken);

router.post("/", sendMessage)
router.get("/chat", getChatList )
router.get("/chatList", getChatList )


module.exports = router;

