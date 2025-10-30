const express = require('express');
const router = express.Router();
const {
  generateCoupon,
  getAllCoupons,
  verifyCoupon,
  useCoupon,
  deleteCoupon
} = require('../controllers/couponController');
const { protect, authorize } = require('../middleware/auth');

// Routes publiques
router.post('/verify', verifyCoupon);
router.put('/use', useCoupon);

// Routes protégées (Admin uniquement)
router.use(protect);
router.use(authorize('admin'));

router.post('/', generateCoupon);
router.get('/', getAllCoupons);
router.delete('/:id', deleteCoupon);

module.exports = router;
