// server.js
const express = require('express');
const cors = require('cors');

const authRoutes = require('./routes/auth');
const protectedRoutes = require('./routes/protectedRoutes');
const amazonRoutes = require('./routes/amazon');
const productRoutes = require('./routes/products');
const pricingRulesRoutes = require('./routes/pricingRules');
const auth = require('./middleware/auth');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use('/api/auth', authRoutes);
app.use('/api', protectedRoutes); 
app.use('/api/amazon', amazonRoutes)
app.use('/api/products', auth, productRoutes);
app.use('/api/pricing-rules', auth, pricingRulesRoutes);

app.get('/', (req, res) => {
  res.send('Amazon Repricer Backend');
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
