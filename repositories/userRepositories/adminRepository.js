const knex = require("../../db/db-config");
const {ADMIN_TABLE} = require("../../constants/const");
module.exports = {

    saveAdmin:async(data)=>{

        return knex(ADMIN_TABLE.NAME).insert(data).returning("uid")
    }
}
