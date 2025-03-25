const express = require('express');
const cors = require('cors');

const authRoutes = require('./routes/authRoutes');
const protectedRoutes = require('./routes/protectedRoutes');
const productRoutes = require('./routes/products');
const pricingRulesRoutes = require('./routes/pricingRules');
const personalProductsRoutes = require('./routes/personalProductsRoutes');

const app = express();
const PORT = process.env.PORT || 3001;

// DO NOT CHANGE 3000 - accepts from 3000 (AKA frontend)
app.use(cors({
  origin: 'http://localhost:3000'
}));

app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api', protectedRoutes); 
app.use('/api/products', productRoutes);
app.use('/api/pricing-rules', pricingRulesRoutes);
app.use('/api/personal/products', personalProductsRoutes);

app.get('/', (req, res) => {
  res.send('Amazon Repricer Backend!');
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
