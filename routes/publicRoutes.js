const {getSiteMetaData} = require("../repositories/publicRepository/publicRepository");
const {getCode,verifyCode} = require("../controllers/publicControllers/verificationController");
const router = require("express").Router();




router.get('/getcode', getCode);
router.get('/verifycode', verifyCode);
router.get("/siteMetaData",getSiteMetaData );

module.exports = router;