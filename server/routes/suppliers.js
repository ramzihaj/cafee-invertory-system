const express = require('express');
const router = express.Router();
const {
  getAllSuppliers,
  getSupplier,
  createSupplier,
  updateSupplier,
  deleteSupplier
} = require('../controllers/supplierController');
const { protect, authorize } = require('../middleware/auth');

router.use(protect);

router.get('/', getAllSuppliers);
router.get('/:id', getSupplier);

router.post('/', authorize('admin', 'manager'), createSupplier);
router.put('/:id', authorize('admin', 'manager'), updateSupplier);
router.delete('/:id', authorize('admin'), deleteSupplier);

module.exports = router;
