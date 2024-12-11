const User = require("../models/user");
const bcrypt = require("bcrypt");

const loginUser = async (req, res) => {
    
    const { email, password} = req.body;
    try {
        const user = await User.findOne({email});
        if(!user){
            return res.status(400).json({ message: "User not found"});
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if(!isMatch){
            return res.status(400).json({ message: "Invalid Password"});
        }

        res.status(200).json({ message: "Login successful", user})
    } catch (err) {
        res.status(500).json({ message: "Server error", error: err.message});
    }
};

module.exports = {loginUser};