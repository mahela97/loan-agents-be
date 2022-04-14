const Joi = require("joi");
const {commonError} = require("../../utils/commonErrorhandler");
const {sendMessage, getMessageList} = require("../../services/messageService");
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
    },

    getChatList:async (req,res)=>{
        const schema = Joi.object({
            user1: Joi.string().required(),
            user2: Joi.string().required(),
        })

        const validate = schema.validate(req.query, {abortEarly:false})
        if (validate.error) {
            res.status(400).send({message: validate.error.details});
            return;
        }

        const users = validate.value;

        try{
            const messages = await getMessageList(users);
            res.status(201).send({success:1, messages})
        }catch(error){
            commonError(error,res)
        }
    }
}
