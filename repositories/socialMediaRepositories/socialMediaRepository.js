const knex = require("../../db/db-config");
const { CONTACT_METHOD_TABLE, SELECT_ALL} = require("../../constants/const");

module.exports = {
    getDbAllSocialMedia:async()=>{
        const result =await knex(CONTACT_METHOD_TABLE).select(SELECT_ALL);
        return result;
    }
}