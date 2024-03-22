// server.js
const express = require('express');
const axios = require('axios');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(cors());

// Fetch initial data from FakeStoreAPI
let products = [];

async function fetchProducts() {
  try {
    const response = await axios.get('https://fakestoreapi.com/products');
    products = response.data;
    console.log('Initial data fetched successfully.');
  } catch (error) {
    console.error('Error fetching initial data:', error.message);
  }
}

fetchProducts();

// API endpoints
app.get('/api/products', (req, res) => {
   const page = parseInt(req.query.page) || 1; // Default to page 1 if no query param is provided
  const limit = parseInt(req.query.limit) || 10; // Default limit to 10 items per page

  const startIndex = (page - 1) * limit;
  const endIndex = page * limit;

  const paginatedProducts = products.slice(startIndex, endIndex);

  res.json({
    totalItems: products.length,
    totalPages: Math.ceil(products.length / limit),
    currentPage: page,
    products: paginatedProducts
  });
});

app.post('/api/products', (req, res) => {
    try {
      const newProduct = req.body;
      products.push(newProduct);
      res.status(201).json(newProduct);
    } catch (error) {
      console.error('Error adding product:', error.message);
      res.status(500).json({ error: 'Failed to add product' });
    }
  });

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
