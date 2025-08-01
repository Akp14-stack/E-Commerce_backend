const express = require('express');
const { addProduct, getAllProducts, updateProduct, deleteProduct, getProductById} = require('../Controllers/productController');
const { verifyToken, verifyAdmin } = require('../Middleware/authMiddleware');
const router = express.Router();

router.post('/add', verifyToken, verifyAdmin, addProduct); // Only admin can add
router.get('/all', getAllProducts); // Public route to fetch products
router.put('/update/:id', verifyToken, verifyAdmin, updateProduct); // Only admin can update
router.delete('/delete/:id', verifyToken, verifyAdmin, deleteProduct); // Only admin can delete
router.get('/:id', getProductById); // Fetch product by ID


module.exports = router;
