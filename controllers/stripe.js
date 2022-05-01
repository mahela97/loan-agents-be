const stripe = require("../constants/stripeConfig");
const {PAYMENT_PLANS} = require("../constants/const");


module.exports = {

    tes1t:async(req,res)=>{



        // const customer = await stripe.customers.create({
        //     description: 'My First Test Customer (created for API docs)',
        //     email:'mahela@gmail.com',
        // });
        // console.log(customer)

        // const subscription = await stripe.subscriptions.create({
        //     customer: 'cus_Lb7eVp0XImB1wf',
        //     items: [
        //         {price: 'price_1KtvSdGVuEMrgnylfH1ZmT0l'},
        //     ],
        // });


        // const invoiceItem = await stripe.subscriptionItems.createUsageRecord(
        //     'si_Lb7wUACgVFDhzx',
        //     {quantity: 8}
        // );

       //  const customer = await stripe.customers.retrieve(
       //      'cus_Lb7eVp0XImB1wf'
       //  );
       //
       //  const balanceTransactions = await stripe.customers.listBalanceTransactions(
       //      'cus_Lb7eVp0XImB1wf',
       //      {limit: 3}
       //  );
       //
       // const subscriptionId =  await stripe.subscriptions.retrieve(
       //      'sub_1KtvgRGVuEMrgnylOh5dSYgs'
       //  );


        res.status(200).send(subscriptionId)
    },
    test4: async (req, res) => {
        // For demonstration purposes, we're using the Checkout session to retrieve the customer ID.
        // Typically this is stored alongside the authenticated user in your database.
        // const { session_id } = req.body;
        // const session_id = 'cus_Lb7eVp0XImB1wf';
        // const checkoutSession = await stripe.checkout.sessions.retrieve(session_id);

        // This is the url to which the customer will be redirected when they are done
        // managing their billing with the portal.
        const returnUrl = 'https://www.example.com';

        const portalSession = await stripe.billingPortal.sessions.create({
            customer: 'cus_Lb7omFzea48j8L',
            return_url: returnUrl,
        });

        res.status(200).send(portalSession);
    },
    atest: async (req, res) => {
        const YOUR_DOMAIN = 'https://www.example.com';
        const session = await stripe.checkout.sessions.create({
            billing_address_collection: 'auto',
            line_items: [
                {
                    price: 'price_1KtvSdGVuEMrgnylfH1ZmT0l',
                    // For metered billing, do not pass quantity

                }
            ],
            customer:'cus_Lb7omFzea48j8L'
            ,
            mode: 'subscription',
            success_url: `${YOUR_DOMAIN}/?success=true&session_id={CHECKOUT_SESSION_ID}`,
            cancel_url: `${YOUR_DOMAIN}?canceled=true`,
            payment_method_types:["card"]
        });

        // const subscription = await stripe.subscriptions.search({
        //     query: 'customer:\'cus_Lb7omFzea48j8L\''
        // });
        res.status(200).send({x:session.url,session});
    },
    // test:async (req,res)=>{
    //     await stripe.subscriptionItems.createUsageRecord(
    //         '{{SUBSCRIPTION_ITEM_ID}}',
    //         {
    //             quantity: 100,
    //             timestamp: 1651397397,
    //             action: 'increment',
    //         }
    //     );
    //     res.status(200).send();
    // }
test:async(req,res)=>{

        try{
            // const configuration = await stripe.billingPortal.configurations.create({
            //     features: {
            //         customer_update: {
            //             allowed_updates: ['email', 'tax_id'],
            //             enabled: true,
            //         },
            //         payment_method_update:{
            //             enabled:true,
            //
            //         },
            //         subscription_update:{
            //             default_allowed_updates:[
            //                 "price","quantity"
            //             ],
            //           enabled:true,
            //             products:[{product:PAYMENT_PLANS.YEARLY.PROD_ID, prices:[PAYMENT_PLANS.YEARLY.price]}
            //             ,{product:PAYMENT_PLANS.MONTHLY.PROD_ID, prices:[PAYMENT_PLANS.MONTHLY.price]},
            //                 // {product:PAYMENT_PLANS.PAY_AS_YOU_GO.PROD_ID, prices:[PAYMENT_PLANS.PAY_AS_YOU_GO.price]}
            //             ],
            //
            //             // PAYMENT_PLANS.MONTHLY.PROD_ID, PAYMENT_PLANS.PAY_AS_YOU_GO.PROD_ID]
            //         },
            //         invoice_history: {enabled: true},
            //     },
            //     business_profile: {
            //         privacy_policy_url: 'https://example.com/privacy',
            //         terms_of_service_url: 'https://example.com/terms',
            //     },
            // });
            //
            //
            // const session = await stripe.billingPortal.sessions.create({
            //     customer: 'cus_LbpSGNjx4GYw0M',
            //     return_url: 'https://example.com/account',
            //     configuration:configuration.id
            //
            // });
            const invoiceItem = await stripe.subscriptionItems.createUsageRecord(
                'si_Lb7wUACgVFDhzx',
                {quantity: 8}
            );

            res.status(200).send({portalSession})
        }catch(error){
            console.log(error)
            res.status(400).send(error)
        }

}
}