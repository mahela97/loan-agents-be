const knex = require("../../db/db-config");
const {SOCIAL_MEDIA_TABLE} = require("../../constants/const");

module.exports = {
    getDbAllSocialMedia:async()=>{
        const result =await knex(SOCIAL_MEDIA_TABLE).select("*");
        console.log(result);
        return result;
    }
}