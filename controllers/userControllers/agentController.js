const Joi = require("joi");
const {getAgentDetails, editAgentBasicDetails, addAgentIntroduction, addAgentEducation, updateAgentEducation,
    deleteAgentEducation
} = require("../../services/userServices/agentService");
const handleFirebase = require("../../utils/firebaseErrorhandler");
const { addContactDetailToUser} = require("../../services/userServices/userService");
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
            if (error.message) res.status(400).send(error.message);
            else if (error) res.status(400).send(error);
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
            await addContactDetailToUser(uid, body)
            res.status(201).send({success:1})
        } catch (error) {
            if (error.message) res.status(400).send(error.message);
            else if (error) res.status(400).send(error);
        }
    },

    addAgentContactDetail:async (req,res)=>{
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
            await addContactDetailToUser(uid, body)
            res.status(200).send({success:1})
        } catch (error) {
            if (error.message) res.status(400).send(error.message);
            else if (error) res.status(400).send(error);
        }
    },

    addAgentIntroduction:async (req,res)=>{

        const schema = Joi.object({
            introduction: Joi.string().required()
        })

        const validate = schema.validate(req.body);
        if (validate.error) {
            res.status(400).send({message: validate.error.details});
            return;
        }

        const pathSchema = Joi.object({
            uid: Joi.string().required()
        });
        const pathValidate = pathSchema.validate(req.params)
        if (pathValidate.error) {
            res.status(400).send({message: pathValidate.error.details})
            return;
        }
        const {introduction} = validate.value;
        const {uid} = pathValidate.value;

        try{
           const result = await addAgentIntroduction(uid,introduction);
           if (result){
               res.status(201).send({success:1});
           }
         else{
             res.status(404).send({success:0})
           }
        }catch (error){
            if (error.message) res.status(400).send(error.message);
            else if (error) res.status(400).send(error);
        }
    },

    addAgentEducation:async (req,res)=>{
        const schema = Joi.object({
            institutionName: Joi.string().required(),
            fieldOfStudy:Joi.string().required(),
            startDate:Joi.date().required(),
            endDate:Joi.date().required()
        })

        const validate = schema.validate(req.body, {abortEarly: false});
        if (validate.error) {
            res.status(400).send({message: validate.error.details});
            return;
        }

        const pathSchema = Joi.object({
            uid: Joi.string().required()
        });
        const pathValidate = pathSchema.validate(req.params)
        if (pathValidate.error) {
            res.status(400).send({message: pathValidate.error.details})
            return;
        }
        const educationDetails = validate.value;
        const {uid} = pathValidate.value;

        try{
            const result = await addAgentEducation(uid,educationDetails);
            if (result){
                res.status(201).send({success:1});
            }
            else{
                res.status(404).send({success:0})
            }
        }catch (error){
            if (error.message) res.status(400).send(error.message);
            else if (error) res.status(400).send(error);
        }
    },

    updateAgentEducation:async (req,res)=>{

        const schema = Joi.object({
            institutionName: Joi.string().allow(""),
            fieldOfStudy:Joi.string().allow(""),
            startDate:Joi.date().required(),
            endDate:Joi.date().allow(null).default(null)
        })

        const validate = schema.validate(req.body, {abortEarly: false});
        if (validate.error) {
            res.status(400).send({message: validate.error.details});
            return;
        }

        const pathSchema = Joi.object({
            uid: Joi.string().required(),
            eid: Joi.string().required()
        });
        const pathValidate = pathSchema.validate(req.params)
        if (pathValidate.error) {
            res.status(400).send({message: pathValidate.error.details})
            return;
        }
        const educationDetails = validate.value;
        const {eid} = pathValidate.value;

        try{
            const result = await updateAgentEducation( eid, educationDetails);
            if (result){
                res.status(201).send({success:1});
            }
            else{
                res.status(404).send({success:0})
            }
        }catch (error){
            if (error.message) res.status(400).send(error.message);
            else if (error) res.status(400).send(error);
        }
    },

    deleteAgentEducation:async (req,res)=>{

        const pathSchema = Joi.object({
            uid: Joi.string().required(),
            eid: Joi.string().required()
        });
        const pathValidate = pathSchema.validate(req.params)
        if (pathValidate.error) {
            res.status(400).send({message: pathValidate.error.details})
            return;
        }
        const { eid} = pathValidate.value;

        try{
            const result = await deleteAgentEducation(eid);
            if (result){
                res.status(201).send({success:1});
            }
            else{
                res.status(404).send({success:0})
            }
        }catch (error){
            if (error.message) res.status(400).send(error.message);
            else if (error) res.status(400).send(error);
        }
    }
}
