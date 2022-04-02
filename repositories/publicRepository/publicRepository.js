const knex = require("../../db/db-config");
const {SITE_META_DATA_TABLE} = require("../../constants/const");
module.exports = {
    getSiteMetaData:async(req,res)=>{
        const result = await knex(SITE_META_DATA_TABLE).select("*");
        res.status(200).send(result[0] );
    }
}
