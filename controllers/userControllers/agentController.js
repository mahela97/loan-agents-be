const Joi = require("joi");
const {getAgentDetails} = require("../../services/agentService");
module.exports = {
    getAgent:async (req,res)=>{
        const schema = Joi.object({
            uid:Joi.string().required()
        })

        const validate = schema.validate(req.query)
        if(validate.error){
            res.status(400).send(validate.error.message)
            return
        }
        const {uid} = validate.value
        try{
            const agentDetails = await getAgentDetails(uid);
            if (!agentDetails) {
                res.status(404).send("User not found");
                return;
            }
            res.status(201).send(agentDetails)

        }catch(error){
            console.log(error)
            res.status(401).send(error)
        }
    },

    editAgentDetails:async (req,res)=>{
        const schema = Joi.object({
            
        })
    }
}