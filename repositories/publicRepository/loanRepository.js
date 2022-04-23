const knex = require("../../db/db-config");
const { COMMON, LOAN_TYPE_TABLE} = require("../../constants/const");

module.exports = {
    getAllLonsDB:async ()=>{
        return knex(LOAN_TYPE_TABLE.NAME).select(COMMON.SELECT_ALL);
    },

    addLoanTypeDB:async (data)=>{
        return knex(LOAN_TYPE_TABLE.NAME).insert(data, LOAN_TYPE_TABLE.LOAN_ID)
    }
}