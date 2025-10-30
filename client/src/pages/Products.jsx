import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from 'react-query';
import { Package, Search, Plus, Edit2, Trash2, AlertCircle, X } from 'lucide-react';
import api from '../lib/api';

const Products = () => {
  const [search, setSearch] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    categoryId: '',
    description: '',
    unit: 'pièce',
    currentStock: 0,
    minStock: 10,
    maxStock: 1000,
    unitPrice: 0,
    supplierId: '',
    barcode: '',
    isActive: true
  });
  const [errors, setErrors] = useState({});

  const queryClient = useQueryClient();

  const { data: products, isLoading } = useQuery('products', async () => {
    const { data } = await api.get('/products');
    return data.data;
  });

  const { data: categories } = useQuery('categories', async () => {
    const { data } = await api.get('/categories');
    return data.data;
  });

  const { data: suppliers } = useQuery('suppliers', async () => {
    const { data } = await api.get('/suppliers');
    return data.data;
  });

  const createProductMutation = useMutation(
    (productData) => api.post('/products', productData),
    {
      onSuccess: () => {
        queryClient.invalidateQueries('products');
        setShowModal(false);
        resetForm();
        alert('Produit créé avec succès!');
      },
      onError: (error) => {
        alert('Erreur lors de la création du produit: ' + (error.response?.data?.message || error.message));
      }
    }
  );

  const resetForm = () => {
    setFormData({
      name: '',
      categoryId: '',
      description: '',
      unit: 'pièce',
      currentStock: 0,
      minStock: 10,
      maxStock: 1000,
      unitPrice: 0,
      supplierId: '',
      barcode: '',
      isActive: true
    });
    setErrors({});
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
    // Clear error for this field
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.name.trim()) {
      newErrors.name = 'Le nom du produit est requis';
    }
    
    if (!formData.categoryId) {
      newErrors.categoryId = 'La catégorie est requise';
    }
    
    if (formData.minStock < 0) {
      newErrors.minStock = 'Le stock minimum ne peut pas être négatif';
    }
    
    if (formData.unitPrice < 0) {
      newErrors.unitPrice = 'Le prix ne peut pas être négatif';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    // Prepare data - convert strings to numbers and remove empty strings
    const productData = {
      ...formData,
      categoryId: parseInt(formData.categoryId),
      currentStock: parseFloat(formData.currentStock) || 0,
      minStock: parseFloat(formData.minStock),
      maxStock: parseFloat(formData.maxStock),
      unitPrice: parseFloat(formData.unitPrice),
      supplierId: formData.supplierId ? parseInt(formData.supplierId) : null,
      barcode: formData.barcode || null
    };

    createProductMutation.mutate(productData);
  };

  const filteredProducts = products?.filter(product =>
    product.name.toLowerCase().includes(search.toLowerCase())
  );

  if (isLoading) {
    return <div className="flex items-center justify-center h-64"><div className="spinner"></div></div>;
  }

  return (
    <div className="space-y-6">
      {/* En-tête */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Produits</h1>
          <p className="text-gray-600 mt-1">{products?.length || 0} produits au total</p>
        </div>
        <button 
          className="btn btn-primary mt-4 sm:mt-0"
          onClick={() => setShowModal(true)}
        >
          <Plus className="h-5 w-5 mr-2" />
          Nouveau Produit
        </button>
      </div>

      {/* Barre de recherche */}
      <div className="card">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
          <input
            type="text"
            placeholder="Rechercher un produit..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="input pl-10"
          />
        </div>
      </div>

      {/* Liste des produits */}
      <div className="card p-0">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Produit</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Catégorie</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Stock</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Prix</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Statut</th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredProducts?.map((product) => (
                <tr key={product.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <Package className="h-8 w-8 text-gray-400 mr-3" />
                      <div>
                        <div className="font-medium text-gray-900">{product.name}</div>
                        <div className="text-sm text-gray-500">{product.description?.substring(0, 30)}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {product.category?.name}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <span className={`font-medium ${product.currentStock <= product.minStock ? 'text-red-600' : 'text-gray-900'}`}>
                        {product.currentStock} {product.unit}
                      </span>
                      {product.currentStock <= product.minStock && (
                        <AlertCircle className="h-4 w-4 text-red-500 ml-2" />
                      )}
                    </div>
                    <div className="text-xs text-gray-500">Min: {product.minStock}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {product.unitPrice} €
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {product.isActive ? (
                      <span className="badge badge-success">Actif</span>
                    ) : (
                      <span className="badge badge-danger">Inactif</span>
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <button className="text-coffee-600 hover:text-coffee-900 mr-3">
                      <Edit2 className="h-4 w-4" />
                    </button>
                    <button className="text-red-600 hover:text-red-900">
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal Ajouter un Produit */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between p-6 border-b border-gray-200">
              <h2 className="text-2xl font-bold text-gray-900">Nouveau Produit</h2>
              <button
                onClick={() => {
                  setShowModal(false);
                  resetForm();
                }}
                className="text-gray-400 hover:text-gray-600"
              >
                <X className="h-6 w-6" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              {/* Nom du produit */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Nom du produit <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className={`input ${errors.name ? 'border-red-500' : ''}`}
                  placeholder="Ex: Café Arabica"
                />
                {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
              </div>

              {/* Catégorie */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Catégorie <span className="text-red-500">*</span>
                </label>
                <select
                  name="categoryId"
                  value={formData.categoryId}
                  onChange={handleInputChange}
                  className={`input ${errors.categoryId ? 'border-red-500' : ''}`}
                >
                  <option value="">Sélectionner une catégorie</option>
                  {categories?.map((category) => (
                    <option key={category.id} value={category.id}>
                      {category.name}
                    </option>
                  ))}
                </select>
                {errors.categoryId && <p className="text-red-500 text-sm mt-1">{errors.categoryId}</p>}
              </div>

              {/* Description */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Description
                </label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  rows="3"
                  className="input"
                  placeholder="Description du produit..."
                />
              </div>

              {/* Ligne 1: Unité et Stock actuel */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Unité
                  </label>
                  <select
                    name="unit"
                    value={formData.unit}
                    onChange={handleInputChange}
                    className="input"
                  >
                    <option value="pièce">Pièce</option>
                    <option value="kg">Kilogramme (kg)</option>
                    <option value="g">Gramme (g)</option>
                    <option value="L">Litre (L)</option>
                    <option value="mL">Millilitre (mL)</option>
                    <option value="paquet">Paquet</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Stock actuel
                  </label>
                  <input
                    type="number"
                    name="currentStock"
                    value={formData.currentStock}
                    onChange={handleInputChange}
                    min="0"
                    step="0.01"
                    className="input"
                  />
                </div>
              </div>

              {/* Ligne 2: Stock min et max */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Stock minimum <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="number"
                    name="minStock"
                    value={formData.minStock}
                    onChange={handleInputChange}
                    min="0"
                    step="0.01"
                    className={`input ${errors.minStock ? 'border-red-500' : ''}`}
                  />
                  {errors.minStock && <p className="text-red-500 text-sm mt-1">{errors.minStock}</p>}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Stock maximum
                  </label>
                  <input
                    type="number"
                    name="maxStock"
                    value={formData.maxStock}
                    onChange={handleInputChange}
                    min="0"
                    step="0.01"
                    className="input"
                  />
                </div>
              </div>

              {/* Prix unitaire */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Prix unitaire (€) <span className="text-red-500">*</span>
                </label>
                <input
                  type="number"
                  name="unitPrice"
                  value={formData.unitPrice}
                  onChange={handleInputChange}
                  min="0"
                  step="0.01"
                  className={`input ${errors.unitPrice ? 'border-red-500' : ''}`}
                  placeholder="0.00"
                />
                {errors.unitPrice && <p className="text-red-500 text-sm mt-1">{errors.unitPrice}</p>}
              </div>

              {/* Fournisseur */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Fournisseur
                </label>
                <select
                  name="supplierId"
                  value={formData.supplierId}
                  onChange={handleInputChange}
                  className="input"
                >
                  <option value="">Sélectionner un fournisseur (optionnel)</option>
                  {suppliers?.map((supplier) => (
                    <option key={supplier.id} value={supplier.id}>
                      {supplier.name}
                    </option>
                  ))}
                </select>
              </div>

              {/* Code-barres */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Code-barres
                </label>
                <input
                  type="text"
                  name="barcode"
                  value={formData.barcode}
                  onChange={handleInputChange}
                  className="input"
                  placeholder="Code-barres (optionnel)"
                />
              </div>

              {/* Statut actif */}
              <div className="flex items-center">
                <input
                  type="checkbox"
                  name="isActive"
                  checked={formData.isActive}
                  onChange={handleInputChange}
                  className="h-4 w-4 text-coffee-600 focus:ring-coffee-500 border-gray-300 rounded"
                />
                <label className="ml-2 block text-sm text-gray-900">
                  Produit actif
                </label>
              </div>

              {/* Boutons d'action */}
              <div className="flex justify-end space-x-3 pt-4 border-t border-gray-200">
                <button
                  type="button"
                  onClick={() => {
                    setShowModal(false);
                    resetForm();
                  }}
                  className="btn btn-secondary"
                >
                  Annuler
                </button>
                <button
                  type="submit"
                  disabled={createProductMutation.isLoading}
                  className="btn btn-primary"
                >
                  {createProductMutation.isLoading ? 'Création...' : 'Créer le produit'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Products;
