const express = require('express');
const cors = require('cors');
const session = require('express-session');

const authRoutes = require('./routes/auth');
const protectedRoutes = require('./routes/protectedRoutes');
const amazonRoutes = require('./routes/amazon');
const productRoutes = require('./routes/products');
const pricingRulesRoutes = require('./routes/pricingRules');
const amazonAuthRoutes = require('./routes/amazonAuth');

const app = express();
const port = process.env.PORT || 3001;

// Configure CORS to allow credentials
// DO NOT CHANGE 3000 - accepts from 3000 (AKA frontend)
app.use(cors({
  origin: 'http://localhost:3000', 
  credentials: true
}));

app.use(express.json());

// Configure session middleware
app.use(session({
  secret: process.env.SESSION_SECRET || 'your_secret_key', // Use a secure secret in production
  resave: false,
  saveUninitialized: false,
  cookie: {
    secure: false, // Set to true if using HTTPS
    httpOnly: true,
    maxAge: 1000 * 60 * 60 * 24 // 1 day
  }
}));

app.use('/api/auth', authRoutes);
app.use('/api', protectedRoutes); 
app.use('/api/amazon', amazonRoutes);
app.use('/api/products', productRoutes);
app.use('/api/pricing-rules', pricingRulesRoutes);
app.use('/api/amazon-auth', amazonAuthRoutes);
app.use('/api/personal/products', require('./routes/personalProducts'));

app.get('/', (req, res) => {
  res.send('Amazon Repricer Backend!');
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
