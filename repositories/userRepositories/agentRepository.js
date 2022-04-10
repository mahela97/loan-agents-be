const knex = require("../../db/db-config");
const {AGENT_DETAIL_TABLE, COMMON} = require("../../constants/const");
module.exports = {
    getAgentDetailsByUid: async (uid) => {
        return knex(AGENT_DETAIL_TABLE.NAME).select(COMMON.SELECT_ALL).where(AGENT_DETAIL_TABLE.USER_ID, uid)
    },

    updateAgentDetails: async (uid, details, transaction) => {
        if (transaction) {
            return knex(AGENT_DETAIL_TABLE.NAME).transacting(transaction).update(details).where(AGENT_DETAIL_TABLE.USER_ID, uid)

        }
        return knex(AGENT_DETAIL_TABLE.NAME).update(details).where(AGENT_DETAIL_TABLE.USER_ID, uid)
    }
}