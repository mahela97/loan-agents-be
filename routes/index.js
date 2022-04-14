const express = require('express');
const router = express.Router();

router.use("/public",require("./publicRoutes"))
router.use('/user', require('./userRoutes'));
router.use("/message", require("./messageRoutes"))
router.use("/socialMedia",require("./socialMediaRoutes"))

module.exports = router;