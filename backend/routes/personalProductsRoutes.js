const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const { getPersonalProducts } = require('../controllers/personalProductsController');

router.get('/', auth, getPersonalProducts);

module.exports = router;