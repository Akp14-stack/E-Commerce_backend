const Product = require('../Models/Product');

const addProduct = async (req, res) => {
    try {
        const newProduct = new Product(req.body);
        const saved = await newProduct.save();
        res.status(201).json({ status: true, product: saved });
    } catch (err) {
        res.status(500).json({ status: false, message: err.message });
    }
};

const getAllProducts = async (req, res) => {
    try {
        const products = await Product.find();
        res.json({ status: true, products });
    } catch (err) {
        res.status(500).json({ status: false, message: err.message });
    }
};

const getProductById = async (req, res) => {
    try {
        const { id } = req.params;
        const product = await Product.findById(id);
        if (!product) {
            return res.status(404).json({ status: false, message: 'Product not found' });
        }
        res.status(200).json({ status: true, product });
    } catch (err) {
        res.status(500).json({ status: false, message: err.message });
    }
};

const updateProduct = async (req, res) => {
    try {
        const { id } = req.params;
        const updatedProduct = await Product.find
        ByIdAndUpdate
            (id,
                req.body,
                { new: true, runValidators: true }
            );
        if (!updatedProduct) {
            return res.status(404).json({ status: false, message: 'Product not found' });
        }

        res.status(200).json({ status: true, product: updatedProduct });
    } catch (err) {
        res.status(500).json({ status: false, message: err.message });
    }
};

const deleteProduct = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedProduct = await Product.findByIdAndDelete(id);
        if (!deletedProduct) {
            return res.status(404).json({ status: false, message: 'Product not found' });
        }

        res.status(200).json({ status: true, message: 'Product deleted successfully' });
    } catch (err) {
        res.status(500).json({ status: false, message: err.message });
    }
};

module.exports = {
    addProduct,
    getAllProducts,
    updateProduct,
    deleteProduct,
    getProductById
};
