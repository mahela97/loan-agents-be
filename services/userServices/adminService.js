const { genSaltSync, hashSync, compareSync } = require("bcrypt");
const {saveAdmin, getAdminByEmail} = require("../../repositories/userRepositories/adminRepository");
const { sign } = require("jsonwebtoken");
const {updateMetaData} = require("../../repositories/publicRepository/publicRepository");
const {getLanguageByName, addLanguageToDb, updateLanguage} = require("../../repositories/publicRepository/languageRepository");

module.exports = {

    registerAdmin:async(data)=>{

        const salt = genSaltSync(10);
        data.password = hashSync(data.password, salt);
        const result = (await saveAdmin(data));
        return result[0].uid
    },

    loginAdmin:async({email, password})=>{

       const user = (await getAdminByEmail(email))[0];
       if (!user){
           throw new Error("User not found");
       }
        const result = compareSync(
            password,
            user.password
        );

       if (result){
            user.password = undefined;
           return sign({user}, "qwe1234", {
               expiresIn: "1day",
           });
       }else{
          throw new Error("Password mismatch")
       }
    },

    updateMetaData:async (data)=>{

        await updateMetaData(data)
    },

    addLanguageService:async (languageName)=>{

        const isExist = await getLanguageByName(languageName);
        if (!isExist){
            await addLanguageToDb(languageName);
        }
        else{
            await updateLanguage(languageName, false);
        }
    }
}
