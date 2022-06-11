const {
    test,
    registerUser, addUserLanguage, addUserProfilePicture, deleteProfilePicture, getUserDetails,deleteUser
} = require("../controllers/userControllers/userController");
const {validateFirebaseIdToken} = require("../middlewares/validateFirebaseIdToken");
const multer  = require('multer')().single("image")

const router = require("express").Router();

//public Routes
router.post("/register", registerUser);

//private routes
//router.use(validateFirebaseIdToken);

//public
router.post("/:uid/languages", addUserLanguage);
router.post("/:uid/profilePicture", multer, addUserProfilePicture);
router.delete("/:uid/profilePicture",deleteProfilePicture)

router.get("/",getUserDetails)

router.delete("/:uid",deleteUser)
router.use("/agent",require("./agentRoutes"))
router.use("/client", require("./clientRoutes"))




module.exports = router;
