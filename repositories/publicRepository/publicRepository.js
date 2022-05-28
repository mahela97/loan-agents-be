const knex = require("../../db/db-config");
const {SITE_META_DATA_TABLE, COMMON, STORAGE} = require("../../constants/const");
const {getLanguages} = require("../../services/publicService");
const {commonError} = require("../../utils/commonErrorhandler");
const {getFile} = require("../../services/storageService");
module.exports = {
    getSiteMetaData:async(req,res)=>{
        try{

            const cover = await getFile(STORAGE.LOCATIONS.META_DATA, "cover")
            const logo = await getFile(STORAGE.LOCATIONS.META_DATA, "logo")
            const data = await knex(SITE_META_DATA_TABLE.NAME).select(COMMON.SELECT_ALL)
            data[0].cover = cover;
            data[0].logo = logo;
            res.status(200).send(data);
        }catch(error){
            commonError(error,res)
        }

    },

    getLanguages:async (req,res)=>{
        try{
            const languages = await getLanguages();
            res.status(200).send(languages)
        }catch(error){
            res.status(400).send(error)
        }
    },

    updateMetaData:async (data)=>{

        await knex(SITE_META_DATA_TABLE.NAME).update(data).where("id","1")
    }
}
