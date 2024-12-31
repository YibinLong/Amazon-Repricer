const express =  require('express');
const { fetchOrders, fetchProducts } = require('../services/amazonApi');
const knex = require('../../database/knex');
const checkAmazonAuth = require('../middleware/checkAmazonAuth');
const auth = require('../middleware/auth');

const router = express.Router();

router.get('/fetch-orders', async (req, res) => {
    try {
        const ordersResponse = await fetchOrders(req);

        const orders = ordersResponse.payload.Orders;

        // store order data in database
        for (const order of orders) {
            await knex('orders').insert({
                order_id: order.AmazonOrderId,
                purchase_date: order.PurchaseDate,
                status: order.OrderStatus,
            });
        }

        res.json(ordersResponse);
    } catch (error) {
        console.error('Error fetching orders:', error.response ? error.response.data : error.message);
        res.status(500).json({ message: "Error fetching orders", error: error.message });
    }
});

router.get('/products', auth, checkAmazonAuth, async (req, res) => {
    try {
        const productsResponse = await fetchProducts(req);
        res.json(productsResponse);
    } catch (error) {
        console.error('Error fetching products:', error);
        res.status(500).json({ message: "Error fetching products", error: error.message });
    }
});

module.exports = router;