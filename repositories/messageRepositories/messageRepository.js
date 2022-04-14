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
            return result.rows[0][CONVERSATION_TABLE.NAME]
        }
        return null;
    },

    getChatListFromDB: async (user1, user2 )=>{
        const result = await knex(MESSAGE_TABLE.NAME)
            .select(COMMON.SELECT_ALL)
            .where(MESSAGE_TABLE.SENDER_ID, user1)
            .andWhere(MESSAGE_TABLE.RECEIVER_ID, user2)
            .orWhere(MESSAGE_TABLE.SENDER_ID, user2)
            .andWhere(MESSAGE_TABLE.RECEIVER_ID, user1)

        console.log(result)
    },

    createConversation:async (user1, user2, transaction) =>{

        const {conversationId} = (await knex(CONVERSATION_TABLE.NAME)
            .transacting(transaction)
            .insert({[CONVERSATION_TABLE.PARTICIPANT_ID]:user1}, CONVERSATION_TABLE.CONVERSATION_ID))[0];
        await knex(CONVERSATION_TABLE.NAME)
            .transacting(transaction)
            .insert({[CONVERSATION_TABLE.PARTICIPANT_ID]:user2, conversationId})

        return conversationId;
    }

}