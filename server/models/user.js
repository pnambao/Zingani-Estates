const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema({
    username:{type:String, required: true, unique: true},
    password:{type:String, required: true},
    email:{type:String, required: true, unique: true},
    role: {type:String, enum: ["tenant", "landlord"], required: true},
}, {timestamps: true});

//Encrypt password before saving
userSchema.pre('save', async function (next) {
if(!this.isModified('password')) return next();
this.password = await bcrypt.hash(this.password, 10);
next();    
});

//method for pw comaprison before login
userSchema.methods.comparePassword = function(password) {
    return bcrypt.compare(password, this.password);
};
