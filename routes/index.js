const express = require('express');
const router = express.Router();

router.use("/public",require("./publicRoutes"))
router.use('/user', require('./user'));
router.use("/socialMedia",require("./socialMedia"))

module.exports = router;