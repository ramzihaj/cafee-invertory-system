const express = require('express');
const router = express.Router();
const {
  getAllMovements,
  createMovement,
  getProductHistory
} = require('../controllers/movementController');
const { protect } = require('../middleware/auth');

router.use(protect);

router.get('/', getAllMovements);
router.post('/', createMovement);
router.get('/product/:productId', getProductHistory);

module.exports = router;
