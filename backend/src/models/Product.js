import mongoose from 'mongoose';

const variantSchema = new mongoose.Schema({

  size: { type: String, trim: true, required: true },
  color: { type: String, trim: true, required: true },
  stock: { type: Number, min: 0, default: 0 }

}, { _id: false });

const productSchema = new mongoose.Schema({

  name: { type: String, required: true, trim: true },
  description: { type: String, required: true, trim: true },
  price: { type: Number, required: true, min: 0 },
  category: { type: String, required: true, trim: true },
  images: [{ type: String, trim: true }],
  variants: [variantSchema],
  isFeatured: { type: Boolean, default: false },
  isActive: { type: Boolean, default: true }
  
}, { timestamps: true });

export default mongoose.model('Product', productSchema);
