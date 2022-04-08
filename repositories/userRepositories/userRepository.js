const knex = require("../../db/db-config");
const {
    USER_TABLE,
    USER_CONTACT_METHOD_TABLE, COMMON,
} = require("../../constants/const");

module.exports = {
    createDbUser: async (data, contactDetails) => {
        const transaction = await knex.transaction();
        await knex(USER_TABLE.NAME).transacting(transaction).insert(data);
        await knex(USER_CONTACT_METHOD_TABLE.NAME).transacting(transaction).insert(contactDetails);
        transaction.commit();

    },getDbUserById:async(userId)=>{
        const user = knex(USER_TABLE.NAME).select(COMMON.SELECT_ALL).where(USER_TABLE.USER_ID,userId).where(COMMON.ARCHIVED,false);
        return user;
    }
};
