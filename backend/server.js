// server.js
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
const PORT = process.env.PORT || 3000;

// Configure CORS to allow credentials
app.use(cors({
  origin: 'http://localhost:3001', 
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

app.get('/', (req, res) => {
  res.send('Amazon Repricer Backend');
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
