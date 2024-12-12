const Tenant = require ("../models/tenant");
const Payment = require("../models/payment");
const Property = require("../models/property")

//get all tenants
const getAllTenants = async (req, res) => {
    try {
        const tenants = await Tenant.find()
            .populate("propertyId")
            .populate({
                path: "paymentHistory",
                populate: {
                    path: "tenantId propertyId",
                    select: "name rent"
                }
            });
        res.json(tenants);
    } catch (err) {
        res.status(500).json({ message: err.message });
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

//assinging Tenants
const assignTenant = async (req, res) => {
    const {tenantId, propertyId} = req.body;
    try{
        //update tenant witht he property ID
        await Tenant.findByIdAndUpdate(tenantId, {propertyId});

        //update the property's tenant info and booking status
        await Property.findByIdAndUpdate(propertyId, {isBooked: true, tenantId});

        res.status(200).json({ message: "Tenant assigned to property"});
    } catch (err){
        res.status(500).json({ message: err.message});
    }
    
};

module.exports = { getAllTenants, createTenant, deleteTenant, assignTenant };