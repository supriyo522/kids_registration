const mongoose = require('mongoose');

const registrationSchema = new mongoose.Schema({
    name: { type: String, required: true },
    mobileNo: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    billNumber: { type: String, required: true, unique: true }
});

// Create unique index to ensure uniqueness in the database
registrationSchema.index({ mobileNo: 1, email: 1, billNumber: 1 }, { unique: true });

const Registration = mongoose.model('Registration', registrationSchema);

module.exports = Registration;
