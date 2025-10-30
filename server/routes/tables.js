const express = require('express');
const router = express.Router();
const {
  getAllTables,
  createTable,
  updateTable,
  deleteTable
} = require('../controllers/tableController');
const { protect, authorize } = require('../middleware/auth');

router.use(protect);

router.get('/', getAllTables);
router.post('/', authorize('admin', 'manager'), createTable);
router.put('/:id', authorize('admin', 'manager'), updateTable);
router.delete('/:id', authorize('admin', 'manager'), deleteTable);

module.exports = router;
