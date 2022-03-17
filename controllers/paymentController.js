const BigPromise = require('../middlewares/bigPromise');
const stripe = require('stripe')(process.env.STRIPE_API_SECRET)


exports.sendStripeKey = BigPromise(async (req,res, next)=>{
    res.status(200).json({
        stripeKey: process.env.STRIPE_API_KEY,
    });
});

exports.captureStripePayment = BigPromise(async (req,res, next)=>{
    const paymentIntent = await  stripe.paymentIntents.create({
        amount: req.body.amount,
        currency: 'INR',

        //optional
        metadata : {integration_check: 'accept_a_payment'}
    });

    res.status(200).json({
        success: true ,
        client_secret: paymentIntent.client_secret,
        amount: req.body.amount 

        // you can optionally send id as well 
    })
});


exports.sendRazorpayKey = BigPromise(async (req,res, next)=>{
    res.status(200).json({
        stripeKey: process.env.RAZORPAY_API_KEY,
    });
});


exports.captureRazorpayPayment = BigPromise(async (req,res, next)=>{
    var instance = new Razorpay ({
        key_id : process.env.RAZORPAY_API_KEY,
        key_secret: process.env.RAZORPAY_API_SECRET
    })

    var options ={
        amount: req.body.amount , // amount int the smallest currency unit
        currency: "INR"
    }

    const myorder = await instance.orders.create(options);

    res.status(200).json({
        success:true ,
        amount: req.body.amount ,
        order: myorder
    })
    
}); 


