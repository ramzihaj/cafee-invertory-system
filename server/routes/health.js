const express = require('express');
const router = express.Router();
const { sequelize } = require('../config/database');

/**
 * @route   GET /api/health
 * @desc    Health check endpoint pour Docker/K8s
 * @access  Public
 */
router.get('/', async (req, res) => {
  try {
    // Vérifier la connexion à la base de données
    await sequelize.authenticate();
    
    const healthcheck = {
      status: 'OK',
      timestamp: new Date().toISOString(),
      uptime: process.uptime(),
      environment: process.env.NODE_ENV || 'development',
      database: 'connected',
      memory: {
        used: Math.round(process.memoryUsage().heapUsed / 1024 / 1024) + ' MB',
        total: Math.round(process.memoryUsage().heapTotal / 1024 / 1024) + ' MB'
      }
    };

    res.status(200).json(healthcheck);
  } catch (error) {
    const healthcheck = {
      status: 'ERROR',
      timestamp: new Date().toISOString(),
      database: 'disconnected',
      error: error.message
    };
    
    res.status(503).json(healthcheck);
  }
});

module.exports = router;
