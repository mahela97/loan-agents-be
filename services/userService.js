const {
    createDbUser, getDbUserById,
} = require("../repositories/userRepositories/userRepository");
const admin = require("firebase-admin");
const {
      CONTACT_METHOD_TABLE,
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
                contactMethodId: CONTACT_METHOD_TABLE.values.CONTACT_METHOD_EMAIL,

            }
        ];
        if (phone) {
            contactDetails.push(            {
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
    }, getUserByUid: async (uid) => {
        return getDbUserById(uid);

    }
};
