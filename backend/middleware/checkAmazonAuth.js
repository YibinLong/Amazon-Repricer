const checkAmazonAuth = (req, res, next) => {
    if (!req.session.isAmazonAuthenticated) {
        return res.status(401).json({ 
            message: 'Amazon authentication required',
            requiresAmazonAuth: true 
        });
    }
    next();
};

module.exports = checkAmazonAuth; 