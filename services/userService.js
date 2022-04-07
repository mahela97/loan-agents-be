const {
    testCase,
    createDbUser, getDbUserById,
} = require("../repositories/userRepositories/userRepository");
const admin = require("firebase-admin");
const {
    SOCIAL_MEDIA_ID_PHONE,
    SOCIAL_MEDIA_ID_EMAIL, CONTACT_METHOD_EMAIL, CONTACT_METHOD_PHONE,
} = require("../constants/const");
module.exports = {
    testService: () => {
        console.log("here")
    },
    registerUser: async (data) => {
        const {email, phone,password} = data;
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
                contactMethodId: CONTACT_METHOD_EMAIL,

            }
        ];
        if (phone) {
            contactDetails.push(            {
                userId: user.uid,
                value: phone,
                contactMethodId: CONTACT_METHOD_PHONE,
            },)

        }
        delete data.phone;
        delete data.email;
        delete data.password;
        await createDbUser(data, contactDetails);
        return user.uid;
    }, getUserByUid: async (uid) => {
        return getDbUserById(uid);

    }
};
