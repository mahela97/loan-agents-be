const {getDbUserById, updateUserDetailsById} = require("../../repositories/userRepositories/userRepository");
const {getLanguagesByUid} = require("../../repositories/publicRepository/languageRepository");
const {getAgentDetailsByUid, updateAgentDetails} = require("../../repositories/userRepositories/agentRepository");
const {
    getSocialMediaByUid, getContactDetailsByUid
} = require("../../repositories/socialMediaRepositories/socialMediaRepository");
const knex = require("../../db/db-config");
const {addEducationToDB, updateEducationInDB, deleteEducationInDB} = require("../../repositories/qualificationRepositories/educationRepository");
const {addLoanTypesToDb} = require("../../repositories/loanRepository")
const {getFile} = require("../storageService");
const {STORAGE} = require("../../constants/const");

module.exports = {
    getAgentDetails: async (uid) => {
        const userDetails = await getDbUserById(uid);
        if (!userDetails) {
            return null; // if agent is archived, wont proceed
        }

        let updatedUser = {};

        const {firstName, lastName, city, country, postalCode} = userDetails;
        const profilePhoto = await getFile(STORAGE.LOCATIONS.USERS,uid);
        const languages = await getLanguagesByUid(uid);
        const agentDetails = await getAgentDetailsByUid(uid);

        if (agentDetails[0]) {
            updatedUser = {...agentDetails[0]};
            delete updatedUser.userId;
        }
        const socialMedia = {};
        (await getSocialMediaByUid(uid)).forEach(socialM => {
            const key = socialM.contactMethodId.toLowerCase();
            socialMedia[key] = socialM.value

        });
        const contactDetails = {};
        (await getContactDetailsByUid(uid)).forEach(contactM => {
            const key = contactM.contactMethodId.toLowerCase();
            contactDetails[key] = contactM.value
        });

        return {
            firstName, lastName, profilePhoto, city, country, postalCode, languages, socialMedia, contactDetails, ...updatedUser,uid
        }

    }, editAgentBasicDetails: async (uid, details) => {
        const transaction = await knex.transaction();
        const {firstName, lastName, country, city, postalCode} = details;
        const {statement} = details;
        await updateUserDetailsById(uid,{firstName,lastName,country, city, postalCode},transaction);
        await updateAgentDetails(uid,{statement},transaction);
        await transaction.commit();
    },

    addAgentIntroduction:async (uid,introduction) =>{
        return updateAgentDetails(uid,{introduction}, null);
    },

    addAgentEducation:async (uid, educationDetails) =>{
        educationDetails.userId = uid;
        return addEducationToDB(educationDetails);
    },

    updateAgentEducation:async (eid, educationDetails) =>{
        return updateEducationInDB(eid, educationDetails);
    },

    deleteAgentEducation:async (eid) =>{
        return deleteEducationInDB(eid);
    },

    addAgentContactVia:async (uid, details) =>{
        return updateAgentDetails(uid, details, null)
    },

    addLoanTypeToAgent:async (uid, loans)=>{
        const dbLoanTypes = loans.map(loan=>{
            return {userId:uid,loanId:loan}});
        const transaction = await knex.transaction();
        await deleteLoanTypeByUid(uid, transaction);
        if (dbLoanType.length>0) {
            await addLoanTypesToDb(dbLoanTypes, transaction)
        }
        await transaction.commit();
    }
}