const {getUserByUid} = require("./userServices/userService");
const {
    saveMessageToDB, getChatListFromDB, getConversationIdByUid, createConversation, getConversationIdsForUid,
    getOtherParticipant, getLastMessageByConversationId, getConversationById
} = require("../repositories/messageRepositories/messageRepository");
const knex = require("../db/db-config");
module.exports = {
    sendMessage: async ({sender, receiver, message}) => {
        const isSenderExist = await getUserByUid(sender);
        if (!isSenderExist) {
            throw new Error("Sender does not exist in the system")
        }

        const isReceiverExist = await getUserByUid(receiver);
        if (!isReceiverExist) {
            throw  new Error("Receiver does not exist in the system")
        }

        const transaction = await knex.transaction();
        let conversationId = await getConversationIdByUid(sender, receiver)
        if (!conversationId) {
            conversationId = await createConversation(sender, receiver, transaction)
        }

        await saveMessageToDB(conversationId, sender, message, transaction);
        await transaction.commit();
    },

    getConversation: async (cid, uid) => {
        const conversation = {};
        const messages = await getConversationById(cid);
        const otherParticipantId = await getOtherParticipant(cid, uid);
        const otherParticipant = await getUserByUid(otherParticipantId)

        if (otherParticipant) {
            const {firstName, lastName, userId, profilePhoto} = otherParticipant
            conversation.otherParticipant = {firstName, lastName, userId, profilePhoto};
        }
        conversation.messages = messages;

        return conversation
    },

    getConversationList: async (uid) => {

        const conversationIds = await getConversationIdsForUid(uid);
        if (conversationIds.length === 0) {
            return conversationIds;
        }

        const conversations =  (await Promise.all(
            conversationIds.map((async ({conversationId}) => {
                const conversation = {};
                const otherParticipantId = await getOtherParticipant(conversationId, uid);
                const otherParticipant = await getUserByUid(otherParticipantId)

                if (otherParticipant) {
                    const {firstName, lastName, userId, profilePhoto} = otherParticipant
                    conversation.otherParticipant = {firstName, lastName, userId, profilePhoto};
                }

                const lastMessage = await getLastMessageByConversationId(conversationId);

                if (lastMessage) {
                    conversation.lastMessage = lastMessage;
                }
                conversation.conversationId = conversationId;
                return conversation

            }))
        )).filter(conversation => conversation.lastMessage);

        return conversations.sort(function(x, y){
                return y.lastMessage.createdAt - x.lastMessage.createdAt

        })

    }
}