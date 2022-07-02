const {getAllLanguages} = require("../repositories/publicRepository/languageRepository");
const client = require('twilio')(process.env.ACCOUNT_SID, process.env.AUTH_TOKEN);

module.exports = {
    getCode: async (phonenumber, channel) => {
        await client
            .verify
            .services(process.env.VERIFY_SERVICE_SID)
            .verifications
            .create({
                to: `+${phonenumber}`,
                channel: channel
            })
    },

    verifyCode: async (phonenumber, code) => {
        return client
            .verify
            .services(process.env.VERIFY_SERVICE_SID)
            .verificationChecks
            .create({
                to: `+${phonenumber}`,
                code: code
            })
    },

    getLanguages:async ()=>{
        return getAllLanguages();
    }

}
