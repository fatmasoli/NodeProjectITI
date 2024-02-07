// models/cart.model.js

import mongoose from 'mongoose';

const cartSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  totalPrice: { type: Number, required: true },
  priceAfterDiscount: { type: Number },
  products: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Product' }]
});

const Cart = mongoose.model('Cart', cartSchema);

export default Cart;
