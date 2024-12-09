const Payment = require("../models/payment");

//Create payment
const createPayment = async(req, res) =>{
    const {amount, tenantId, propertyId, status} = req.body;
    try{
        const newPayment = new Payment({ amount, tenantId, propertyId, status});
        await newPayment.save();
        res.status(201).json(newPayment);
    }catch(err){
        res.status(400).json({message: err.message});
    }
};

module.exports = {createPayment};