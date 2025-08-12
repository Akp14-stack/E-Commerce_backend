const Product = require('../Models/Product');

// ✅ Add new product
const addProduct = async (req, res) => {
  try {
    // Allow featured field from req.body or default to false
    const { featured = false } = req.body;
    const newProduct = new Product({ ...req.body, featured });
    const savedProduct = await newProduct.save();

    res.status(201).json({
      status: true,
      message: 'Product created successfully',
      product: savedProduct
    });
  } catch (err) {
    res.status(500).json({
      status: false,
      message: err.message
    });
  }
};

// ✅ Get all products (optionally filter featured via query)
const getAllProducts = async (req, res) => {
  try {
    const filter = {};
    if (req.query.featured === 'true') {
      filter.featured = true;
    }

    const products = await Product.find(filter);

    res.status(200).json({
      status: true,
      products
    });
  } catch (err) {
    res.status(500).json({
      status: false,
      message: err.message
    });
  }
};

// ✅ Get only featured products (direct route)
const getFeaturedProducts = async (req, res) => {
  try {
    const featuredProducts = await Product.find({ featured: true });

    res.status(200).json({
      status: true,
      products: featuredProducts
    });
  } catch (err) {
    res.status(500).json({
      status: false,
      message: err.message
    });
  }
};

// ✅ Get product by ID
const getProductById = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findById(id);

    if (!product) {
      return res.status(404).json({
        status: false,
        message: 'Product not found'
      });
    }

    res.status(200).json({
      status: true,
      product
    });
  } catch (err) {
    res.status(500).json({
      status: false,
      message: err.message
    });
  }
};

// ✅ Update product by ID
const updateProduct = async (req, res) => {
  try {
    const { id } = req.params;

    const updatedProduct = await Product.findByIdAndUpdate(
      id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!updatedProduct) {
      return res.status(404).json({
        status: false,
        message: 'Product not found'
      });
    }

    res.status(200).json({
      status: true,
      message: 'Product updated successfully',
      product: updatedProduct
    });
  } catch (err) {
    res.status(500).json({
      status: false,
      message: err.message
    });
  }
};

// ✅ Delete product by ID
const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedProduct = await Product.findByIdAndDelete(id);

    if (!deletedProduct) {
      return res.status(404).json({
        status: false,
        message: 'Product not found'
      });
    }

    res.status(200).json({
      status: true,
      message: 'Product deleted successfully'
    });
  } catch (err) {
    res.status(500).json({
      status: false,
      message: err.message
    });
  }
};

module.exports = {
  addProduct,
  getAllProducts,
  getFeaturedProducts,
  getProductById,
  updateProduct,
  deleteProduct
};
