const Joi = require("joi");
const {commonError} = require("../../utils/commonErrorhandler");
const {error} = require("firebase-functions/logger");
const {registerAdmin, loginAdmin} = require("../../services/userServices/adminService");
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
    },

    login:async (req,res)=>{

        const schema = Joi.object({
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
            const token = await loginAdmin(data);
            if (!token){
                res.status(404).send({success:0,message:"User not found"})
                return;
            }
            res.status(201).send({success:1, token})
        }catch (e){
            commonError(e, res)
        }
    },

    getCurrentUser:async (req,res)=>[

        res.status(201).send(req.user)
    ]
}
