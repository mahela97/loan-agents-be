const knex = require("../../db/db-config");
const {AGENT_DETAIL_TABLE, COMMON} = require("../../constants/const");
module.exports = {
    getAgentDetailsByUid:async (uid)=>{
        const agentDetails = await knex(AGENT_DETAIL_TABLE.NAME).select(COMMON.SELECT_ALL).
        where(AGENT_DETAIL_TABLE.USER_ID,uid);
        return agentDetails
    }
}