const Payment = require("../models/payment");

//get all payments
const getAllPayments = async (req, res) => {
    try{
        const payments = await Payment.find();
        res.json(payments);
    } catch (err){
        res.status(500).json({ message: err.message});
    }
};

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

module.exports = { getAllPayments, createPayment };