const mongoose = require("mongoose");

const propertySchema = new mongoose.Schema({
    name:{type: String, required: true},
    rent:{type: Number, required: true },
    isBooked:{type: Boolean, required: true},
});

module.exports = mongoose.model('property' , propertySchema);