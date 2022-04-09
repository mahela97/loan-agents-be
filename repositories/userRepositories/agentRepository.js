const knex = require("../../db/db-config");
const {AGENT_DETAIL_TABLE, COMMON} = require("../../constants/const");
module.exports = {
    getAgentDetailsByUid: async (uid) => {
        const agentDetails = await knex(AGENT_DETAIL_TABLE.NAME).select(COMMON.SELECT_ALL).where(AGENT_DETAIL_TABLE.USER_ID, uid);
        return agentDetails
    },

    updateAgentDetails: async (uid, details, transaction) => {
        if (transaction) {
            await knex(AGENT_DETAIL_TABLE.NAME).transacting(transaction).update(details).where(AGENT_DETAIL_TABLE.USER_ID, uid)
            return;
        }
        await knex(AGENT_DETAIL_TABLE.NAME).update(details).where(AGENT_DETAIL_TABLE.USER_ID, uid)

    }
}