const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Product name is required'],
    trim: true,
  },
  description: {
    type: String,
    trim: true,
    default: '',
  },
  price: {
    type: Number,
    required: [true, 'Product price is required'],
    min: [0, 'Price must be non-negative'],
  },
  image: {
    type: String,
    default: '', // allow empty initially
  },
  category: {
    type: String,
    trim: true,
    default: '',
  },
  stock: {
    type: Number,
    default: 0,
    min: [0, 'Stock cannot be negative'],
  },
  featured: {
    type: Boolean,
    default: false, // default not featured
  }
}, { timestamps: true });

module.exports = mongoose.model('Product', productSchema);
