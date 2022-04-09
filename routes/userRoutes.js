const {
    test,
    registerUser, addUserLanguage,
} = require("../controllers/userControllers/userController");
const {validateFirebaseIdToken} = require("../middlewares/validateFirebaseIdToken");

const router = require("express").Router();

//public Routes
router.post("/register", registerUser);

//private routes
//router.use(validateFirebaseIdToken);

router.post("/:uid/languages", addUserLanguage);
router.use("/agent",require("./agentRoutes"))




module.exports = router;
