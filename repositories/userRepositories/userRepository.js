const knex = require("../../db/db-config");
const {
    USER_TABLE,
    USER_CONTACT_METHOD_TABLE, COMMON, AGENT_DETAIL_TABLE, CONTACT_METHOD_TABLE, AGENT_LANGUAGE_TABLE, LANGUAGE_TABLE,
    FAVOURITE_AGENT_TABLE,
} = require("../../constants/const");



module.exports = {
    createDbUser: async (data, contactDetails, customerId, transaction) => {

        await knex(USER_TABLE.NAME).transacting(transaction).insert(data);
        await knex(USER_CONTACT_METHOD_TABLE.NAME).transacting(transaction).insert(contactDetails);
        if (data.role === USER_TABLE.values.AGENT){
            await knex(AGENT_DETAIL_TABLE.NAME).transacting(transaction).insert({userId:data.userId, customerId})
        }
        transaction.commit();

    },

    getDbUserById:async(userId)=>{
        return (await knex(USER_TABLE.NAME).select(COMMON.SELECT_ALL).where(USER_TABLE.USER_ID, userId).where(COMMON.ARCHIVED, false))[0];
    },

    updateUserDetailsById:async (userId,details,transaction)=>{
        await knex(USER_TABLE.NAME).transacting(transaction).update(details).where(USER_TABLE.USER_ID,userId);
    },

    addUserContactMethodsToDB:async (uid, contactDetails)=>{
        await knex(USER_CONTACT_METHOD_TABLE.NAME).insert(contactDetails).onConflict([
            USER_CONTACT_METHOD_TABLE.USER_ID,USER_CONTACT_METHOD_TABLE.CONTACT_METHOD_ID]).merge();
    },

    getUsersByLanguagesDB:async (languages, type) =>{

        return knex(AGENT_LANGUAGE_TABLE.NAME)
            .select(`${AGENT_LANGUAGE_TABLE.NAME}.${AGENT_LANGUAGE_TABLE.USER_ID}`)
            .leftJoin(USER_TABLE.NAME,`${USER_TABLE.NAME}.${USER_TABLE.USER_ID}`,
                `${AGENT_LANGUAGE_TABLE.NAME}.${AGENT_LANGUAGE_TABLE.USER_ID}` )
            .whereIn(AGENT_LANGUAGE_TABLE.LANGUAGE_ID, languages)
            .where(USER_TABLE.ROLE, type).distinct()
            .where(COMMON.ARCHIVED, false)
    },

    getAllUsersByType:async (type) =>{

        return knex(USER_TABLE.NAME)
            .select(USER_TABLE.USER_ID)
            .where(USER_TABLE.ROLE, type)
            .where(COMMON.ARCHIVED, false)
    },

    getUsersByFieldRole:async (field, fieldValue, role)=>{

        return knex(USER_TABLE.NAME)
            .select(USER_TABLE.USER_ID)
            .whereILike(field, `${fieldValue}%`)
            .where(USER_TABLE.ROLE, role)
            .where(COMMON.ARCHIVED, false)
    },

    getUsersByQuery:async (query)=>{

        return knex(USER_TABLE.NAME)
            .select(USER_TABLE.USER_ID)
            .orWhereILike(USER_TABLE.FIRST_NAME, `${query}%`)
            .orWhereILike(USER_TABLE.LAST_NAME, `${query}%`)
            .orWhereILike(USER_TABLE.CITY, `${query}%`)
            .orWhereILike(USER_TABLE.COUNTRY, `${query}%`)
            .orWhereILike(USER_TABLE.POSTAL_CODE, `${query}%`)
            .orWhereILike(USER_TABLE.FIRST_NAME, `${query}%`)
            .where(COMMON.ARCHIVED, false)


    },

    getUserFieldsUid:async (uid, fields)=>{

        return (await knex(USER_TABLE.NAME)
            .select(...fields)
            .where(USER_TABLE.USER_ID, uid))[0]
    },

    deleteUserFromDb:async(uid)=>{

        await knex(USER_TABLE.NAME)
            .update({archived: true})
            .where(USER_TABLE.USER_ID, uid)
    },

    addFavourite:async (uid,agentId)=>{

        await knex(FAVOURITE_AGENT_TABLE.NAME)
            .insert({uid,agentId});
    },

    deleteFavourite:async (uid, agentId)=>{

        await knex(FAVOURITE_AGENT_TABLE.NAME)
            .delete()
            .where("uid",uid)
            .where("agentId",agentId)
    },

    getFavourites:async (uid)=>{
        return knex(FAVOURITE_AGENT_TABLE.NAME)
            .select("agentId")
            .where("uid",uid)
    }
};
