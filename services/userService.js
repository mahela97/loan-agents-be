const {
    createDbUser, getDbUserById, addUserContactMethodsToDB,
} = require("../repositories/userRepositories/userRepository");
const admin = require("firebase-admin");
const {
    CONTACT_METHOD_TABLE,
} = require("../constants/const");
const {getLanguagesByUid, addLanguagesToDBUser, deleteLanguagesByUid} = require("../repositories/publicRepository/languageRepository");
const knex = require("../db/db-config");
module.exports = {
    testService: () => {
        console.log("here")
    },
    registerUser: async (data) => {
        const {email, phone, password} = data;
        const user = await admin.auth().createUser({
            email,
            emailVerified: false,
            password
        });
        data.userId = user.uid;
        const contactDetails = [
            {
                userId: user.uid,
                value: email,
                contactMethodId: CONTACT_METHOD_TABLE.values.CONTACT_METHOD_EMAIL,

            }
        ];
        if (phone) {
            contactDetails.push({
                userId: user.uid,
                value: phone,
                contactMethodId: CONTACT_METHOD_TABLE.values.CONTACT_METHOD_PHONE,
            },)

        }
        delete data.phone;
        delete data.email;
        delete data.password;
        await createDbUser(data, contactDetails);
        return user.uid;
    },

    getUserByUid: async (uid) => {
        return getDbUserById(uid);

    },

    addContactDetailToUser: async (uid, details) => {
        const contactDetails = [];
        Object.keys(details).forEach(contactDetail => {
            contactDetails.push({
                contactMethodId: contactDetail.toUpperCase()
                , userId: uid, value: details[contactDetail]
            })
        })

        await addUserContactMethodsToDB(uid, contactDetails)
    },

    addLanguagesToUser:async (uid,languages) =>{
        const dbLanguages = languages.map(language=>{
            return {userId:uid,languageId:language}});
        const transaction = await knex.transaction();
        await deleteLanguagesByUid(uid, transaction);
        if (dbLanguages.length>0) {
            await addLanguagesToDBUser(dbLanguages, transaction)
        }
        await transaction.commit();
    }


};

