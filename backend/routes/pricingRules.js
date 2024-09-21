const express = require('express');
const knex = require('../../database/knex');

const router = express.Router();

// create a pricing rule
router.post('/', async (req, res) => {
  try {
    const { product_id, min_price, max_price, target_price } = req.body;
    const [id] = await knex('pricing_rules').insert({ product_id, min_price, max_price, target_price }).returning('id');
    res.status(201).json({ id });
  } catch (error) {
    res.status(500).json({ message: 'Error creating pricing rule' });
  }
});
