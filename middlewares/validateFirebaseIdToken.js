const admin = require("firebase-admin");

const validateFirebaseIdToken = async (
    req,
    res ,
    next
) => {
    console.log("Check if request is authorized with Firebase ID token");

    if (
        (!req.headers.authorization ||
            !req.headers.authorization.startsWith("Bearer ")) &&
        !(req.cookies && req.cookies.__session)
    ) {
        console.error(
            "No Firebase ID token was passed as a Bearer token in the Authorization header.",
            "Make sure you authorize your request by providing the following HTTP header:",
            "Authorization: Bearer <Firebase ID Token>",
            'or by passing a "__session" cookie.'
        );
        res.status(401).send("Unauthorized");
        return;
    }

    let idToken;

    if (
        req.headers.authorization &&
        req.headers.authorization.startsWith("Bearer ")
    ) {
        console.log('Found "Authorization" header');
        // Read the ID Token from the Authorization header.
        // eslint-disable-next-line prefer-destructuring
        idToken = req.headers.authorization.split("Bearer ")[1];
    } else {
        // No cookie
        res.status(401).send("Unauthorized");
        return;
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
        res.status(401).send("Unauthorized");
    }
};

module.exports.validateFirebaseIdToken = validateFirebaseIdToken;