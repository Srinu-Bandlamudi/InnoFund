const jwt = require('jsonwebtoken');
const { JWT_KEY } = require('../config/serverConfig');
const {User} = require('../models/index');

const authenticate = async (req, res, next) => {
    const token = req.header('Authorization').replace('Bearer ', '');
    if (!token) {
        return res.status(401).json({ message: 'Authentication required' });
    }
    
    try {
        const decoded = jwt.verify(token, JWT_KEY);
        req.user = decoded; // Attach user data to request object
        next();
    } catch (error) {
        return res.status(401).json({ message: 'Invalid token' });
    }
};

const authorizeAdmin = (req, res, next) => {
    if (req.user && req.user.role === 'admin') {
        next();
    } else {
        return res.status(403).json({ message: 'Admin access required' });
    }
};

module.exports = { authenticate, authorizeAdmin };
