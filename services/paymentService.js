const {AGENT_DETAIL_TABLE, USER_CONTACT_METHOD_TABLE,PAYMENT_PLANS, USER_TABLE} = require("../constants/const");
const {getAgentField, updateAgentDetails} = require("../repositories/userRepositories/agentRepository");
const {getContactDetailsByNameUid} = require("../repositories/socialMediaRepositories/socialMediaRepository");
const stripe = require("../constants/stripeConfig");
const {getUserFieldsUid} = require("../repositories/userRepositories/userRepository");
module.exports = {

    createSubscriptionFoUser: async(uid, subscriptionType, success, cancel)=>{

        let {customerId} = (await getAgentField(uid, [AGENT_DETAIL_TABLE.CUSTOMER_ID]));
       if (!customerId) {
           const {value} = await getContactDetailsByNameUid(uid, USER_CONTACT_METHOD_TABLE.values.EMAIL)
           const {firstName, lastName} = await getUserFieldsUid(uid, [USER_TABLE.FIRST_NAME, USER_TABLE.LAST_NAME])
           customerId = await module.exports.createPaymentCustomer(value, firstName, lastName);
           await updateAgentDetails(uid, {customerId})
       }

       const priceObject = {};
       let mode;
        switch (subscriptionType){
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
            customer:customerId,
            success_url: success,
            cancel_url: cancel,
            line_items: [
              priceObject
            ],
            mode,
            payment_method_types:["card"]
        });

       return session
    },

    createPaymentCustomer: async (email, firstName, lastName) =>{

        return (await stripe.customers.create({
            name: `${firstName} ${lastName}`,
            email,
        })).id;
    },


}