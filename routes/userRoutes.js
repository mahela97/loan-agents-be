const {
    test,
    registerUser,
} = require("../controllers/userControllers/userController");
const {validateFirebaseIdToken} = require("../middlewares/validateFirebaseIdToken");

const router = require("express").Router();

//public Routes
router.post("/register", registerUser);

//private routes
//router.use(validateFirebaseIdToken);

router.use("/agent",require("./agentRoutes"))




module.exports = router;
