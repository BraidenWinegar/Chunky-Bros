require('dotenv').config();
const{ STRIPE_SECRET_KEY} = process.env
const stripe = require('stripe')(STRIPE_SECRET_KEY)
const uuid = require("uuid/v4");

module.exports = {
    checkout: async (req, res) => {
        const { token, thisOrder } = req.body
        let error, status;

        try {
            const customer = await stripe.customers.create({
                email: token.email,
                source: token.id
            });

        const idempotency_key = uuid(); /// used to make sure there aren't double charges

        const charge = await stripe.charges.create(
                {
                    amount: thisOrder.price * 100,
                    currency: 'usd',
                    customer: customer.id,
                    receipt_email: token.email,
                    description: `Purchased food`,
                },
                {
                    idempotency_key   
                }
            );
            status = 'success'
        } catch (err){
            console.log("Error", err)
            status = "failure"
        }
    
        res.json({ error, status}) //// think this is the same as res.status(200).send({ error, status })
    }
} 