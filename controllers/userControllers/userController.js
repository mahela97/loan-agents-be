const {testService, registerUser, addLanguagesToUser, getUserByUid} = require("../../services/userServices/userService");
const Joi = require("joi");
const {string} = require("joi");
const handleFirebase = require("../../utils/firebaseErrorhandler");
const admin = require("firebase-admin");
const {addFile, deleteFile} = require("../../services/storageService");
const {STORAGE} = require("../../constants/const");
const {getAgentDetails} = require("../../services/userServices/agentService");
module.exports = {
    test:async (req, res) => {
        console.log(req.file)
        console.log("here");
        await testService();
    },
    registerUser: async (req, res) => {
        const schema = Joi.object({
            firstName: Joi.string().required(),
            lastName: Joi.string().required(),
            referredBy: Joi.string().allow(""),
            role: Joi.string().required(),
            password: Joi.string().required().min(6),
            city: Joi.string().required(),
            country:Joi.string().required(),
            postalCode: Joi.string().required(),
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
        let uid;
        try {
            const result = await registerUser(body);
            uid = result;
            res.status(201).send({success: 1, data: {userId: result}});
        } catch (error) {
            console.log(error)
            await admin.auth().deleteUser(uid);
            if (error.errorInfo) {
                const message = handleFirebase(error);
                res.status(400).send(message);
            } else if (error.message) res.status(400).send(error.message);
            else if (error) res.status(400).send(error);
        }
    },

    addUserLanguage:async (req,res)=>{
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
            await addLanguagesToUser(uid,body);
            res.status(201).send({success: 1});
        } catch (error) {

            if (error.message) res.status(400).send(error.message);
            else if (error) res.status(400).send(error);
        }

    },

    addUserProfilePicture:async (req,res)=>{
        const pathSchema = Joi.object({
            uid: Joi.string().required()
        });
        const pathValidate = pathSchema.validate(req.params, {abortEarly: false})
        if (pathValidate.error) {
            res.status(400).send({message: pathValidate.error.details})
            return;
        }
        if (!req.file){
            res.status(404).send({message: "File not found"})
            return;
        }

        const {uid} = pathValidate.value;

        try{
            await addFile(STORAGE.LOCATIONS.USERS,uid,req.file);
           res.status(201).send({success: 1})
        }catch(error){
            if (error.message) res.status(400).send(error.message);
            else if (error) res.status(400).send(error);
        }
    },

    deleteProfilePicture:async (req,res)=>{

        const pathSchema = Joi.object({
            uid: Joi.string().required()
        });
        const pathValidate = pathSchema.validate(req.params, {abortEarly: false})
        if (pathValidate.error) {
            res.status(400).send({message: pathValidate.error.details})
            return;
        }

        const {uid} = pathValidate.value;

        try{
            await deleteFile(STORAGE.LOCATIONS.USERS,uid);
            res.status(200).send({success: 1})
        }catch(error){
            if (error.message) res.status(400).send(error.message);
            else if (error) res.status(400).send(error);
        }
    },

    getUserDetails : async (req,res) =>{
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
            const userDetails = await getUserByUid(uid);
            if (!userDetails) {
                res.status(404).send("User not found");
                return;
            }
            res.status(201).send(userDetails)

        } catch (error) {
            res.status(401).send(error)
        }
    }
};
