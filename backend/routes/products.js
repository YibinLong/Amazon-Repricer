const express = require('express');
const knex = require('../../database/knex');

const router = express.Router();

// create a product
router.post('/', async (req, res) => {
    try {
        const { asin, title, price, status, user_id } = req.body;
        const [id] = await knex('products').insert({ asin, title, price, status, user_id }).returning('id');
        res.status(201).json({ id });
    } catch (error) {
        res.status(500).json({ message: 'Error creating product' });
    }
});

// read a product
router.get('/:id', async (req, res) => {
    try {
        const product = await knex('products').where({ id: req.params.id }).first();
        res.json(product);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching product' });
    }
});
