const Joi = require("joi");
const {commonError} = require("../../utils/commonErrorhandler");
const {error} = require("firebase-functions/logger");
const {registerAdmin, loginAdmin, updateMetaData, addLanguageService, deleteLanguageService,
    updateContactDetailVisibility, getVisibilities
} = require("../../services/userServices/adminService");
const {addFile} = require("../../services/storageService");
const {SITE_META_DATA_TABLE, STORAGE} = require("../../constants/const");
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
            res.status(400).send({success:0, message:e.message})
        }
    },

    getCurrentUser:async (req,res)=>{

        res.status(201).send(req.user)
},
    editMetadata:async (req,res) =>{

        const schema = Joi.object({
            mainTitle: Joi.string().allow(""),
            subTitle: Joi.string().allow("")
        })

        const validate = schema.validate(req.body)
        if (validate.error){
            res.status(400).send({message: validate.error.details});
            return;
        }

         const data = validate.value

        try{

            await updateMetaData(data);
            res.status(200).send({success:1})
        }catch(error){
            commonError(error, res)
        }
    },

    updateCover:async (req,res)=>{

        if (!req.file){
            res.status(404).send({message: "File not found"})
            return;
        }

        try{
            await addFile(STORAGE.LOCATIONS.META_DATA, "cover", req.file);
            res.status(200).send({success:1})
        }catch(error){

        }
    },

    updateLogo:async (req,res)=>{

        if (!req.file){
            res.status(404).send({message: "File not found"})
            return;
        }
        try{

            await addFile(STORAGE.LOCATIONS.META_DATA, "logo", req.file);
            res.status(200).send({success:1})
        }catch(error){
            commonError(error, res)
        }
    },

    addLanguage:async (req,res)=>{
        const schema = Joi.object({
            languageName:Joi.string().required()
        })

        const validate = schema.validate(req.body)
        if (validate.error){
            res.status(400).send({message: validate.error.details});
            return;
        }

        const {languageName} = validate.value

        try{

            await addLanguageService(languageName);
            res.status(201).send({success:1})
        }catch(error){
            commonError(error, res)
        }
    },

    deleteLanguage:async (req,res)=>{

        const schema = Joi.object({
            id:Joi.string().required()
        })

        const validate = schema.validate(req.params)
        if (validate.error){
            res.status(400).send({message: validate.error.details});
            return;
        }

        const {id} = validate.value

        try{

            await deleteLanguageService(id);
            res.status(201).send({success:1})
        }catch(error){
            commonError(error, res)
        }
    },

    updateVisibility:async(req,res)=>{

        const schema = Joi.object({
            FREE:{
                PHONE:Joi.bool().default(false),
                EMAIL:Joi.bool().default(false),
                WEB:Joi.bool().default(false),
                FAX:Joi.bool().default(false),
                SKYPE:Joi.bool().default(false),
                FACEBOOK:Joi.bool().default(false),
                LINKEDIN:Joi.bool().default(false),
                TWITTER:Joi.bool().default(false),
                DRIBBLE:Joi.bool().default(false),
                TWITCH:Joi.bool().default(false),
            },
            PAG:{
                PHONE:Joi.bool().default(false),
                EMAIL:Joi.bool().default(false),
                WEB:Joi.bool().default(false),
                FAX:Joi.bool().default(false),
                SKYPE:Joi.bool().default(false),
                FACEBOOK:Joi.bool().default(false),
                LINKEDIN:Joi.bool().default(false),
                TWITTER:Joi.bool().default(false),
                DRIBBLE:Joi.bool().default(false),
                TWITCH:Joi.bool().default(false),
            },
            PREMIUM:{
                PHONE:Joi.bool().default(false),
                EMAIL:Joi.bool().default(false),
                WEB:Joi.bool().default(false),
                FAX:Joi.bool().default(false),
                SKYPE:Joi.bool().default(false),
                FACEBOOK:Joi.bool().default(false),
                LINKEDIN:Joi.bool().default(false),
                TWITTER:Joi.bool().default(false),
                DRIBBLE:Joi.bool().default(false),
                TWITCH:Joi.bool().default(false),
            }
        })

        const validate = schema.validate(req.body)
        if (validate.error){
            res.status(400).send({message: validate.error.details});
            return;
        }

        const data = validate.value

        try{
            await updateContactDetailVisibility(data);
            res.status(201).send({success:1})
        }catch(error){
            commonError(error, res)
        }
    },

    getVisibilities:async (req,res)=>{
        try{
            const result = await getVisibilities();
            res.status(201).send(result)
        }catch(error){
            commonError(error, res)
        }
    }
}
