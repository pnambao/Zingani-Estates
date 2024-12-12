const mongoose = require("mongoose");
const Tenant = require("./tenant")

const propertySchema = new mongoose.Schema({
    name:{type: String, required: true},
    rent:{type: Number, required: true },
    isBooked:{type: Boolean, default: false},
    tenantId: {type: mongoose.Schema.Types.ObjectId, ref:"Tenant"},
    image: {type: String, default: ""},
}, {timestamps: true});

module.exports = mongoose.model("Property" , propertySchema);