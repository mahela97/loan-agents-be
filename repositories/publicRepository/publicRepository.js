const knex = require("../../db/db-config");
const {SITE_META_DATA_TABLE, COMMON} = require("../../constants/const");
module.exports = {
    getSiteMetaData:async(req,res)=>{
        res.status(200).send( await knex(SITE_META_DATA_TABLE.NAME).select(COMMON.SELECT_ALL));
    }
}