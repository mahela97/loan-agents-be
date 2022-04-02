const {getSiteMetaData} = require("../repositories/publicRepository/publicRepository");
const router = require("express").Router();


const client = require('twilio')(process.env.ACCOUNT_SID, process.env.AUTH_TOKEN);

getCode = async (req, res) => {
    client
        .verify
        .services(process.env.VERIFY_SERVICE_SID)
        .verifications
        .create({
            to: `+${req.query.phonenumber}`,
            channel: req.query.channel
        })
        .then(data => {
            res.status(200).send(data);
        }).catch(e=>console.log(e))
};

verifyCode = async (req, res) => {
    client
        .verify
        .services(process.env.VERIFY_SERVICE_SID)
        .verificationChecks
        .create({
            to: `+${req.query.phonenumber}`,
            code: req.query.code
        })
        .then(data => {
            res.status(200).send(data);
        });
};

router.get('/getcode', getCode);
router.get('/verifycode', verifyCode);
router.get("/siteMetaData",getSiteMetaData );

module.exports = router;