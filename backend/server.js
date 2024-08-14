// server.js
const express = require('express');


const authRoutes = require('./routes/auth');
const protectedRoutes = require('./routes/protectedRoutes');
const amazonRoutes = require('./routes/amazon');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use('/api/auth', authRoutes);
app.use('/api', protectedRoutes); 
app.use('/api/amazon', amazonRoutes)

app.get('/', (req, res) => {
  res.send('Amazon Repricer Backend');
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
