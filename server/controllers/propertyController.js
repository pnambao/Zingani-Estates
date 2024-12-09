const Property = require("../models/property");

//Get all properties

const getAllProperties = async (req, res) => {
    try{
        const properties = await Property.find();
        res.json(properties);
    } catch (err){
        res.status(500).json({ message: err.message});
    }
};

//create Property
const createProperty = async (req, res) => {
    const { name, rent, isBooked} = req.body;
    try{
        const newProperty = new Property({ name, rent, isBooked });
        await newProperty.save();
        res.status(201).json(newProperty);
    } catch (err) {
        res.status(400).json({message: err.message});
    }
};

module.exports = { getAllProperties, createProperty};