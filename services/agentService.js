const {getDbUserById} = require("../repositories/userRepositories/userRepository");
const {getLanguagesByUid} = require("../repositories/publicRepository/languageRepository");
const {getAgentDetailsByUid} = require("../repositories/userRepositories/agentRepository");
const {getSocialMediaByUid, getContactDetailsByUid} = require("../repositories/socialMediaRepositories/socialMediaRepository");
module.exports = {
    getAgentDetails:async (uid)=>{
        const userDetails = await getDbUserById(uid);
        if (!userDetails[0]) {
            return null; // if agent is archived, wont proceed
        }

        let updatedUser = {};

        const {firstName, lastName, location} = userDetails[0];
        const agentLanguages = await getLanguagesByUid(uid);
        const languages = agentLanguages.map(({languageName})=>languageName);

        const agentDetails = await getAgentDetailsByUid(uid);



        if (agentDetails[0]) {
           updatedUser = {...agentDetails[0]};
        }

        const socialMedia = {};
        (await getSocialMediaByUid(uid)).forEach(socialM=>{
             const key = socialM.contactMethodId.toLowerCase();
            socialMedia[key] = socialM.value

        });
        const contactDetails = {};
        (await getContactDetailsByUid(uid)).forEach(contactM=>{
            const key = contactM.contactMethodId.toLowerCase();
            contactDetails[key] = contactM.value
        });

        return {
            firstName, lastName, location,  languages, socialMedia, contactDetails,
             ...updatedUser
        }

    }
}