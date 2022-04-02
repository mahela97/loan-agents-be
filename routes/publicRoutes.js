const {getSiteMetaData} = require("../repositories/publicRepository/publicRepository");
const router = require("express").Router();

router.get("/getSiteMetaData",getSiteMetaData );

module.exports = router;