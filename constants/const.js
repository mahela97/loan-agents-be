module.exports = {
    USER_TABLE: {
        NAME:  "user",
        USER_ID: "userId",
        FIRST_NAME: "firstName",
        LAST_NAME: "lastName",
        LOCATION: "location",
        values:{
            AGENT:"agent"
        }
    },
    COMMON: {ARCHIVED: "archived",
        SELECT_ALL: "*"
    },
    USER_CONTACT_METHOD_TABLE: {
        CONTACT_METHOD_ID: "contactMethodId",
        NAME: "userContactMethod",
        VALUE: "value",
        USER_ID: "userId",
        VISIBILITY: "visibility"
    },
    AGENT_DETAIL_TABLE: {
        NAME: "agentDetail",
        USER_ID: "userId"
    },
    LANGUAGE_TABLE: {
        NAME: "language",
        LANGUAGE_NAME: "languageName",
            LANGUAGE_ID: "languageId"
    },
    AGENT_LANGUAGE_TABLE: {
        NAME: "agentLanguage",
        USER_ID: "userId",
        LANGUAGE_ID: "languageId"
    },
    CONTACT_METHOD_TABLE: {
        NAME:  "contactMethod",
        CONTACT_METHOD_ID: "contactMethodId",
        TYPE: "type",
        values: {
            CONTACT: "C",
            SOCIAL: "S",
            CONTACT_METHOD_PHONE: "PHONE",
            CONTACT_METHOD_EMAIL: "EMAIL",
        }
    },
    SITE_META_DATA_TABLE: {
        NAME: "siteMetaData"
    },

};
