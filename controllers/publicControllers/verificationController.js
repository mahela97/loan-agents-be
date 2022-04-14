const {getCode, verifyCode} = require("../../services/publicService");
const Joi = require("joi");
const {getErrorObject} = require("../../utils/commonErrorhandler");

module.exports = {
    getCode: async (req, res) => {

        const schema = Joi.object({
            phonenumber: Joi.string().required(),
            channel: Joi.string().required()
        })
        const validate = schema.validate(req.query, {abortEarly: false});
        if (validate.error) {
            res.status(400).send({message: validate.error})
            return;
        }
        const {phonenumber, channel} = validate.value;
        try {
            await getCode(phonenumber, channel)
            res.status(200).send({success: 1})

        } catch (error) {
            const errorResponse = getErrorObject("Phone Number is not valid. Please try again", "phone")
            res.status(400).send(errorResponse)
        }
    },
    verifyCode: async (req, res) => {

        const schema = Joi.object({
            phonenumber: Joi.string().required(),
            code: Joi.string().required()
        })
        const validate = schema.validate(req.query, {abortEarly: false});
        if (validate.error) {
            res.status(400).send({message: validate.error})
            return;
        }
        const {phonenumber, code} = validate.value;
        try {
            await verifyCode(phonenumber, code)
            res.status(200).send({success: 1})

        } catch (error) {
            const errorResponse = getErrorObject("Verification code is invalid. Please try again", "otpCode")
            res.status(400).send(errorResponse)
        }
    }
}