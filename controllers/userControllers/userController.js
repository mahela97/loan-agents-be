const {testService, registerUser, addLanguagesToUser} = require("../../services/userService");
const Joi = require("joi");
const {string} = require("joi");
const handleFirebase = require("../../utils/firebaseErrorhandler");
module.exports = {
    test: (req, res) => {
        console.log("here");
        testService();
    },
    registerUser: async (req, res) => {
        const schema = Joi.object({
            firstName: Joi.string().required(),
            lastName: Joi.string().required(),
            referredBy: Joi.string().allow(""),
            role: Joi.string().required(),
            password: Joi.string().required().min(6),
            location: Joi.string().required(),
            longitude: Joi.string().required(),
            latitude: Joi.string().required(),
            email: Joi.string().email().required(),
            phone: Joi.string().required(),
        });
        const validate = schema.validate(req.body, {abortEarly: false});
        if (validate.error) {
            res.status(400).send({message: validate.error.details});
            return;
        }
        const body = validate.value;
        try {
            const result = await registerUser(body);
            res.status(201).send({success: 1, data: {userId: result}});
        } catch (error) {
            if (error.errorInfo) {
                const message = handleFirebase(error);
                res.status(400).send(message);
            } else if (error.message) res.status(400).send(error.message);
            else if (error) res.status(400).send(error);
        }
    },

    addUserLanguage:async (req,res)=>{
        const schema = Joi.array().required();
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
            await addLanguagesToUser(uid,body);
            res.status(201).send({success: 1});
        } catch (error) {
            console.log(error)
            if (error.message) res.status(400).send(error.message);
            else if (error) res.status(400).send(error);
        }

    }
};
