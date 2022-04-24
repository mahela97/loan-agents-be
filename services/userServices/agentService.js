const {getDbUserById, updateUserDetailsById, getUsersByLanguagesDB, getAllUsersByType} = require("../../repositories/userRepositories/userRepository");
const {getLanguagesByUid} = require("../../repositories/publicRepository/languageRepository");
const {getAgentDetailsByUid, updateAgentDetails, getAgentsByLoanTypesDB} = require("../../repositories/userRepositories/agentRepository");
const {
    getSocialMediaByUid, getContactDetailsByUid
} = require("../../repositories/socialMediaRepositories/socialMediaRepository");
const knex = require("../../db/db-config");
const {addEducationToDB, updateEducationInDB, deleteEducationInDB} = require("../../repositories/qualificationRepositories/educationRepository");
const {getFile} = require("../storageService");
const {STORAGE, USER_TABLE} = require("../../constants/const");
const {deleteLoanTypeByUid, addLoanTypesToDb, getAgentLoanTypesByUid} = require("../../repositories/publicRepository/loanRepository");
const lodash = require("lodash");

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
        const loanTypes = await getAgentLoanTypesByUid(uid);
        const updatedLoanTypes = await Promise.all(
            loanTypes.map(async loanType =>{
                const icon = await getFile(STORAGE.LOCATIONS.LOAN_ICONS, loanType.loanId)
                loanType.icon = icon;
                return loanType;
            })
        );

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
            firstName, lastName, profilePhoto, city, country, postalCode, languages, socialMedia,
             contactDetails, ...updatedUser,uid,loanTypes:updatedLoanTypes
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
        if (dbLoanTypes.length>0) {
            await addLoanTypesToDb(dbLoanTypes, transaction)
        }
        await transaction.commit();
    },

    getAllAgents:async ({languages, loanTypes, city, country, postalCode})=>{

        const allAgents = await getAllUsersByType(USER_TABLE.values.AGENT);
        const filterList = [allAgents.map(agent=>agent.userId)];

        const languageAgents = await getUsersByLanguagesDB(languages, USER_TABLE.values.AGENT);
        if (languageAgents.length>0){
            filterList.push(languageAgents.map(languageAgent=>languageAgent.userId))
        }

        const loanAgents = await getAgentsByLoanTypesDB(loanTypes);
        if (loanAgents.length>0){
            filterList.push(loanAgents.map(loanAgent=>loanAgent.userId))
        }


        const filteredAgentIds = lodash.intersection(...filterList);

        const filtersAgents =await Promise.all(
            filteredAgentIds.map(async(id)=>{
                return module.exports.getAgentDetails(id);
            })
        )
        return filtersAgents
    }
}