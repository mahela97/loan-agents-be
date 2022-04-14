const {getUserByUid} = require("./userServices/userService");
const {getChatRoomIdByUids, saveMessageToDB} = require("../repositories/messageRepositories/messageRepository");
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
        await saveMessageToDB(receiver,sender,message);


    }
}