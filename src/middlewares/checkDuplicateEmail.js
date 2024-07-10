const Official = require('../models/officials-details-model');

const checkDuplicateEmail = async (req, res, next) => {
    try {
        const { email } = req.body;
        if (!email) {
            return res.status(400).json({ error: 'Email is required' });
        }

        const existingOfficial = await Official.findOne({ email });
        if (existingOfficial) {
            return res.status(400).json({ error: 'Email already exists' });
        }
        next();
    } catch (error) {
        res.status(500).json({ error: 'An error occurred while checking for duplicate email' });
    }
};

module.exports = checkDuplicateEmail;
