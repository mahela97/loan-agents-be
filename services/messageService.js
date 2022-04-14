const {getUserByUid} = require("./userServices/userService");
const { saveMessageToDB, getChatListFromDB, getConversationIdByUid, createConversation} = require("../repositories/messageRepositories/messageRepository");
const knex = require("../db/db-config");
module.exports = {
    sendMessage:async ({sender, receiver, message})=>{
        const isSenderExist = await getUserByUid(sender);
        if (!isSenderExist){
            throw new Error("Sender does not exist in the system")
        }

        const isReceiverExist = await getUserByUid(receiver);
        if (!isReceiverExist){
            throw  new Error("Receiver does not exist in the system")
        }

        const transaction =await knex.transaction();
        let conversationId = await getConversationIdByUid(sender,receiver)
        if (!conversationId){
            conversationId = await createConversation(sender, receiver, transaction)
        }
        await saveMessageToDB(conversationId, sender, message, transaction);
        await transaction.commit();
    },

    getMessageList:async ({user1, user2})=>{

        await getChatListFromDB(user1, user2)
    }
}