const admin = require("firebase-admin");

const validateFirebaseCustomToken = async (
    req,
    res ,
    next
) => {
    let idToken;
    req.user = null;
    if (
        req.headers.authorization &&
        req.headers.authorization.startsWith("Bearer ")
    ) {
        console.log('Found "Authorization" header');
        // Read the ID Token from the Authorization header.
        // eslint-disable-next-line prefer-destructuring
        idToken = req.headers.authorization.split("Bearer ")[1];
    }

    try {
        const decodedIdToken = await admin.auth().verifyIdToken(idToken);
        console.log("Successfully decoded");
        if (decodedIdToken) {
            req.user = decodedIdToken;
            next();
            return;
        }
        res.status(403).send("Forbidden");
    } catch (error) {
        console.error("Error while verifying Firebase ID token:", error);
    }
    next();
};

module.exports.validateFirebaseCustomToken = validateFirebaseCustomToken;
