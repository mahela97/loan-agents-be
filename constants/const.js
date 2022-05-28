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
    ADMIN_TABLE:{
        NAME: "admin"
    }
    ,
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
        VISIBILITY: "visibility",
        values:{
            EMAIL:"EMAIL"
        }
    },
    AGENT_DETAIL_TABLE: {
        NAME: "agentDetail",
        USER_ID: "userId",
        CUSTOMER_ID: "customerId"
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
        CONVERSATION_ID: "conversationId",
        SUBSCRIPTION_TYPE: "subscriptionType",
        IS_VISIBLE: "isVisible"
    },
    STORAGE: {
        BUCKET_NAME: "gs://loan-agents.appspot.com",
        LOCATIONS:{
            USERS: "loan-agents/images/users/",
            LOAN_ICONS: "loan-agents/images/loanTypes/"
        }
    },
    PAYMENT_PLANS: {
        MONTHLY:{
            PROD_ID: "prod_Lb7iang2GW1IXP",
            NAME: "MONTHLY",
            price: "price_1KtvT2GVuEMrgnylITuTWywH",

        },
        YEARLY:{
            PROD_ID: "prod_Lb7ifIls2JPw4n",
            NAME: "YEARLY",
            price: "price_1Kwo9bGVuEMrgnylV0CCTxgA"
        },
        PAY_AS_YOU_GO:{
            PROD_ID: "prod_Lb7iz6q485sq1f",
            NAME: "PAG",
            price: "price_1KtvSdGVuEMrgnylfH1ZmT0l"
        },
        FREE:{
            NAME:"FREE",
            COUNT: 2
        },
        price: "price"
    },

};
