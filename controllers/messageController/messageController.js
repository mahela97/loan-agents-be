const Joi = require("joi");
const {commonError} = require("../../utils/commonErrorhandler");
const {sendMessage} = require("../../services/messageService");
module.exports = {
    sendMessage:async (req,res)=>{
        const schema = Joi.object({
            sender: Joi.string().required(),
            receiver: Joi.string().required(),
            message: Joi.string().required()
        })

        const validate = schema.validate(req.body, {abortEarly:false})
        if (validate.error) {
            res.status(400).send({message: validate.error.details});
            return;
        }

        try{
            await sendMessage(validate.value);
            res.status(201).send({success:1})
        }catch(error){
            commonError(error,res)
        }
    }
}
