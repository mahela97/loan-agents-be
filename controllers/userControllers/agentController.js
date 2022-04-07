const Joi = require("joi");
module.exports = {
    getAgentDetails:async (req,res)=>{
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
            // const userDetails = await getUserDetails

        }catch(error){

        }
    }
}