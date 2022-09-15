const {AGENT_DETAIL_TABLE, USER_CONTACT_METHOD_TABLE, PAYMENT_PLANS, USER_TABLE} = require("../constants/const");
const {getAgentField, updateAgentDetails} = require("../repositories/userRepositories/agentRepository");
const {getContactDetailsByNameUid} = require("../repositories/socialMediaRepositories/socialMediaRepository");
const stripe = require("../constants/stripeConfig");
const {getUserFieldsUid} = require("../repositories/userRepositories/userRepository");
const {updateConversation} = require("../repositories/messageRepositories/messageRepository");
module.exports = {

    createSubscriptionFoUser: async (uid, subscriptionType, success, cancel) => {

        let {customerId} = (await getAgentField(uid, [AGENT_DETAIL_TABLE.CUSTOMER_ID]));
        if (!customerId) {
            const {value} = await getContactDetailsByNameUid(uid, USER_CONTACT_METHOD_TABLE.values.EMAIL)
            const {firstName, lastName} = await getUserFieldsUid(uid, [USER_TABLE.FIRST_NAME, USER_TABLE.LAST_NAME])
            customerId = await module.exports.createPaymentCustomer(value, firstName, lastName);
            await updateAgentDetails(uid, {customerId})
        }

        const priceObject = {};
        let mode;
        switch (subscriptionType) {
            case PAYMENT_PLANS.MONTHLY.NAME:
                priceObject.price = PAYMENT_PLANS.MONTHLY.price
                priceObject.quantity = 1
                mode = 'subscription'
                break;
            case PAYMENT_PLANS.YEARLY.NAME:
                priceObject.price = PAYMENT_PLANS.YEARLY.price
                priceObject.quantity = 1;
                mode = 'subscription'

                break;
            case PAYMENT_PLANS.PAY_AS_YOU_GO.NAME:
                priceObject.price = PAYMENT_PLANS.PAY_AS_YOU_GO.price
                mode = 'subscription'
                break;

        }
        const session = await stripe.checkout.sessions.create({
            customer: customerId,
            success_url: success,
            cancel_url: cancel,
            line_items: [
                priceObject
            ],
            mode,
            payment_method_types: ["card"]
        });

        return session
    },

    createPaymentCustomer: async (email, firstName, lastName) => {

        return (await stripe.customers.create({
            name: `${firstName} ${lastName}`,
            email,
        })).id;
    },

    getCurrentPlan: async (uid) => {

        const {customerId} = (await getAgentField(uid, [AGENT_DETAIL_TABLE.CUSTOMER_ID]));

        let subscriptionType = PAYMENT_PLANS.FREE.NAME;
        const subscriptionId = (await stripe.subscriptions.list({
            customer: customerId,
            status: "active"
        }))
        if (subscriptionId.data.length > 0) {

            const currentPlan = subscriptionId.data[0].items.data[0].plan.product;

            switch (currentPlan) {
                case PAYMENT_PLANS.MONTHLY.PROD_ID:
                    subscriptionType = PAYMENT_PLANS.MONTHLY.NAME;
                    break;
                case PAYMENT_PLANS.YEARLY.PROD_ID:
                    subscriptionType = PAYMENT_PLANS.YEARLY.NAME;
                    break;
                case PAYMENT_PLANS.PAY_AS_YOU_GO.PROD_ID:
                    subscriptionType = PAYMENT_PLANS.PAY_AS_YOU_GO.NAME;
                    break;
                default:
                    subscriptionType = PAYMENT_PLANS.FREE.NAME
                    break;
            }
        }
        return subscriptionType
    },

    getPortalSession: async (uid, url) => {

        const {customerId} = (await getAgentField(uid, [AGENT_DETAIL_TABLE.CUSTOMER_ID]))
        return (
            await stripe.billingPortal.sessions.create({
                customer: customerId,
                return_url: url,
            })
        )
    },

    getSubscriptionId: async (uid)=>{

        const {customerId} = await getAgentField(uid, [AGENT_DETAIL_TABLE.CUSTOMER_ID])

        return (await stripe.subscriptions.list({customer: customerId,
            limit: 1,
        })).data[0].items.data[0].id;
    },

    consumePAG: async (conversationId, uid) =>{

        const currentPlan = await module.exports.getCurrentPlan(uid);
        if (currentPlan !== PAYMENT_PLANS.PAY_AS_YOU_GO.NAME){
            throw new Error("Incorrect subscription plan")
        }

        const subscriptionItem = await module.exports.getSubscriptionId(uid);

        await stripe.subscriptionItems.createUsageRecord(
            subscriptionItem,
            {
                quantity: 1,
                action: 'increment',
            }
        );

        await updateConversation(conversationId, {isVisible:true});
    }
}