const Tenant = require ("../models/tenant");
const Payment = require("../models/payment");

//get all tenants
const getAllTenants = async (req, res) => {
    try{
        const tenants = await Tenant.find();
        res.json(tenants);
    } catch (err){
        res.status(500).json({ message: err.message});
    }
};

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

//delete Tenant
const deleteTenant = async (req, res) => {
    try{
        const tenant = await Tenant.findByIdAndDelete(req.params.id);
        if (!tenant) {
            return res.status(404).json({ message: "Tenant not found" });
        }

        await Payment.deleteMany({ tenantId: req.params.id });
        res.status(200).json({ message: "Tenant and their payment history deleted successfully" });
    } catch (err){
        res.status(500).json({ message: err.message });
    }
};

module.exports = { getAllTenants, createTenant, deleteTenant };