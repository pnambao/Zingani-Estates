const mongoose = require("mongoose");

const propertySchema = new mongoose.Schema({
    name:{type: String, required: true},
    rent:{type: Number, required: true },
    isBooked:{type: Boolean, required: true},
    tenantId:{type: mongoose.Schema.Types.ObjectId, ref: 'User', default: null},
    landlordId: {type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true}
});

propertySchema.methods.assignTenant = function (tenantId) {
    if (this.isBooked) throw new Error('property is already booked');
    this.tenantId = tenantId;
    this.isBooked = true;
    return this.save();
}

propertySchema.methods.removeTenant = ()=>{
        this.tenantId = null;
        this.isBooked = false;
        return this.save();
}

propertySchema.methods.isAvailable = ()=>{
    return this.isBooked ? false : true;
}

module.exports = mongoose.model('property' , propertySchema);