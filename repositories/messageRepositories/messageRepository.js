const knex = require("../../db/db-config");
const {CHAT_TABLE, COMMON, CHAT_MEMBER_TABLE, MESSAGE_TABLE} = require("../../constants/const");
module.exports = {

    saveMessageToDB:async (receiverId, senderId, message, transaction)=>{
        await knex(MESSAGE_TABLE.NAME).insert({senderId,receiverId,message})
    },

    getChatRoomIdByUids: async (sender, receiver)=>{
        const result = await knex(CHAT_MEMBER_TABLE.NAME)
            .select(COMMON.SELECT_ALL)
            .where(CHAT_MEMBER_TABLE.USER_ID,sender)
            // .andWhere(CHAT_MEMBER_TABLE.ROOM_ID, knex(CHAT_MEMBER_TABLE.NAME)
            //     .select(CHAT_MEMBER_TABLE.ROOM_ID)
            //     .where(CHAT_MEMBER_TABLE.USER_ID,receiver))
            .andHaving

        console.log(result)
        await module.exports.createChatInDB()
    },

    createChatInDB: async (sender, receiver, transaction)=>{
        console.log("here")
    }

}