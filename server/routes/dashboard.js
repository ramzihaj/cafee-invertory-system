const express = require('express');
const router = express.Router();
const {
  getDashboardStats,
  getPeriodStats
} = require('../controllers/dashboardController');
const { protect } = require('../middleware/auth');

router.use(protect);

router.get('/stats', getDashboardStats);
router.get('/period-stats', getPeriodStats);

module.exports = router;
