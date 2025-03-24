const { fetchPersonalProducts } = require('../services/personalAmazonApi');

async function getPersonalProducts(req, res) {
    try {
        const productsResponse = await fetchPersonalProducts();
        res.json(productsResponse);
    } catch (error) {
        console.error('Error fetching personal products:', error);
        res.status(500).json({ message: "Error fetching products", error: error.message });
    }
}

module.exports = { getPersonalProducts };