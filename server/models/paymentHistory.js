const mongoose = require("mongoose");

const paymentHistorySchema = new mongoose.Schema({});

module.exports = mongoose.model('paymentHistory', paymentHistorySchema);