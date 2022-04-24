module.exports = {
    USER_TABLE: {
        NAME: "user",
        USER_ID: "userId",
        FIRST_NAME: "firstName",
        LAST_NAME: "lastName",
        CITY: "city",
        COUNTRY: "country",
        POSTAL_CODE: "postalCode",
        ROLE: "role",
        values: {
            AGENT: "agent"
        }
    },
    LOAN_TYPE_TABLE: {
        NAME: "loanType",
        LOAN_ID: "loanId",
        LOAN_NAME:"loanName"
    },
    AGENT_LOAN_TYPE_TABLE: {
        NAME: "agentLoanType",
        USER_ID:"userId",
        LOAN_ID: "loanId"
    }
    ,
    COMMON: {
        ARCHIVED: "archived",
        SELECT_ALL: "*",
        DESC: "desc",
        ASC: "asc"
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
        NAME: "contactMethod",
        CONTACT_METHOD_ID: "contactMethodId",
        TYPE: "type",
        values: {
            CONTACT: "C",
            SOCIAL: "S",
            CONTACT_METHOD_PHONE: "PHONE",
            CONTACT_METHOD_EMAIL: "EMAIL",
            SOCIAL_MEDIA_FACEBOOK: "FACEBOOK",
            SOCIAL_MEDIA_LINKEDIN: "LINKEDIN",
            SOCIAL_MEDIA_TWITTER: "TWITTER",
            SOCIAL_MEDIA_DRIBBLE: "DRIBBLE",
            SOCIAL_MEDIA_TWITCH: "TWITCH",
        }
    },
    SITE_META_DATA_TABLE: {
        NAME: "siteMetaData"
    },
    EDUCATION_TABLE: {
        EDUCATION_ID:"educationId",
        NAME: "education"
    },
    QUALIFICATION_TABLE: {
        NAME: "qualification"
        ,QUALIFICATION_ID: "wid"
    },
    MESSAGE_TABLE: {
        NAME: "message",
        SENDER_ID: "senderId",
        MESSAGE_ID: "messageId",
        MESSAGE: "message",
        CREATED_AT: "createdAt",
        READ: "read",
        CONVERSATION_ID: "conversationId"
    },
    CONVERSATION_TABLE: {
        NAME: "conversation",
        PARTICIPANT_ID :"participantId",
        CONVERSATION_ID: "conversationId"
    },
    STORAGE: {
        BUCKET_NAME: "gs://loan-agents.appspot.com",
        LOCATIONS:{
            USERS: "loan-agents/images/users/",
            LOAN_ICONS: "loan-agents/images/loanTypes/"
        }
    }

};
