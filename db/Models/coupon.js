import mongoose from 'mongoose';

const couponSchema = new mongoose.Schema({
  couponCode: { type: String, required: true, unique: true },
  value: { type: Number, required: true },
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  updatedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  deletedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  expireIn: { type: Date, required: true },
});

const Coupon = mongoose.model('Coupon', couponSchema);

export default Coupon;