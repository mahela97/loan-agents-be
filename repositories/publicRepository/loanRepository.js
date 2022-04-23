const knex = require("../../db/db-config");
const { COMMON, LOAN_TYPE_TABLE} = require("../../constants/const");

module.exports = {
    getAllLonsDB:async ()=>{
        return knex(LOAN_TYPE_TABLE.NAME).select(COMMON.SELECT_ALL);
    },

    addLoanTypeDB:async (data)=>{
        return knex(LOAN_TYPE_TABLE.NAME).insert(data, LOAN_TYPE_TABLE.LOAN_ID)
    },

    addLoanTypToDBUser:async (loans,transaction)=>{
        if (transaction){
            await knex(LOAN_TYPE_TABLE.NAME).transacting(transaction).insert(loans);
            return;
        }
        await knex(LOAN_TYPE_TABLE.NAME).insert(loans);
    },

    deleteLoanTypeByUid:async (uid, transaction)=>{
        if (transaction){
            await knex(LOAN_TYPE_TABLE.NAME)
                .transacting(transaction)
                .delete().where(LOAN_TYPE_TABLE.USER_ID,uid)
            return;
        }
        await knex(LOAN_TYPE_TABLE.NAME)
            .delete().where(LOAN_TYPE_TABLE.USER_ID,uid)
    }
}