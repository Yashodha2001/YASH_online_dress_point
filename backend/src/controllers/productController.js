import mongoose from 'mongoose';
import Product from '../models/Product.js';

export async function getProducts(req, res, next) {
  try {
    const { search, category } = req.query;
    const filter = { isActive: true };

    if (search) filter.name = { $regex: search, $options: 'i' };
    if (category) filter.category = category;

    const products = await Product.find(filter).sort({ createdAt: -1 });
    res.json(products);
  } catch (error) {
    next(error);
  }
}

export async function getProductById(req, res, next) {
  try {
    if (!mongoose.isValidObjectId(req.params.id)) {
      return res.status(400).json({ message: 'Invalid product ID.' });
    }

    const product = await Product.findOne({
      _id: req.params.id,
      isActive: true
    });

    if (!product) return res.status(404).json({ message: 'Product not found.' });
    res.json(product);
  } catch (error) {
    next(error);
  }
}

// TODO: Add validation and admin authentication before exposing this endpoint publicly.
export async function createProduct(req, res, next) {
  try {
    const { name, description, price, category } = req.body;
    if (!name || !description || price === undefined || !category) {
      return res.status(400).json({
        message: 'name, description, price, and category are required.'
      });
    }

    const product = await Product.create(req.body);
    res.status(201).json(product);
  } catch (error) {
    next(error);
  }
}
