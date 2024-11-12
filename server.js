require('dotenv').config();
const express = require('express');
const rateLimit = require('express-rate-limit');
const userRoutes = require('./src/routes/userRoutes');

const app = express();
const PORT = process.env.PORT || 3000;

// Config base do Rate limiting
const limit = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
});
app.use(limit);

app.use(express.json());
app.use('/api/users', userRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
