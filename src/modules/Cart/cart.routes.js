// routes/cart.routes.js

import express from 'express';
import { createCart, updateCart, applyCoupon } from './controller/cart.controller.js';

const router = express.Router();

router.post('/', createCart);
router.put('/:id', updateCart);
router.post('/:id/coupon', applyCoupon);

export default router;
