const knex = require("../../db/db-config");
const {SITE_META_DATA_TABLE, COMMON} = require("../../constants/const");
const {getLanguages} = require("../../services/publicService");
module.exports = {
    getSiteMetaData:async(req,res)=>{
        res.status(200).send( await knex(SITE_META_DATA_TABLE.NAME).select(COMMON.SELECT_ALL));
    },

    getLanguages:async (req,res)=>{
        try{
            const languages = await getLanguages();
            res.status(200).send(languages)
        }catch(error){
            res.status(400).send(error)
        }
    }
}