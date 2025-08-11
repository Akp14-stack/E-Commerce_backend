const express = require('express');
const { 
  addProduct, 
  getAllProducts, 
  updateProduct, 
  deleteProduct, 
  getProductById,
  getFeaturedProducts  // <-- import new controller
} = require('../Controllers/productController');

const { verifyToken, verifyAdmin } = require('../Middleware/authMiddleware');
const router = express.Router();

router.post('/add', verifyToken, verifyAdmin, addProduct); // Only admin can add
router.get('/all', getAllProducts); // Public route to fetch all products
router.get('/featured', getFeaturedProducts); // New route for featured products

router.put('/update/:id', verifyToken, verifyAdmin, updateProduct); // Only admin can update
router.delete('/delete/:id', verifyToken, verifyAdmin, deleteProduct); // Only admin can delete
router.get('/:id', getProductById); // Fetch product by ID

module.exports = router;
