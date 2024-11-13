const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema({
    username:{type:String, required: true, unique: true},
    password:{type:String, required: true},
    email:{type:String, required: true, unique: true},
    role: {type:String, enum: ["tenant", "landlord"], required: true},
}, {timestamps: true});