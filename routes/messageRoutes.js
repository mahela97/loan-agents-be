const router = require("express").Router();
const {validateFirebaseIdToken} = require("../middlewares/validateFirebaseIdToken");
const {sendMessage} = require("../controllers/messageController/messageController");


//router.use(validateFirebaseIdToken);

router.post("/", sendMessage)


module.exports = router;

