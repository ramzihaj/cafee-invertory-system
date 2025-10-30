const express = require('express');
const router = express.Router();
const {
  getAllUsers,
  createUser,
  updateUser,
  deleteUser,
  getUserStats
} = require('../controllers/userController');
const { protect, authorize } = require('../middleware/auth');

router.use(protect);

// Routes Admin uniquement
router.get('/', authorize('admin'), getAllUsers);
router.post('/', authorize('admin'), createUser);
router.put('/:id', authorize('admin'), updateUser);
router.delete('/:id', authorize('admin'), deleteUser);

// Routes Admin/Manager
router.get('/:id/stats', authorize('admin', 'manager'), getUserStats);

module.exports = router;
