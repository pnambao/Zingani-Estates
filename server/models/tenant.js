const mongoose = require("mongoose");
const Property = require("./property");
const Payment = require("./payment");

const tenantSchema = new mongoose.Schema({
    name: { type: String, required: true},
    email: { type: String, required: true},
    propertyId: { type: mongoose.Schema.Types.ObjectId, ref: "Property"},
    paymentHistory: [{ type: mongoose.Schema.Types.ObjectId, ref: "Payment"}],
}, {timestamps: true});

module.exports = mongoose.model("Tenant", tenantSchema);