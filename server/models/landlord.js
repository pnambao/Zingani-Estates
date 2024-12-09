const mongoose = require("mongoose");

const landlordSchema = new mongoose.Schema({
    name: {type: String, required: true},
    
});

module.exports = mongoose.model('landlord', landlordSchema);