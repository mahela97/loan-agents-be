const {getAdminByEmail} = require("../repositories/userRepositories/adminRepository");
const {verify} = require("jsonwebtoken");

module.exports = {
    isAdmin: async (req, res, next) => {
        let token = req.get("authorization");
        if (token) {
            token = token.slice(7);
            verify(token, "qwe1234", async (err, decoded) => {
                if (err) {
                    res.json({
                        success: 0,
                        message: err.message,
                    });
                } else {
                    const email = decoded.user.email;
                    const user = (await getAdminByEmail(email))[0];
                    if (!user){
                        res.status(404).send("User not found")
                    }
                    user.password = undefined;
                    req.user = user;
                    next();
                }
            });
        } else {
            res.json({
                success: 0,
                message: "Access denied ! No token",
            });
        }
    },
}

