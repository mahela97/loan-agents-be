const {testService, registerUser} = require("../../services/userService");
const Joi = require("joi");
const {string} = require("joi");
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
            password:Joi.string().required().min(6),
            location:Joi.string().required(),
            longitude: Joi.string().required(),
            latitude: Joi.string().required(),
            email: Joi.string().email().required(),
            phone: Joi.string(),
        });
        const validate = schema.validate(req.body,{abortEarly:false});
        if (validate.error) {
            res.status(400).send({message: validate.error.details});
            return;
        }
        const body = validate.value;
        try {
            const result = await registerUser(body);
            res.status(201).send({success: 1, data: {userId: result}});
        } catch (error) {
            if (error.message==="TOO_SHORT") res.status(400).send({message:[{message:"Invalid phone number",path:["phone"]}]})
            else if (error.errorInfo.code==="auth/email-already-exists") res.status(400).send({message:[{message:"User already exist.",path:["email"]}]})
            else if (error.message) res.status(400).send(error.message);
            else if (error) res.status(400).send(error);
        }
    },
};
