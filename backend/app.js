const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');

const productRoutes = require('./routes/productRoutes');
const userRoutes = require('./routes/userRoutes')
const favoritesRoutes = require('./routes/favoriteRoutes')
 
dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(express.json());  
app.use(cors()); // Enable CORS for all origins

// connect routes
app.use('/products', productRoutes);
app.use('/users', userRoutes);
app.use('/favorites', favoritesRoutes);

// Start the server
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });