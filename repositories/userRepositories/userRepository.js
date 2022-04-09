const knex = require("../../db/db-config");
const {
    USER_TABLE,
    USER_CONTACT_METHOD_TABLE, COMMON, AGENT_DETAIL_TABLE,
} = require("../../constants/const");



module.exports = {
    createDbUser: async (data, contactDetails) => {
        const transaction = await knex.transaction();
        await knex(USER_TABLE.NAME).transacting(transaction).insert(data);
        await knex(USER_CONTACT_METHOD_TABLE.NAME).transacting(transaction).insert(contactDetails);
        if (data.role === USER_TABLE.values.AGENT){
            await knex(AGENT_DETAIL_TABLE.NAME).transacting(transaction).insert({userId:data.userId})
        }
        transaction.commit();

    },

    getDbUserById:async(userId)=>{
        const user =await knex(USER_TABLE.NAME).select(COMMON.SELECT_ALL).where(USER_TABLE.USER_ID,userId).where(COMMON.ARCHIVED,false);
        return user;
    },

    updateUserDetailsById:async (userId,details,transaction)=>{
        await knex(USER_TABLE.NAME).transacting(transaction).update(details).where(USER_TABLE.USER_ID,userId);
    }
};
