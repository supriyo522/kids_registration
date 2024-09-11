const mongoose = require('mongoose');

const registrationSchema = new mongoose.Schema({
    name: String,
    mobileNo: String,
    email: String,
    billNumber: String
});

const Registration = mongoose.model('Registration', registrationSchema);

module.exports = Registration;

