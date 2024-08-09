// server.js
const express = require('express');
const app = express();
const authRoutes = require('./routes/auth');
const protectedRoutes = require('./routes/protectedRoutes');

const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use('/api/auth', authRoutes);
app.use('/api', protectedRoutes); 

app.get('/', (req, res) => {
  res.send('Amazon Repricer Backend');
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
