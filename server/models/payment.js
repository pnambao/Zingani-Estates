const mongoose = require("mongoose");
const Property = require("./property");
const Tenant = require("./tenant");

const paymentSchema = new mongoose.Schema({
    amount: { type: Number, required: true},
    date: { type: Date, default: Date.now},
    status: { type: String, enum:["paid", "pending", "overdue"], default: "pending"},
    tenantId: { type: mongoose.Schema.Types.ObjectId, ref: "Tenant"},
    propertyId: { type: mongoose.Schema.Types.ObjectId, ref: "Property"},
}, { timestamps: true});

module.exports = mongoose.model("Payment", paymentSchema);