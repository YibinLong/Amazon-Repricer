require('dotenv').config();
const jwt = require('jsonwebtoken')

const secret = process.env.JWT_SECRET;

const auth = (req, res, next) => {
    const token = req.header('Authorization').replace('Bearer ', '');
    if (!token) {
        return res.status(401).json({ message: 'No token, authorization denied'});
    }

    try {
        const decoded = jwt.verify(token, secret);
        req.user = decoded.userId;
        next();
    } catch (err) {
        res.status(401).json({ message: 'Token is not valid' });
    }
};

module.exports = auth;