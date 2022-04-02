const {
    testCase,
    createDbUser, getDbUserById,
} = require("../repositories/userRepositories/userRepository");
const admin = require("firebase-admin");
const {
    SOCIAL_MEDIA_ID_PHONE,
    SOCIAL_MEDIA_ID_EMAIL,
} = require("../constants/const");
module.exports = {
    testService: () => {
        console.log("here")
    },
    registerUser: async (data) => {
        const {email, phone,password} = data;
        const user = await admin.auth().createUser({
            email,
            phoneNumber: phone,
            emailVerified: false,
            password
        });
        data.userId = user.uid;
        const contactDetails = [

            {
                userId: user.uid,
                value: email,
                socialMediaId: SOCIAL_MEDIA_ID_EMAIL,

            }
        ];
        if (phone) {
            contactDetails.push(            {
                userId: user.uid,
                value: phone,
                socialMediaId: SOCIAL_MEDIA_ID_PHONE,
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
