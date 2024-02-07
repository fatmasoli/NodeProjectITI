import express from 'express';
import {
  addCoupon,
  updateCoupon,
  deleteCoupon,
  getAllCoupons,
} from './controller/coupon.controller.js';

const router = express.Router();

router.post('/add', addCoupon);
router.put('/update/:id', updateCoupon);
router.delete('/delete/:id', deleteCoupon);
router.get('/getAll', getAllCoupons);
router.post('/applyToProduct/:productId');

export default router;