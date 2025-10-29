const express = require('express');
const router = express.Router();
const {
  getAllProducts,
  getProduct,
  createProduct,
  updateProduct,
  deleteProduct,
  getLowStockProducts
} = require('../controllers/productController');
const { protect, authorize } = require('../middleware/auth');

router.use(protect); // Toutes les routes nécessitent une authentification

router.get('/', getAllProducts);
router.get('/alerts/low-stock', getLowStockProducts);
router.get('/:id', getProduct);

// Routes nécessitant les droits admin ou manager
router.post('/', authorize('admin', 'manager'), createProduct);
router.put('/:id', authorize('admin', 'manager'), updateProduct);
router.delete('/:id', authorize('admin'), deleteProduct);

module.exports = router;
