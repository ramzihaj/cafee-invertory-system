const { Supplier, Product } = require('../models');

// @desc    Obtenir tous les fournisseurs
// @route   GET /api/suppliers
// @access  Private
exports.getAllSuppliers = async (req, res, next) => {
  try {
    const { isActive } = req.query;

    const where = {};
    if (isActive !== undefined) {
      where.isActive = isActive === 'true';
    }

    const suppliers = await Supplier.findAll({
      where,
      include: [{ model: Product, as: 'products' }],
      order: [['name', 'ASC']]
    });

    res.json({
      success: true,
      count: suppliers.length,
      data: suppliers
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Obtenir un fournisseur par ID
// @route   GET /api/suppliers/:id
// @access  Private
exports.getSupplier = async (req, res, next) => {
  try {
    const supplier = await Supplier.findByPk(req.params.id, {
      include: [{ model: Product, as: 'products' }]
    });

    if (!supplier) {
      return res.status(404).json({
        success: false,
        message: 'Fournisseur non trouvé'
      });
    }

    res.json({
      success: true,
      data: supplier
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Créer un nouveau fournisseur
// @route   POST /api/suppliers
// @access  Private (Admin/Manager)
exports.createSupplier = async (req, res, next) => {
  try {
    const supplier = await Supplier.create(req.body);

    res.status(201).json({
      success: true,
      data: supplier
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Mettre à jour un fournisseur
// @route   PUT /api/suppliers/:id
// @access  Private (Admin/Manager)
exports.updateSupplier = async (req, res, next) => {
  try {
    const supplier = await Supplier.findByPk(req.params.id);

    if (!supplier) {
      return res.status(404).json({
        success: false,
        message: 'Fournisseur non trouvé'
      });
    }

    await supplier.update(req.body);

    res.json({
      success: true,
      data: supplier
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Supprimer un fournisseur (soft delete)
// @route   DELETE /api/suppliers/:id
// @access  Private (Admin)
exports.deleteSupplier = async (req, res, next) => {
  try {
    const supplier = await Supplier.findByPk(req.params.id);

    if (!supplier) {
      return res.status(404).json({
        success: false,
        message: 'Fournisseur non trouvé'
      });
    }

    await supplier.update({ isActive: false });

    res.json({
      success: true,
      message: 'Fournisseur désactivé avec succès'
    });
  } catch (error) {
    next(error);
  }
};
