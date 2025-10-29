const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/auth');

// TODO: Implémenter les contrôleurs de rapports (PDF/Excel)
// Ces routes seront pour générer des rapports exportables

router.use(protect);

router.get('/stock', async (req, res) => {
  res.json({ success: true, message: 'Rapport de stock - À implémenter' });
});

router.get('/sales', async (req, res) => {
  res.json({ success: true, message: 'Rapport des ventes - À implémenter' });
});

router.get('/movements', async (req, res) => {
  res.json({ success: true, message: 'Rapport des mouvements - À implémenter' });
});

module.exports = router;
