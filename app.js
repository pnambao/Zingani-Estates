/*

const express = require("express");
const Stripe = require("stripe");
const cors = require("cors"); 

//initializing express and stripe 
const app = express();
const stripe = Stripe("sk_test_51Q390LIVlokKHLiOBMWfBQlaFe36TlER25jBqR3oMH3msHwdk9oz7Ki0dUfNDFrZweSsEotbHTAvpEGsilKLAA7V00l0iWiDuY");

//middleware
app.use(express.json());
app.use(cors());

app.get('/', (req, res) => {
    res.send('Welcome to the Stripe Payment Demo!');
  });


app.post('/api/create-payment-intent', async (req, res) => {
    const {amount} =req.body;

    try{
        const paymentIntent= await stripe.paymentIntents.create({
            amount: amount * 100,
            currency:'kwacha',
        });

        res.json({clientSecret: paymentIntent.client_secret });
    } catch (error){
        res.status(500).json({error: "Payment failed", details: error.message});
    }

});

//Starting the server

const PORT = 3000;
app.listen (PORT, () => {
    console.log(`server running on http://localhost:${PORT}`)
});

*/