const config = require('../Config/config');
const jwt = require('jsonwebtoken');

// Middleware to verify token and decode user info
const verifyToken = async (req, res, next) => {
    const authHeader = req.header('authorization');
    if (!authHeader) {
        return res.status(401).json({
            status: false,
            message: 'Access denied. No token provided.',
        });
    }

    const token = authHeader.split(' ')[1]; // Bearer <token>
    if (!token) {
        return res.status(401).json({
            status: false,
            message: 'Access denied. Invalid token format.',
        });
    }

    try {
        const decoded = jwt.verify(token, config.JWT_SECRET_KEY);
        req.user = decoded; // decoded = { id, email, role, ... }
        next();
    } catch (err) {
        return res.status(401).json({
            status: false,
            message: 'Invalid or expired token.',
        });
    }
};

// Middleware to check if user is admin
const verifyAdmin = async (req, res, next) => {
    if (!req.user || req.user.role !== 'admin') {
        return res.status(403).json({
            status: false,
            message: 'Access denied. Admins only.',
        });
    }
    next();
};

module.exports = {
    verifyToken,
    verifyAdmin
};
