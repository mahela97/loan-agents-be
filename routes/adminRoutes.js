const {register, login, getCurrentUser, editMetadata, updateCover, updateLogo, addLanguage, deleteLanguage,
    updateVisibility
} = require("../controllers/userControllers/adminController");
const {isAdmin} = require("../middlewares/isAdmin");
const {addLoanType, deleteLoanType} = require("../controllers/publicControllers/loanController");
const router = require("express").Router();
const multer  = require('multer')().single("image")

router.post("/register", register)
router.post("/login", login)
router.get("/me", isAdmin, getCurrentUser)


router.patch("/metadata", editMetadata)
router.patch("/metadata/cover", multer, updateCover)
router.patch("/metadata/logo", multer, updateLogo)


router.post("/language", addLanguage)
router.delete("/language/:id", deleteLanguage)

router.post("/loan", multer, addLoanType)
router.delete("/loan/:id", deleteLoanType)

router.patch("/socialMedia", updateVisibility)

module.exports = router;
