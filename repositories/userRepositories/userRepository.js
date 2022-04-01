const knex = require("../../db/db-config");
const {
    USER_TABLE,
    USER_SOCIAL_MEDIA_TABLE,
} = require("../../constants/const");

module.exports = {
    createDbUser: async (data, contactDetails) => {
        const transaction = await knex.transaction();
        await knex(USER_TABLE).transacting(transaction).insert(data);
        await knex(USER_SOCIAL_MEDIA_TABLE).transacting(transaction).insert(contactDetails);
        transaction.commit();

    },
};
