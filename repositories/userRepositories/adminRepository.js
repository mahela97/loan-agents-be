const knex = require("../../db/db-config");
const {ADMIN_TABLE, COMMON} = require("../../constants/const");
module.exports = {

    saveAdmin:async(data)=>{

        return knex(ADMIN_TABLE.NAME).insert(data).returning("uid")
    },

    getAdminByEmail:async (email)=>{

        return knex(ADMIN_TABLE.NAME).select(COMMON.SELECT_ALL).where(ADMIN_TABLE.EMAIL, email)
    }
}
