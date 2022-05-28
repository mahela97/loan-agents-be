const { genSaltSync, hashSync, compareSync } = require("bcrypt");
const {saveAdmin} = require("../../repositories/userRepositories/adminRepository");

module.exports = {

    registerAdmin:async(data)=>{

        const salt = genSaltSync(10);
        data.password = hashSync(data.password, salt);
        const result = (await saveAdmin(data));
return result[0].uid

        console.log("done")
    }
}
