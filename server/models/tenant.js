const mongoose = require("mongoose");

const tenantSchema = new mongoose.Schema({});

module.exports = mongoose.model('tenant', tenantSchema);