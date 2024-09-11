const express = require('express');
const router = express.Router();
const Registration = require('../models/registration');

// POST route for registration
router.post('/register', async (req, res) => {
    try {
        const { name, mobileNo, email, billNumber } = req.body;
        const newRegistration = new Registration({
            name,
            mobileNo,
            email,
            billNumber
        });

        await newRegistration.save();
        res.status(201).json({ message: 'Registration successful!' });
    } catch (error) {
        res.status(500).json({ message: 'Error registering user.', error });
    }
});

module.exports = router;

