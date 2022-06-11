const {
    getDbUserById, updateUserDetailsById, getUsersByLanguagesDB, getAllUsersByType, getUsersByFieldRole, getUsersByQuery
} = require("../../repositories/userRepositories/userRepository");
const {getLanguagesByUid} = require("../../repositories/publicRepository/languageRepository");
const {
    getAgentDetailsByUid, updateAgentDetails, getAgentsByLoanTypesDB
} = require("../../repositories/userRepositories/agentRepository");
const {
    getSocialMediaByUid, getContactDetailsByUid, getPackageVisibility, getAllPackageVisibility
} = require("../../repositories/socialMediaRepositories/socialMediaRepository");
const knex = require("../../db/db-config");
const {
    addEducationToDB, updateEducationInDB, deleteEducationInDB
} = require("../../repositories/qualificationRepositories/educationRepository");
const {getFile} = require("../storageService");
const {STORAGE, USER_TABLE, COMMON, PAYMENT_PLANS} = require("../../constants/const");
const {
    deleteLoanTypeByUid, addLoanTypesToDb, getAgentLoanTypesByUid
} = require("../../repositories/publicRepository/loanRepository");
const lodash = require("lodash");
const {getCurrentPlan} = require("../paymentService");

module.exports = {
    getAgentDetails: async (uid, token) => {
        const userDetails = await getDbUserById(uid);
        if (!userDetails) {
            return null; // if agent is archived, wont proceed
        }

        let updatedUser = {};

        const {firstName, lastName, city, country, postalCode, createdAt} = userDetails;
        const profilePhoto = await getFile(STORAGE.LOCATIONS.USERS, uid);
        const languages = await getLanguagesByUid(uid);
        const agentDetails = await getAgentDetailsByUid(uid);
        const loanTypes = await getAgentLoanTypesByUid(uid);
        const updatedLoanTypes = await Promise.all(loanTypes.map(async loanType => {
            const icon = await getFile(STORAGE.LOCATIONS.LOAN_ICONS, loanType.loanId)
            loanType.icon = icon;
            return loanType;
        }));

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

        const subscriptionType = (await getCurrentPlan(uid))
        let plan;

        switch (subscriptionType){
            case PAYMENT_PLANS.MONTHLY.NAME:
            case PAYMENT_PLANS.YEARLY.NAME:
                plan = PAYMENT_PLANS.PREMIUM.NAME
                break;
            default:
                plan = subscriptionType;
        }
         let subscriptionVisibility;
        if (token && token === uid){
            subscriptionVisibility = (await getAllPackageVisibility(plan)).map(limit=>limit.contactMethod);
        }else{
            subscriptionVisibility = (await getPackageVisibility(plan)).map(limit=>limit.contactMethod);
        }
        return {
            firstName,
            lastName,
            profilePhoto,
            city,
            country,
            postalCode,
            languages,
            socialMedia,
            createdAt,
            contactDetails, ...updatedUser,
            uid,
            loanTypes: updatedLoanTypes,
            subscriptionType,
            subscriptionVisibility
        }

    }, editAgentBasicDetails: async (uid, details) => {
        const transaction = await knex.transaction();
        const {firstName, lastName, country, city, postalCode} = details;
        const {statement} = details;
        await updateUserDetailsById(uid, {firstName, lastName, country, city, postalCode}, transaction);
        await updateAgentDetails(uid, {statement}, transaction);
        await transaction.commit();
    },

    addAgentIntroduction: async (uid, introduction) => {
        return updateAgentDetails(uid, {introduction}, null);
    },

    addAgentEducation: async (uid, educationDetails) => {
        educationDetails.userId = uid;
        return addEducationToDB(educationDetails);
    },

    updateAgentEducation: async (eid, educationDetails) => {
        return updateEducationInDB(eid, educationDetails);
    },

    deleteAgentEducation: async (eid) => {
        return deleteEducationInDB(eid);
    },

    addAgentContactVia: async (uid, details) => {
        return updateAgentDetails(uid, details, null)
    },

    addLoanTypeToAgent: async (uid, loans) => {
        const dbLoanTypes = loans.map(loan => {
            return {userId: uid, loanId: loan}
        });
        const transaction = await knex.transaction();
        await deleteLoanTypeByUid(uid, transaction);
        if (dbLoanTypes.length > 0) {
            await addLoanTypesToDb(dbLoanTypes, transaction)
        }
        await transaction.commit();
    },

    getAllAgents: async ({
                             languages, loanTypes, city, country, postalCode, status, sortBy, queryString, limit
                         }) => {

        const allAgents = await getAllUsersByType(USER_TABLE.values.AGENT);
        const filterList = [allAgents.map(agent => agent.userId)];

        if (limit === -1){

             const agents = (await Promise.all(filterList[0].map(async (id) => {
                return module.exports.getAgentDetails(id, false);
            })))
            return agents
        }

        if (languages.length > 0) {

            const languageAgents = await getUsersByLanguagesDB(languages, USER_TABLE.values.AGENT);
            if (languageAgents.length > 0) {
                filterList.push(languageAgents.map(languageAgent => languageAgent.userId))
            } else {
                return []
            }
        }

        if (loanTypes.length > 0) {

            const loanAgents = await getAgentsByLoanTypesDB(loanTypes);
            if (loanAgents.length > 0) {
                filterList.push(loanAgents.map(loanAgent => loanAgent.userId))
            } else {
                return []
            }

        }

        if (city) {

            const cityAgents = await getUsersByFieldRole(USER_TABLE.CITY, city, USER_TABLE.values.AGENT);
            if (cityAgents.length > 0) {
                filterList.push(cityAgents.map(cityAgent => cityAgent.userId));
            } else {
                return []
            }
        }

        if (country) {

            const countryAgents = await getUsersByFieldRole(USER_TABLE.COUNTRY, country, USER_TABLE.values.AGENT);
            if (countryAgents.length > 0) {
                filterList.push(countryAgents.map(countryAgent => countryAgent.userId));
            } else {
                return []
            }
        }

        if (postalCode) {

            const postalCodeAgents = await getUsersByFieldRole(USER_TABLE.POSTAL_CODE, postalCode, USER_TABLE.values.AGENT);
            if (postalCodeAgents.length > 0) {
                filterList.push(postalCodeAgents.map(postalCodeAgent => postalCodeAgent.userId));
            } else {
                return []
            }
        }

        if (queryString) {

            const queryAgents = await getUsersByQuery(queryString);
            if (queryAgents.length > 0) {
                filterList.push(queryAgents.map(queryAgent => queryAgent.userId));
            } else {
                return []
            }
        }

        const filteredAgentIds = lodash.intersection(...filterList);

        const filtersAgents = await Promise.all(filteredAgentIds.map(async (id) => {
            return module.exports.getAgentDetails(id, false);
        }))

        if (sortBy === COMMON.DESC) {
            filtersAgents.sort(function (x, y) {
                return y.createdAt - x.createdAt

            })
        } else if (sortBy === COMMON.ASC) {
            filtersAgents.sort(function (x, y) {
                return x.createdAt - y.createdAt

            })
        }

        return filtersAgents
    }
}
