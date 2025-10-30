const { Table, User } = require('../models');

// @desc    Obtenir toutes les tables
// @route   GET /api/tables
// @access  Private
exports.getAllTables = async (req, res, next) => {
  try {
    const { status, assignedTo } = req.query;
    const where = { isActive: true };

    if (status) where.status = status;
    if (assignedTo) where.assignedTo = assignedTo;

    const tables = await Table.findAll({
      where,
      include: [
        { model: User, as: 'assignedEmployee', attributes: ['id', 'name'] }
      ],
      order: [['number', 'ASC']]
    });

    res.json({
      success: true,
      count: tables.length,
      data: tables
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Créer une table (Admin/Manager)
// @route   POST /api/tables
// @access  Private (Admin/Manager)
exports.createTable = async (req, res, next) => {
  try {
    const { number, capacity, assignedTo } = req.body;

    const tableExists = await Table.findOne({ where: { number } });
    if (tableExists) {
      return res.status(400).json({
        success: false,
        message: 'Une table avec ce numéro existe déjà'
      });
    }

    const table = await Table.create({
      number,
      capacity,
      assignedTo
    });

    res.status(201).json({
      success: true,
      data: table
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Mettre à jour une table (Admin/Manager)
// @route   PUT /api/tables/:id
// @access  Private (Admin/Manager)
exports.updateTable = async (req, res, next) => {
  try {
    const table = await Table.findByPk(req.params.id);

    if (!table) {
      return res.status(404).json({
        success: false,
        message: 'Table non trouvée'
      });
    }

    await table.update(req.body);

    res.json({
      success: true,
      data: table
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Supprimer une table (Admin/Manager)
// @route   DELETE /api/tables/:id
// @access  Private (Admin/Manager)
exports.deleteTable = async (req, res, next) => {
  try {
    const table = await Table.findByPk(req.params.id);

    if (!table) {
      return res.status(404).json({
        success: false,
        message: 'Table non trouvée'
      });
    }

    await table.update({ isActive: false });

    res.json({
      success: true,
      message: 'Table désactivée avec succès'
    });
  } catch (error) {
    next(error);
  }
};

module.exports = exports;
