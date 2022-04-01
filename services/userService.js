const {
    testCase,
    createDbUser,
} = require("../repositories/userRepositories/userRepository");
const admin = require("firebase-admin");
const moment = require("moment");
const {
    SOCIAL_MEDIA_ID_PHONE,
    SOCIAL_MEDIA_ID_EMAIL,
} = require("../constants/const");
module.exports = {
    testService: () => {
        testCase();
    },
    registerUser: async (data) => {
        const {email, phone} = data;
        const user = await admin.auth().createUser({
            email,
            phoneNumber: phone,
            emailVerified: false,
        });
        data.userId = user.uid;
        const contactDetails = [
            {
                userId: null,
                value: phone,
                social_media_id: SOCIAL_MEDIA_ID_PHONE,
            },
            {
                userId: null,
                value: email,
                social_media_id: SOCIAL_MEDIA_ID_EMAIL,

            },
        ];
        delete data.phone;
        delete data.email;
        await createDbUser(data, contactDetails);
        return user.uid;
    },
};
