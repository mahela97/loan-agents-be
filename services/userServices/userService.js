const {
    createDbUser, getDbUserById, addUserContactMethodsToDB,
} = require("../../repositories/userRepositories/userRepository");
const admin = require("firebase-admin");
const {
    CONTACT_METHOD_TABLE, STORAGE, USER_TABLE,
} = require("../../constants/const");
const {getLanguagesByUid, addLanguagesToDBUser, deleteLanguagesByUid} = require("../../repositories/publicRepository/languageRepository");
const knex = require("../../db/db-config");
const {getFile} = require("../storageService");
const { getAuth ,signInWithCustomToken, sendEmailVerification, signOut} = require("firebase/auth");
const {initializeApp} = require("firebase/app");
const stripe = require("../../constants/stripeConfig");
const {createPaymentCustomer} = require("../paymentService");


module.exports = {
    testService:async () => {
    },
    registerUser: async (data) => {
        const firebaseConfig = {
            apiKey: 'AIzaSyDCRnEuLjAidNPWe9y4xcdIo3C6laAH3Kw',
            authDomain: 'loan-agents.firebaseapp.com',
            projectId: 'loan-agents',
            storageBucket: 'loan-agents.appspot.com',
            messagingSenderId: '952165638578',
            appId: '1:952165638578:web:d16e6e819a0288c07184ab'
        };

        const app = initializeApp(firebaseConfig);
        const auth = getAuth(app);
        const {email, phone, password} = data;
        const user = await admin.auth().createUser({
            email,
            emailVerified: false,
            password
        });
        const userToken = await admin.auth().createCustomToken(user.uid);
        const firebaseUser = await signInWithCustomToken(auth,userToken);
        await sendEmailVerification(firebaseUser.user);
        await signOut(auth);
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
        let customerId;
        if (data.role === USER_TABLE.values.AGENT){

            customerId = await createPaymentCustomer(data.email, data.firstName, data.lastName);
        }

        delete data.phone;
        delete data.email;
        delete data.password;
        const transaction = await knex.transaction();


        await createDbUser(data, contactDetails, customerId, transaction);
        return user.uid;
    },

    getUserByUid: async (uid) => {
        const result = await getDbUserById(uid);
        if (!result){
            return null;
        }
        const profilePhoto = await getFile(STORAGE.LOCATIONS.USERS,uid);
        if (profilePhoto) {
            result.profilePhoto = profilePhoto
        }
        return result

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

