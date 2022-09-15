const knex = require("../../db/db-config");
const {USER_TABLE, COMMON, AGENT_LANGUAGE_TABLE, LANGUAGE_TABLE} = require("../../constants/const");
module.exports = {
    getLanguagesByUid:async (uid)=>{
        const userLanguages =await knex(AGENT_LANGUAGE_TABLE.NAME)
            .select(LANGUAGE_TABLE.LANGUAGE_NAME,`${LANGUAGE_TABLE.NAME}.${LANGUAGE_TABLE.LANGUAGE_ID}`)
            .leftJoin(LANGUAGE_TABLE.NAME,`${LANGUAGE_TABLE.NAME}.${LANGUAGE_TABLE.LANGUAGE_ID}`
            ,`${AGENT_LANGUAGE_TABLE.NAME}.${AGENT_LANGUAGE_TABLE.LANGUAGE_ID}`)
            .where(AGENT_LANGUAGE_TABLE.USER_ID,uid)

        return userLanguages;
    },

    getAllLanguages:async ()=>{
        return knex(LANGUAGE_TABLE.NAME).select(COMMON.SELECT_ALL)
    },


    addLanguagesToDBUser:async (languages,transaction)=>{
        if (transaction){
            await knex(AGENT_LANGUAGE_TABLE.NAME).transacting(transaction).insert(languages);
            return;
        }
        await knex(AGENT_LANGUAGE_TABLE.NAME).insert(languages);
    },

    deleteLanguagesByUid:async (uid, transaction)=>{
        if (transaction){
            await knex(AGENT_LANGUAGE_TABLE.NAME)
                .transacting(transaction)
                .delete().where(AGENT_LANGUAGE_TABLE.USER_ID,uid)
            return;
        }
        await knex(AGENT_LANGUAGE_TABLE.NAME)
            .delete().where(AGENT_LANGUAGE_TABLE.USER_ID,uid)
    },
}