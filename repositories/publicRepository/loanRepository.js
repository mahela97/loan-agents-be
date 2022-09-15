const knex = require("../../db/db-config");
const {COMMON, LOAN_TYPE_TABLE, AGENT_LOAN_TYPE_TABLE} = require("../../constants/const");

module.exports = {
    getAllLonsDB: async () => {
        return knex(LOAN_TYPE_TABLE.NAME).select(COMMON.SELECT_ALL).where(COMMON.ARCHIVED, false);
    },

    getAgentLoanTypesByUid: async (uid) => {
        return knex(AGENT_LOAN_TYPE_TABLE.NAME)
            .select(LOAN_TYPE_TABLE.LOAN_NAME, `${LOAN_TYPE_TABLE.NAME}.${LOAN_TYPE_TABLE.LOAN_ID}`)
            .leftJoin(LOAN_TYPE_TABLE.NAME, `${LOAN_TYPE_TABLE.NAME}.${LOAN_TYPE_TABLE.LOAN_ID}`
                , `${AGENT_LOAN_TYPE_TABLE.NAME}.${AGENT_LOAN_TYPE_TABLE.LOAN_ID}`)
            .where(AGENT_LOAN_TYPE_TABLE.USER_ID, uid).where(COMMON.ARCHIVED, false)
    },

    addLoanTypeDB: async (data) => {
        return knex(LOAN_TYPE_TABLE.NAME).insert(data, LOAN_TYPE_TABLE.LOAN_ID)
    },

    addLoanTypesToDb: async (loans, transaction) => {
        if (transaction) {
            await knex(AGENT_LOAN_TYPE_TABLE.NAME).transacting(transaction).insert(loans);
            return;
        }
        await knex(LOAN_TYPE_TABLE.NAME).insert(loans);
    },

    deleteLoanTypeByUid: async (uid, transaction) => {
        if (transaction) {
            await knex(AGENT_LOAN_TYPE_TABLE.NAME)
                .transacting(transaction)
                .delete().where(AGENT_LOAN_TYPE_TABLE.USER_ID, uid)
            return;
        }
        await knex(AGENT_LOAN_TYPE_TABLE.NAME)
            .delete().where(AGENT_LOAN_TYPE_TABLE.USER_ID, uid)
    },

    isLoanTypeExist: async (loanName) => {
        return (await knex(LOAN_TYPE_TABLE.NAME).select(COMMON.SELECT_ALL).where(LOAN_TYPE_TABLE.LOAN_NAME, loanName))[0]
    },

    updateLoanTypeByLid: async (lid, details) =>{
        await knex(LOAN_TYPE_TABLE.NAME).update(details).where(LOAN_TYPE_TABLE.LOAN_ID,lid)
    }
}