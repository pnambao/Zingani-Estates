const mongoose = require("mongoose");

const landlordSchema = new mongoose.Schema({});

module.exports = mongoose.model('landlord', landlordSchema);