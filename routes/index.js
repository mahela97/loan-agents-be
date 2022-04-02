const express = require('express');
const validateFirebaseIdToken = require("../middlewares/validateFirebaseIdToken");
const router = express.Router();

router.use('/user', require('./user'));
router.use("/socialMedia",require("./socialMedia"))

module.exports = router;