const Tenant = require ("../models/tenant");

//create Tenant

const createTenant = async (req, res) => {
    const { name, email, propertyId } = req.body;
    try{
        const newTenant = new Tenant({name, email, propertyId});
        await newTenant.save();
        res.status(201).json(newTenant);
    } catch (err){
        res.status(400).json({ message: err.message});    
    }  
};

module.exports = {createTenant};