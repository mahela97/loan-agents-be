const {getAllLoans, addLoanType} = require("../controllers/publicControllers/loanController");

const multer  = require('multer')().single("image")
const router = require("express").Router();


//router.use(validateFirebaseIdToken);

router.get("/", getAllLoans)



module.exports = router;

