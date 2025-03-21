const express = require('express');
const { fetchPersonalProducts } = require('../services/personalAmazonApi');
const auth = require('../middleware/auth');

const router = express.Router();

router.get('/', auth, async (req, res) => {
    try {
        const productsResponse = await fetchPersonalProducts();
        res.json(productsResponse);
    } catch (error) {
        console.error('Error fetching personal products:', error);
        res.status(500).json({ message: "Error fetching products", error: error.message });
    }
});

module.exports = router;


