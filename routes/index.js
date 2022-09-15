const express = require('express');
const {test} = require("../controllers/stripe");
const router = express.Router();

router.post("/test", test)

router.use("/public",require("./publicRoutes"))
router.use('/user', require('./userRoutes'));
router.use("/message", require("./messageRoutes"))
router.use("/socialMedia",require("./socialMediaRoutes"))
router.use("/loan", require("./loanRoutes"))
router.use("/admin", require("./adminRoutes"))

module.exports = router;
