const knex = require("../../db/db-config");
const {AGENT_DETAIL_TABLE, COMMON, AGENT_LANGUAGE_TABLE, USER_TABLE, AGENT_LOAN_TYPE_TABLE} = require("../../constants/const");
module.exports = {
    getAgentDetailsByUid: async (uid) => {
        return knex(AGENT_DETAIL_TABLE.NAME).select(COMMON.SELECT_ALL).where(AGENT_DETAIL_TABLE.USER_ID, uid)
    },

    getAgentField: async (uid, fields) =>{

       return (await knex(AGENT_DETAIL_TABLE.NAME).select(...fields).where(AGENT_DETAIL_TABLE.USER_ID, uid))[0];

    },

    updateAgentDetails: async (uid, details, transaction) => {
        if (transaction) {
            return knex(AGENT_DETAIL_TABLE.NAME).transacting(transaction).update(details).where(AGENT_DETAIL_TABLE.USER_ID, uid)

        }
        return knex(AGENT_DETAIL_TABLE.NAME).update(details).where(AGENT_DETAIL_TABLE.USER_ID, uid)
    },

    getAgentsByLoanTypesDB:async (loanTypes) =>{

        return knex(AGENT_LOAN_TYPE_TABLE.NAME)
            .select(AGENT_LOAN_TYPE_TABLE.USER_ID)
            .whereIn(AGENT_LOAN_TYPE_TABLE.LOAN_ID, loanTypes)

    }

}