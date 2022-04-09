const knex = require("../../db/db-config");
const { CONTACT_METHOD_TABLE, SELECT_ALL, USER_CONTACT_METHOD_TABLE} = require("../../constants/const");

module.exports = {
    getDbAllSocialMedia:async()=>{
        return knex(CONTACT_METHOD_TABLE.NAME).select(SELECT_ALL);
    },

    getSocialMediaByUid:async(uid)=>{
        return  knex(USER_CONTACT_METHOD_TABLE.NAME)
            .leftJoin(CONTACT_METHOD_TABLE.NAME, `${USER_CONTACT_METHOD_TABLE.NAME}.${USER_CONTACT_METHOD_TABLE.CONTACT_METHOD_ID}`,
                `${CONTACT_METHOD_TABLE.NAME}.${CONTACT_METHOD_TABLE.CONTACT_METHOD_ID}`)
            .select(`${USER_CONTACT_METHOD_TABLE.NAME}.${USER_CONTACT_METHOD_TABLE.CONTACT_METHOD_ID}`)
            .select(USER_CONTACT_METHOD_TABLE.VALUE)
            .where(USER_CONTACT_METHOD_TABLE.USER_ID, uid)
            .where(CONTACT_METHOD_TABLE.TYPE, CONTACT_METHOD_TABLE.values.SOCIAL);
    },

    getContactDetailsByUid:async(uid)=>{
        return  knex(USER_CONTACT_METHOD_TABLE.NAME)
            .leftJoin(CONTACT_METHOD_TABLE.NAME, `${USER_CONTACT_METHOD_TABLE.NAME}.${USER_CONTACT_METHOD_TABLE.CONTACT_METHOD_ID}`,
                `${CONTACT_METHOD_TABLE.NAME}.${CONTACT_METHOD_TABLE.CONTACT_METHOD_ID}`)
            .select(`${USER_CONTACT_METHOD_TABLE.NAME}.${USER_CONTACT_METHOD_TABLE.CONTACT_METHOD_ID}`)
            .select(USER_CONTACT_METHOD_TABLE.VALUE)
            .where(USER_CONTACT_METHOD_TABLE.USER_ID, uid)
            .where(CONTACT_METHOD_TABLE.TYPE, CONTACT_METHOD_TABLE.values.CONTACT);
    }
}