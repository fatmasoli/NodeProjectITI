import Cart from '../../../../db/Models/cart.model.js';
import Coupon from '../../../../db/Models/coupon.js';
import Order from '../../../../db/Models/order.js';

// Create cart
export const createCart = async (req, res) => {
  try {
    const { userId, totalPrice, products } = req.body;
    const newCart = new Cart({ userId, totalPrice, products });
    const savedCart = await newCart.save();
    res.status(201).json(savedCart);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update cart
export const updateCart = async (req, res) => {
  try {
    const { cartId } = req.params;
    const { totalPrice, products } = req.body;

    const updatedCart = await Cart.findByIdAndUpdate(
      cartId,
      { totalPrice, products },
      { new: true }
    );

    if (!updatedCart) {
      return res.status(404).json({ message: 'Cart not found' });
    }

    res.status(200).json(updatedCart);
  } catch (error) {
    res.status(500).json({ message: error.message }); 
  }
};

// Apply coupon on cart
export const applyCoupon = async (req, res) => {
  try {
    const { cartId, couponCode } = req.params;

    // Retrieve cart by ID
    const cart = await Cart.findById(cartId);

    if (!cart) {
      return res.status(404).json({ message: 'Cart not found' });
    }

    // Retrieve coupon by code
    const coupon = await Coupon.findOne({ code: couponCode });

    if (!coupon) {
      return res.status(404).json({ message: 'Coupon not found' });
    }

    // Check if coupon is valid
    if (coupon.expiresAt < Date.now()) {
      return res.status(400).json({ message: 'Coupon has expired' });
    }

    // Apply discount to cart's total price
    const discount = (coupon.discount / 100) * cart.totalPrice;
    const totalPriceAfterDiscount = cart.totalPrice - discount;

    // Update cart with discounted price
    const updatedCart = await Cart.findByIdAndUpdate(
      cartId,
      { totalPrice: totalPriceAfterDiscount },
      { new: true }
    );

    if (!updatedCart) {
      return res.status(404).json({ message: 'Failed to apply coupon' });
    }

    res.status(200).json(updatedCart);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Create order cash on delivery
export const createOrderCOD = async (req, res) => {
  try {
    const { userId, totalPrice, products } = req.body;

    // Create order with cash on delivery
    const newOrder = new Order({ userId, totalPrice, products, paymentMethod: 'Cash on Delivery' });
    const savedOrder = await newOrder.save();

    // Optionally, you can remove the cart or mark it as ordered
    // await Cart.findByIdAndRemove(req.params.cartId);
    // Or
    // const updatedCart = await Cart.findByIdAndUpdate(req.params.cartId, { ordered: true }, { new: true });

    res.status(201).json(savedOrder);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
