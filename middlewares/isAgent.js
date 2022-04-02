const {getUserByUid} = require("../services/userService");

const isAgent = async (req ,
                         res ,
                         next ) => {
    if (!req.user){
        res.status(404).send({error:"User not found"})
        return;
    }
    const uid = req.user.uid;
        const user = await getUserByUid(uid.toString());
        console.log(user)
        if (user.role==="agent"){
            next();
        }else{
            res.status(403).send("Forbidden");
        }

        };
module.exports.isAgent =isAgent;