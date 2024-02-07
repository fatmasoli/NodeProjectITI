import Coupon from '../../../../db/Models/coupon.js'
import couponValidation from '../coupon.Validation.js';

export const addCoupon = async (req, res) => {
  try {
    const { error } = couponValidation.validate(req.body);
    if (error) return res.status(400).json({ message: error.details[0].message });

    const newCoupon = new Coupon(req.body);
    const savedCoupon = await newCoupon.save();
    res.json({ message: 'Coupon added successfully', coupon: savedCoupon });
  } catch (error) {
    res.status(500).json({ message: 'Internal server error', error });
  }
};
export const getAllCoupons = async (req, res) => {
  try {
    const coupons = await Coupon.find();
    res.json({ message: 'Coupons retrieved successfully', coupons });
  } catch (error) {
    res.status(500).json({ message: 'Internal server error', error });
  }
};export const updateCoupon = async (req, res) => {
  try {
    const couponId = req.params.id;
    const { couponCode, value } = req.body;

    // Check if the coupon exists
    const existingCoupon = await couponModel.findById(couponId);
    if (!existingCoupon) {
      return res.status(404).json({ message: 'Coupon not found' });
    }

    // Update coupon details
    existingCoupon.couponCode = couponCode;
    existingCoupon.value = value;

    // Save the updated coupon
    const updatedCoupon = await existingCoupon.save();

    res.json({ message: 'Coupon updated successfully', coupon: updatedCoupon });
  } catch (error) {
    res.status(500).json({ message: 'Internal server error', error });
  }
};

export const deleteCoupon = async (req, res) => {
  try {
    const couponId = req.params.id;

    // Check if the coupon exists
    const deletedCoupon = await couponModel.findByIdAndDelete(couponId);

    if (deletedCoupon) {
      res.json({ message: 'Coupon deleted successfully', coupon: deletedCoupon });
    } else {
      res.status(404).json({ message: 'Coupon not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message, data: null });
  }
};