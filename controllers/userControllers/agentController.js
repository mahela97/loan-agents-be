const Joi = require("joi");
const {getAgentDetails, editAgentBasicDetails} = require("../../services/agentService");
const handleFirebase = require("../../utils/firebaseErrorhandler");
const {addSocialMediaToUser} = require("../../services/userService");
module.exports = {
    getAgent: async (req, res) => {
        const schema = Joi.object({
            uid: Joi.string().required()
        })

        const validate = schema.validate(req.query)
        if (validate.error) {
            res.status(400).send(validate.error.message)
            return
        }
        const {uid} = validate.value
        try {
            const agentDetails = await getAgentDetails(uid);
            if (!agentDetails) {
                res.status(404).send("User not found");
                return;
            }
            res.status(201).send(agentDetails)

        } catch (error) {
            console.log(error)
            res.status(401).send(error)
        }
    },

    editAgentDetails: async (req, res) => {
        const schema = Joi.object({
            firstName: Joi.string().required(),
            lastName: Joi.string().required(),
            statement: Joi.string().required(),
            location: Joi.string().required(),
        })

        const pathSchema = Joi.object({
            uid: Joi.string().required()
        });
        const validate = schema.validate(req.body, {abortEarly: false});
        if (validate.error) {
            res.status(400).send({message: validate.error.details});
            return;
        }

        const pathValidate = pathSchema.validate(req.params, {abortEarly: false})
        if (pathValidate.error) {
            res.status(400).send({message: pathValidate.error.details})
            return;
        }
        const body = validate.value;
        const {uid} = pathValidate.value
        try {
            await editAgentBasicDetails(uid, body);
            res.status(200).send({success: 1});
        } catch (error) {
            if (error.message) res.status(400).send(error.message);
            else if (error) res.status(400).send(error);
        }
    },

    addAgentSocialMedia: async (req, res) => {
        const schema = Joi.object().required();
        const validate = schema.validate(req.body);
        if (validate.error) {
            res.status(400).send({message: validate.error.details});
            return;
        }

        const pathSchema = Joi.object({
            uid: Joi.string().required()
        });
        const pathValidate = pathSchema.validate(req.params, {abortEarly: false})
        if (pathValidate.error) {
            res.status(400).send({message: pathValidate.error.details})
            return;
        }

        const body = validate.value;
        const {uid} = pathValidate.value;

        try {
            await addSocialMediaToUser(uid, body)
            res.status(200).send({success:1})
        } catch (error) {
            if (error.message) res.status(400).send(error.message);
            else if (error) res.status(400).send(error);
        }
    }
}