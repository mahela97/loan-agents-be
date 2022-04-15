const knex = require("../../db/db-config");
const {CHAT_TABLE, COMMON, MESSAGE_TABLE, CONVERSATION_TABLE} = require("../../constants/const");
module.exports = {

    saveMessageToDB:async (conversationId, senderId, message, transaction)=>{
        await knex(MESSAGE_TABLE.NAME)
            .transacting(transaction)
            .insert({senderId,conversationId,message})
    },

    getConversationIdByUid: async (sender, receiver)=>{
        const result = await knex.raw(`SELECT "conversationId" FROM conversation WHERE "participantId" IN (?, ?) group by "conversationId" HAVING COUNT(*) = 2;`, [sender, receiver]);
        if (result.rows[0]){
            return result.rows[0][CONVERSATION_TABLE.CONVERSATION_ID]
        }
        return null;
    },

    createConversation:async (user1, user2, transaction) =>{

        const {conversationId} = (await knex(CONVERSATION_TABLE.NAME)
            .transacting(transaction)
            .insert({[CONVERSATION_TABLE.PARTICIPANT_ID]:user1}, CONVERSATION_TABLE.CONVERSATION_ID))[0];
        await knex(CONVERSATION_TABLE.NAME)
            .transacting(transaction)
            .insert({[CONVERSATION_TABLE.PARTICIPANT_ID]:user2, conversationId})

        return conversationId;
    },

    getConversationIdsForUid:async (uid) =>{

        return knex(CONVERSATION_TABLE.NAME)
            .select(CONVERSATION_TABLE.CONVERSATION_ID)
            .where(CONVERSATION_TABLE.PARTICIPANT_ID,uid)

    },

    getOtherParticipant:async (conversationId, uid)=>{

        return (await knex(CONVERSATION_TABLE.NAME)
            .select(CONVERSATION_TABLE.PARTICIPANT_ID)
            .where(CONVERSATION_TABLE.CONVERSATION_ID, conversationId)
             .whereNot(CONVERSATION_TABLE.PARTICIPANT_ID, uid))[0][CONVERSATION_TABLE.PARTICIPANT_ID]
    },

    getLastMessageByConversationId:async (conversationId) =>{

        return (await knex(MESSAGE_TABLE.NAME)
            .select([MESSAGE_TABLE.MESSAGE_ID, MESSAGE_TABLE.MESSAGE, MESSAGE_TABLE.CREATED_AT, MESSAGE_TABLE.SENDER_ID])
                .where(MESSAGE_TABLE.CONVERSATION_ID, conversationId)
                .orderBy(MESSAGE_TABLE.CREATED_AT, COMMON.ASC)
                .limit(1)

        )[0];
    },

    getConversationById:async (conversationId) =>{

       return (
           await knex(MESSAGE_TABLE.NAME)
               .select([MESSAGE_TABLE.MESSAGE_ID, MESSAGE_TABLE.MESSAGE, MESSAGE_TABLE.CREATED_AT, MESSAGE_TABLE.SENDER_ID])
               .where(MESSAGE_TABLE.CONVERSATION_ID, conversationId)
       )
    }

}
