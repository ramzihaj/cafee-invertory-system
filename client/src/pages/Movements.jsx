import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from 'react-query';
import { TrendingUp, TrendingDown, Plus, ArrowUpCircle, ArrowDownCircle, X, RefreshCw } from 'lucide-react';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';
import api from '../lib/api';

const Movements = () => {
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    productId: '',
    type: 'entry',
    quantity: 0,
    reason: '',
    notes: '',
    supplierId: '',
    unitPrice: ''
  });
  const [errors, setErrors] = useState({});

  const queryClient = useQueryClient();

  const { data: movements, isLoading } = useQuery('movements', async () => {
    const { data } = await api.get('/movements?limit=50');
    return data.data;
  });

  const { data: products } = useQuery('products', async () => {
    const { data } = await api.get('/products');
    return data.data;
  });

  const { data: suppliers } = useQuery('suppliers', async () => {
    const { data } = await api.get('/suppliers');
    return data.data;
  });

  const createMovementMutation = useMutation(
    (movementData) => api.post('/movements', movementData),
    {
      onSuccess: () => {
        queryClient.invalidateQueries('movements');
        queryClient.invalidateQueries('products');
        setShowModal(false);
        resetForm();
        alert('Mouvement enregistré avec succès!');
      },
      onError: (error) => {
        alert('Erreur: ' + (error.response?.data?.message || error.message));
      }
    }
  );

  const resetForm = () => {
    setFormData({
      productId: '',
      type: 'entry',
      quantity: 0,
      reason: '',
      notes: '',
      supplierId: '',
      unitPrice: ''
    });
    setErrors({});
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors(prev => ({ ...prev, [name]: '' }));
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.productId) newErrors.productId = 'Le produit est requis';
    if (!formData.quantity || formData.quantity <= 0) newErrors.quantity = 'La quantité doit être supérieure à 0';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    const movementData = {
      ...formData,
      productId: parseInt(formData.productId),
      quantity: parseFloat(formData.quantity),
      supplierId: formData.supplierId ? parseInt(formData.supplierId) : undefined,
      unitPrice: formData.unitPrice ? parseFloat(formData.unitPrice) : undefined
    };

    createMovementMutation.mutate(movementData);
  };

  if (isLoading) {
    return <div className="flex items-center justify-center h-64"><div className="spinner"></div></div>;
  }

  const getTypeInfo = (type) => {
    const types = {
      entry: { label: 'Entrée', color: 'text-green-600', bg: 'bg-green-100', icon: ArrowUpCircle },
      exit: { label: 'Sortie', color: 'text-red-600', bg: 'bg-red-100', icon: ArrowDownCircle },
      adjustment: { label: 'Ajustement', color: 'text-blue-600', bg: 'bg-blue-100', icon: TrendingUp },
      return: { label: 'Retour', color: 'text-purple-600', bg: 'bg-purple-100', icon: TrendingDown },
    };
    return types[type] || types.entry;
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Mouvements de Stock</h1>
          <p className="text-gray-600 mt-1">Historique des 50 derniers mouvements</p>
        </div>
        <button className="btn btn-primary" onClick={() => setShowModal(true)}>
          <Plus className="h-5 w-5 mr-2" />
          Nouveau Mouvement
        </button>
      </div>

      <div className="card p-0">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Date</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Type</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Produit</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Quantité</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Stock</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Utilisateur</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {movements?.map((movement) => {
                const typeInfo = getTypeInfo(movement.type);
                const Icon = typeInfo.icon;
                
                return (
                  <tr key={movement.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {format(new Date(movement.date), 'dd MMM yyyy HH:mm', { locale: fr })}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className={`${typeInfo.bg} p-2 rounded-lg mr-2`}>
                          <Icon className={`h-4 w-4 ${typeInfo.color}`} />
                        </div>
                        <span className={`text-sm font-medium ${typeInfo.color}`}>
                          {typeInfo.label}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">{movement.product?.name}</div>
                      <div className="text-xs text-gray-500">{movement.reason}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {movement.quantity} {movement.product?.unit}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                      {movement.previousStock} → {movement.newStock}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                      {movement.user?.name}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full">
            <div className="flex items-center justify-between p-6 border-b border-gray-200">
              <h2 className="text-2xl font-bold text-gray-900">Nouveau Mouvement</h2>
              <button onClick={() => { setShowModal(false); resetForm(); }} className="text-gray-400 hover:text-gray-600">
                <X className="h-6 w-6" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Produit <span className="text-red-500">*</span>
                </label>
                <select name="productId" value={formData.productId} onChange={handleInputChange}
                  className={`input ${errors.productId ? 'border-red-500' : ''}`}>
                  <option value="">Sélectionner un produit</option>
                  {products?.map((product) => (
                    <option key={product.id} value={product.id}>
                      {product.name} (Stock: {product.currentStock} {product.unit})
                    </option>
                  ))}
                </select>
                {errors.productId && <p className="text-red-500 text-sm mt-1">{errors.productId}</p>}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Type de mouvement <span className="text-red-500">*</span>
                  </label>
                  <select name="type" value={formData.type} onChange={handleInputChange} className="input">
                    <option value="entry">Entrée (Achat/Livraison)</option>
                    <option value="exit">Sortie (Vente/Utilisation)</option>
                    <option value="adjustment">Ajustement (Inventaire)</option>
                    <option value="return">Retour</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Quantité <span className="text-red-500">*</span>
                  </label>
                  <input type="number" name="quantity" value={formData.quantity} onChange={handleInputChange}
                    min="0" step="0.01" className={`input ${errors.quantity ? 'border-red-500' : ''}`}
                    placeholder="0" />
                  {errors.quantity && <p className="text-red-500 text-sm mt-1">{errors.quantity}</p>}
                </div>
              </div>

              {(formData.type === 'entry' || formData.type === 'return') && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Fournisseur</label>
                    <select name="supplierId" value={formData.supplierId} onChange={handleInputChange} className="input">
                      <option value="">Sélectionner un fournisseur (optionnel)</option>
                      {suppliers?.filter(s => s.isActive).map((supplier) => (
                        <option key={supplier.id} value={supplier.id}>{supplier.name}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Prix unitaire (€)</label>
                    <input type="number" name="unitPrice" value={formData.unitPrice} onChange={handleInputChange}
                      min="0" step="0.01" className="input" placeholder="Prix unitaire" />
                  </div>
                </div>
              )}

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Raison</label>
                <input type="text" name="reason" value={formData.reason} onChange={handleInputChange}
                  className="input" placeholder="Ex: Livraison fournisseur, Vente client..." />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Notes</label>
                <textarea name="notes" value={formData.notes} onChange={handleInputChange}
                  rows="3" className="input" placeholder="Informations supplémentaires..." />
              </div>

              <div className="flex justify-end space-x-3 pt-4 border-t border-gray-200">
                <button type="button" onClick={() => { setShowModal(false); resetForm(); }} className="btn btn-secondary">
                  Annuler
                </button>
                <button type="submit" disabled={createMovementMutation.isLoading} className="btn btn-primary">
                  {createMovementMutation.isLoading ? 'Enregistrement...' : 'Enregistrer'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Movements;
