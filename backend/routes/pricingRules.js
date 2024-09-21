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

// read pricing rules for a product
router.get('/product/:product_id', async (req, res) => {
  try {
    const rules = await knex('pricing_rules').where({ product_id: req.params.product_id });
    res.json(rules);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching pricing rules' });
  }
});

// update a pricing rule
router.put('/:id', async (req, res) => {
  try {
    const { min_price, max_price, target_price } = req.body;
    await knex('pricing_rules').where({ id: req.params.id }).update({ min_price, max_price, target_price });
    res.json({ message: 'Pricing rule updated' });
  } catch (error) {
    res.status(500).json({ message: 'Error updating pricing rule' });
  }
});

// delete a pricing rule
router.delete('/:id', async (req, res) => {
  try {
    await knex('pricing_rules').where({ id: req.params.id }).del();
    res.json({ message: 'Pricing rule deleted' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting pricing rule' });
  }
});

module.exports = router;
