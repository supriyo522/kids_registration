const express = require('express');
const router = express.Router();
const Registration = require('../models/registration');

// POST route for registration
router.post('/register', async (req, res) => {
    try {
        const { name, mobileNo, email, billNumber } = req.body;

        // Check if a registration with the same mobileNo, email, or billNumber already exists
        const existingRegistration = await Registration.findOne({
            $or: [
                { mobileNo: mobileNo },
                { email: email },
                { billNumber: billNumber }
            ]
        });

        if (existingRegistration) {
            return res.status(400).json({ message: 'A user with the same mobile number, email, or bill number already exists.' });
        }

        // Proceed to create the new registration
        const newRegistration = new Registration({
            name,
            mobileNo,
            email,
            billNumber
        });

        await newRegistration.save();
        res.status(201).json({ message: 'Registration successful!' });
    } catch (error) {
        if (error.code === 11000) {
            // Duplicate key error (MongoDB unique index violation)
            return res.status(400).json({ message: 'Duplicate entry detected for mobileNo, email, or billNumber.' });
        }
        res.status(500).json({ message: 'Error registering user.', error });
    }
});

module.exports = router;

