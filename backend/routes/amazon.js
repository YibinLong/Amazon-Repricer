const express =  require('express');
const { fetchOrders } = require('../services/amazonApi');
const knex = require('../../database/knex');

const router = express.Router();

router.get('/fetch-orders', async (req, res) => {
    try {
        const ordersResponse = await fetchOrders();

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

module.exports = router;