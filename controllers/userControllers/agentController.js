const Joi = require("joi");
const {getAgentDetails, editAgentBasicDetails, addAgentIntroduction, addAgentEducation, updateAgentEducation,
    deleteAgentEducation, addAgentContactVia, addLoanTypeToAgent, getAllAgents
} = require("../../services/userServices/agentService");
const handleFirebase = require("../../utils/firebaseErrorhandler");
const { addContactDetailToUser, addLanguagesToUser} = require("../../services/userServices/userService");
const {commonError} = require("../../utils/commonErrorhandler");
const {createSubscriptionFoUser, getPortalSession, consumePAG} = require("../../services/paymentService");
const {PAYMENT_PLANS} = require("../../constants/const");
const {updateConversations} = require("../../services/messageService");

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
        let token = null;

        if (req.user && req.user.user_id){
            token = req.user.user_id
        }
        try {
            const agentDetails = await getAgentDetails(uid,token);
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
            city: Joi.string().required(),
            country: Joi.string().required(),
            postalCode: Joi.string().required()
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
    },

    addAgentContactVia:async (req,res)=>{
        const schema = Joi.object({
            viaMobile: Joi.boolean().required(),
            viaVideo: Joi.boolean().required(),
            mobileServices: Joi.boolean().required()
        })
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
            await addAgentContactVia(uid,body);
            res.status(201).send({success: 1});
        } catch (error) {

            if (error.message) res.status(400).send(error.message);
            else if (error) res.status(400).send(error);
        }

    },

    updateAgentLoanTypes:async (req,res) =>{

        const schema = Joi.array().items(Joi.string()).allow("");
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
            await addLoanTypeToAgent(uid,body);
            res.status(201).send({success: 1});
        } catch (error) {

            if (error.message) res.status(400).send(error.message);
            else if (error) res.status(400).send(error);
        }
    },

    getAllAgents:async (req, res)=>{

        const schema = Joi.object({
            city: Joi.string().allow("").default(""),
            country: Joi.string().allow("").default(""),
            postalCode: Joi.string().allow("").default(""),
            languages: Joi.array().items(Joi.string()).allow("").default([]),
            loanTypes: Joi.array().items(Joi.string()).allow("").default([]),
            status: Joi.string().allow("").default(""),
            sortBy: Joi.string().allow("").default(""),
            queryString: Joi.string().allow("").default(""),
            limit: Joi.number().default(-1),
            page: Joi.number().default(1),
            favourite: Joi.boolean().default(false)
            }
        );

        const validate = schema.validate(req.query)
        if (validate.error){
            res.status(400).send(validate.error.message)
            return
        }

        const filters = validate.value
        try{

           const agents = await getAllAgents(filters);

            const start = (filters.limit * filters.page) - filters.limit;
            let end = (filters.limit * filters.page);
            if (end > agents.length) {
                end = agents.length;
            }

            const total = agents.length;
            const numOfPages = Math.ceil(total / filters.limit);

            if (filters.limit === -1){
                res.status(200).send({total, numOfPages, agents: agents})
                return;
            }
           res.status(200).send({total, numOfPages, agents: agents.slice(start, end)})
        }catch(error){
            commonError(error,res)
        }
    },

    createAgentSubscription:async (req,res) =>{

        const schema = Joi.object({
            subscriptionType: Joi.string().required().valid(...[
                PAYMENT_PLANS.MONTHLY.NAME,
                PAYMENT_PLANS.YEARLY.NAME,
                PAYMENT_PLANS.PAY_AS_YOU_GO.NAME
            ]),
            cancel:Joi.string(),
            success:Joi.string(),
            uid:Joi.string()
        })

        const validate = schema.validate(req.query)
        if (validate.error) {
            res.status(400).send(validate.error.message)
            return
        }
        const { subscriptionType, cancel,success,uid} = validate.value

        try{

            const {url} = await createSubscriptionFoUser(uid, subscriptionType, success, cancel);
            res.status(200).send({success:1, url})
        }catch (error){
            commonError(error, res)
        }
    },

    getPaymentPortal:async (req, res)=>{

        const schema = Joi.object({
            url:Joi.string(),
            uid:Joi.string()
        })

        const validate = schema.validate(req.query)
        if (validate.error) {
            res.status(400).send(validate.error.message)
            return
        }
        const { url,uid} = validate.value

        try{

            const portalUrl =( await getPortalSession(uid, url)).url;
            res.status(200).send({success:1, url:portalUrl})
        }catch (error){
            commonError(error, res)
        }
    },

    makePayment:async (req,res)=>{
        const schema = Joi.object({
            conversationId: Joi.string().required(),
            uid: Joi.string().required()
        })

        const validate = schema.validate(req.body)
        if (validate.error) {
            res.status(400).send(validate.error.message)
            return
        }
        const { conversationId,uid} = validate.value

        try{

            await consumePAG(conversationId, uid)

            res.status(200).send({success:1})
        }catch (error){
            commonError(error, res)
        }

    },

    successSubscription:async (req,res)=>{

        const schema = Joi.object({
            uid: Joi.string().required()
        })

        const validate = schema.validate(req.body)
        if (validate.error) {
            res.status(400).send(validate.error.message)
            return
        }
        const { uid} = validate.value
        try{

            await updateConversations(uid);
            res.status(200).send({success:1 })
        }catch(error){
            commonError(error,res)
        }
    }
}
