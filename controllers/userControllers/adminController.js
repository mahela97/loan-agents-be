const Joi = require("joi");
const {commonError} = require("../../utils/commonErrorhandler");
const {error} = require("firebase-functions/logger");
const {registerAdmin} = require("../../services/userServices/adminService");
module.exports = {

    register:async(req,res)=>{

        const schema = Joi.object({
            firstName: Joi.string().required(),
            lastName: Joi.string().required(),
            email: Joi.string().email().required(),
            password: Joi.string().required()
        })

        const validate = schema.validate(req.body);

        if (validate.error){
            res.status(400).send({message: validate.error.details});
            return;
        }

        const data = validate.value;

        try{
            const uid = await registerAdmin(data);
            res.status(201).send({success:1, uid})
        }catch (e){
            commonError(e, res)
        }
    }
}
