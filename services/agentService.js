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
        const {firstName, lastName, location} = userDetails[0];

        const agentLanguages = await getLanguagesByUid(uid);
        const languages = agentLanguages.map(({languageName})=>languageName);

        const agentDetails = await getAgentDetailsByUid(uid);
        const {introduction, statement, profileCompleted,
        viaPhone, viaMobile, mobileServices} = agentDetails[0];


        const socialMedia = (await getSocialMediaByUid(uid)).map(socialM=>{
            const key = socialM.contactMethodId.toLowerCase();
            return {[key]:socialM.value}
        });
        const contactDetails = (await getContactDetailsByUid(uid)).map(contactM=>{
            const key = contactM.contactMethodId.toLowerCase();
            return {[key]:contactM.value}
        });
        return {
            firstName, lastName, location, statement, languages, socialMedia, contactDetails, introduction,
            viaPhone, viaMobile, mobileServices
        }

    }
}