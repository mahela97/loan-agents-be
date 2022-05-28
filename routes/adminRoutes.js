const {register, login, getCurrentUser, editMetadata, updateCover, updateLogo, addLanguage} = require("../controllers/userControllers/adminController");
const {isAdmin} = require("../middlewares/isAdmin");
const router = require("express").Router();
const multer  = require('multer')().single("image")

router.post("/register", register)
router.post("/login", login)
router.get("/me", isAdmin, getCurrentUser)


router.patch("/metadata", editMetadata)
router.patch("/metadata/cover", multer, updateCover)
router.patch("/metadata/logo", multer, updateLogo)
router.post("/language", addLanguage)
module.exports = router;
