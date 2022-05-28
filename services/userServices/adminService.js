const { genSaltSync, hashSync, compareSync } = require("bcrypt");
const {saveAdmin, getAdminByEmail} = require("../../repositories/userRepositories/adminRepository");
const { sign } = require("jsonwebtoken");
const {updateMetaData} = require("../../repositories/publicRepository/publicRepository");
const {getLanguageByName, addLanguageToDb, updateLanguage, getLanguageById} = require("../../repositories/publicRepository/languageRepository");
const {updatePackageSocialMedia, getVisibilityFromDb} = require("../../repositories/socialMediaRepositories/socialMediaRepository");

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
            if (isExist.archived){
                await updateLanguage(languageName, false);
            }
            else{
                throw new Error("Language already exist")
            }

        }
    },

    deleteLanguageService:async (id)=>{

        const isExist = await getLanguageById(id);
        if (isExist){
            await updateLanguage(isExist.languageName, true);
        }
    },

    updateContactDetailVisibility:async (data)=>{
        const result = []
           Object.keys(data).map(key=>{
             Object.keys(data[key]).forEach(value=>{
                result.push({packageName:key, contactMethod:value, visibility:data[key][value]})
             })
        })
       await updatePackageSocialMedia(result)
    },

    getVisibilities:async ()=>{
        const result = await getVisibilityFromDb();
        const socialMedias = {FREE:{},
            PREMIUM:{},
            PAG:{}
        };

        result.forEach(value=>{
            if (value.packageName == "FREE"){
                socialMedias.FREE[value.contactMethod] = value.visibility
            }else if (value.packageName == "PREMIUM"){
                socialMedias.PREMIUM[value.contactMethod] = value.visibility
            }else if (value.packageName == "PAG"){
                socialMedias.PAG[value.contactMethod] = value.visibility
            }
        });

        return socialMedias
    }
}
