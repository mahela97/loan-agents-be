const {getSiteMetaData} = require("../repositories/publicRepository/publicRepository");
const router = require("express").Router();

router.get("/siteMetaData",getSiteMetaData );

module.exports = router;