const knex = require("../../db/db-config");
const {
    CONTACT_METHOD_TABLE,
    SELECT_ALL,
    USER_CONTACT_METHOD_TABLE,
    CONTACT_METHOD_PACKAGE_TABLE,
    COMMON
} = require("../../constants/const");

module.exports = {
    getDbAllSocialMedia: async () => {
        return knex(CONTACT_METHOD_TABLE.NAME).select(SELECT_ALL);
    },

    getSocialMediaByUid: async (uid) => {
        return knex(USER_CONTACT_METHOD_TABLE.NAME)
            .leftJoin(CONTACT_METHOD_TABLE.NAME, `${USER_CONTACT_METHOD_TABLE.NAME}.${USER_CONTACT_METHOD_TABLE.CONTACT_METHOD_ID}`,
                `${CONTACT_METHOD_TABLE.NAME}.${CONTACT_METHOD_TABLE.CONTACT_METHOD_ID}`)
            .select(`${USER_CONTACT_METHOD_TABLE.NAME}.${USER_CONTACT_METHOD_TABLE.CONTACT_METHOD_ID}`)
            .select(USER_CONTACT_METHOD_TABLE.VALUE)
            .where(USER_CONTACT_METHOD_TABLE.USER_ID, uid)
            .where(CONTACT_METHOD_TABLE.TYPE, CONTACT_METHOD_TABLE.values.SOCIAL);
    },

    getContactDetailsByUid: async (uid) => {
        return knex(USER_CONTACT_METHOD_TABLE.NAME)
            .leftJoin(CONTACT_METHOD_TABLE.NAME, `${USER_CONTACT_METHOD_TABLE.NAME}.${USER_CONTACT_METHOD_TABLE.CONTACT_METHOD_ID}`,
                `${CONTACT_METHOD_TABLE.NAME}.${CONTACT_METHOD_TABLE.CONTACT_METHOD_ID}`)
            .select(`${USER_CONTACT_METHOD_TABLE.NAME}.${USER_CONTACT_METHOD_TABLE.CONTACT_METHOD_ID}`)
            .select(USER_CONTACT_METHOD_TABLE.VALUE)
            .where(USER_CONTACT_METHOD_TABLE.USER_ID, uid)
            .where(CONTACT_METHOD_TABLE.TYPE, CONTACT_METHOD_TABLE.values.CONTACT);
    },

    getContactDetailsByNameUid: async (uid, field) => {

        return (await knex(USER_CONTACT_METHOD_TABLE.NAME)
                .select(USER_CONTACT_METHOD_TABLE.VALUE)
                .where(CONTACT_METHOD_TABLE.CONTACT_METHOD_ID, field)
                .where(USER_CONTACT_METHOD_TABLE.USER_ID, uid)
        )[0]
    },

    updatePackageSocialMedia: async (data) => {
        await knex(CONTACT_METHOD_PACKAGE_TABLE.NAME)
            .del().whereNot("visibility", null)
        await knex(CONTACT_METHOD_PACKAGE_TABLE.NAME).insert(data)
    },

    getVisibilityFromDb: async () => {

        return knex(CONTACT_METHOD_PACKAGE_TABLE.NAME)
            .select(COMMON.SELECT_ALL)
    }
    ,

    getPackageVisibility: async (plan) => {

        return knex(CONTACT_METHOD_PACKAGE_TABLE.NAME)
            .select(CONTACT_METHOD_PACKAGE_TABLE.CONTACT_METHOD)
            .where(CONTACT_METHOD_PACKAGE_TABLE.PACKAGE_NAME, plan)
            .where(CONTACT_METHOD_PACKAGE_TABLE.VISIBILITY, true)
    },

    getAllPackageVisibility: async (plan) => {

        return knex(CONTACT_METHOD_PACKAGE_TABLE.NAME)
            .select(CONTACT_METHOD_PACKAGE_TABLE.CONTACT_METHOD)
            .where(CONTACT_METHOD_PACKAGE_TABLE.PACKAGE_NAME, plan)
    }
}
