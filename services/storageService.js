const admin = require("firebase-admin");
const {STORAGE} = require("../constants/const");

function getStorageBucket() {
    return admin.storage().bucket(STORAGE.BUCKET_NAME);
}

async function isFileExist(path, fileName) {

    const bucket = await getStorageBucket();
    const fileObject = bucket.file(`${path}${fileName}`)
    const isExist = await fileObject.exists();
    if (isExist[0]){
        return true
    }
    return undefined;
}
module.exports = {

    addFile:async (path, fileName, file)=>{

        const bucket = await getStorageBucket();
        const fileObject = await bucket.file(`${path}${fileName}`);
        await fileObject.save(file.buffer, {
            contentType: file.mimetype,
        });
    },

    deleteFile:async (path, fileName)=>{

        const bucket = await getStorageBucket();
        const fileObject = await bucket.file(`${path}${fileName}`);
        if (await isFileExist(path, fileName)){
            await fileObject.delete();
        }
        else {throw new Error("File not found")}
    },

    getFile:async (path,fileName)=>{

        const bucket = await getStorageBucket();
        const fileObject = await bucket.file(`${path}${fileName}`);
        if (await isFileExist(path,fileName)){
            return (await fileObject.getSignedUrl({
                version: 'v4',
                action: 'read',
                expires: Date.now() + 604800, // 15 minutes
            }))[0];
        }
    },

}