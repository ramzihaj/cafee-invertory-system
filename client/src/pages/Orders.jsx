import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from 'react-query';
import { ShoppingCart, Plus, Minus, Trash2, X, Coffee, Check, CheckCircle } from 'lucide-react';
import api from '../lib/api';

const Orders = () => {
  const [selectedTable, setSelectedTable] = useState(null);
  const [cart, setCart] = useState([]);
  const [notes, setNotes] = useState('');
  const [showCart, setShowCart] = useState(false);

  const queryClient = useQueryClient();

  const { data: tables } = useQuery('tables', async () => {
    const { data } = await api.get('/tables');
    return data.data;
  });

  const { data: products } = useQuery('products', async () => {
    const { data } = await api.get('/products?isActive=true');
    return data.data;
  });

  const { data: myOrders } = useQuery('myOrders', async () => {
    const { data } = await api.get('/orders');
    return data.data;
  });

  const createOrderMutation = useMutation(
    (orderData) => api.post('/orders', orderData),
    {
      onSuccess: () => {
        queryClient.invalidateQueries('myOrders');
        queryClient.invalidateQueries('tables');
        queryClient.invalidateQueries('products');
        setCart([]);
        setSelectedTable(null);
        setNotes('');
        setShowCart(false);
        alert('Commande créée avec succès!');
      },
      onError: (error) => {
        alert('Erreur: ' + (error.response?.data?.message || error.message));
      }
    }
  );

  const updateStatusMutation = useMutation(
    ({ id, status }) => api.put(`/orders/${id}/status`, { status }),
    {
      onSuccess: () => {
        queryClient.invalidateQueries('myOrders');
        queryClient.invalidateQueries('tables');
      }
    }
  );

  const addToCart = (product) => {
    const existing = cart.find(item => item.productId === product.id);
    
    // Vérifier le stock disponible
    const currentQuantityInCart = existing ? existing.quantity : 0;
    if (currentQuantityInCart >= product.currentStock) {
      alert(`Stock insuffisant ! Seulement ${product.currentStock} ${product.unit} disponible(s)`);
      return;
    }

    if (existing) {
      setCart(cart.map(item =>
        item.productId === product.id
          ? { ...item, quantity: item.quantity + 1 }
          : item
      ));
    } else {
      setCart([...cart, {
        productId: product.id,
        name: product.name,
        unitPrice: parseFloat(product.unitPrice),
        unit: product.unit,
        quantity: 1,
        maxStock: product.currentStock
      }]);
    }
    
    // Afficher le panier automatiquement si ce n'est pas déjà fait
    if (!showCart) {
      setShowCart(true);
    }
  };

  const updateQuantity = (productId, delta) => {
    setCart(cart.map(item => {
      if (item.productId === productId) {
        const newQuantity = item.quantity + delta;
        
        // Vérifier le stock max
        if (newQuantity > item.maxStock) {
          alert(`Stock insuffisant ! Maximum: ${item.maxStock} ${item.unit}`);
          return item;
        }
        
        return { ...item, quantity: Math.max(0, newQuantity) };
      }
      return item;
    }).filter(item => item.quantity > 0));
  };

  const removeFromCart = (productId) => {
    setCart(cart.filter(item => item.productId !== productId));
  };

  const getTotalAmount = () => {
    return cart.reduce((sum, item) => sum + (item.quantity * item.unitPrice), 0);
  };

  const handleSubmitOrder = () => {
    if (!selectedTable) {
      alert('Veuillez sélectionner une table');
      return;
    }
    if (cart.length === 0) {
      alert('Le panier est vide');
      return;
    }

    createOrderMutation.mutate({
      tableId: selectedTable.id,
      items: cart,
      notes
    });
  };

  const getTableStatus = (table) => {
    const statuses = {
      available: { class: 'bg-green-100 border-green-300 text-green-800', label: 'Disponible' },
      occupied: { class: 'bg-red-100 border-red-300 text-red-800', label: 'Occupée' },
      reserved: { class: 'bg-yellow-100 border-yellow-300 text-yellow-800', label: 'Réservée' }
    };
    return statuses[table.status];
  };

  const getOrderStatus = (status) => {
    const statuses = {
      pending: { class: 'badge bg-yellow-100 text-yellow-800', label: 'En attente' },
      preparing: { class: 'badge bg-blue-100 text-blue-800', label: 'En préparation' },
      ready: { class: 'badge bg-purple-100 text-purple-800', label: 'Prêt' },
      delivered: { class: 'badge bg-green-100 text-green-800', label: 'Livré' },
      paid: { class: 'badge bg-gray-100 text-gray-800', label: 'Payé' }
    };
    return statuses[status] || statuses.pending;
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Prendre une Commande</h1>
          <p className="text-gray-600 mt-1">Sélectionnez une table et composez la commande</p>
        </div>
        <button
          onClick={() => setShowCart(!showCart)}
          className="btn btn-primary relative"
        >
          <ShoppingCart className="h-5 w-5 mr-2" />
          Panier
          {cart.length > 0 && (
            <span className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full h-6 w-6 flex items-center justify-center text-xs">
              {cart.reduce((sum, item) => sum + item.quantity, 0)}
            </span>
          )}
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Tables Section */}
        <div className="lg:col-span-1">
          <div className="card">
            <h3 className="font-semibold text-gray-900 mb-4">Tables</h3>
            <div className="grid grid-cols-2 gap-3">
              {tables?.map((table) => {
                const status = getTableStatus(table);
                const isSelected = selectedTable?.id === table.id;
                return (
                  <button
                    key={table.id}
                    onClick={() => table.status !== 'occupied' && setSelectedTable(table)}
                    disabled={table.status === 'occupied' && !isSelected}
                    className={`p-4 border-2 rounded-lg text-center transition-all ${
                      isSelected 
                        ? 'border-coffee-500 bg-coffee-50' 
                        : status.class
                    } ${table.status === 'occupied' && !isSelected ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer hover:scale-105'}`}
                  >
                    <div className="text-2xl font-bold">#{table.number}</div>
                    <div className="text-xs mt-1">{status.label}</div>
                    <div className="text-xs text-gray-600 mt-1">{table.capacity} places</div>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Products Section */}
        <div className="lg:col-span-2">
          <div className="card">
            <h3 className="font-semibold text-gray-900 mb-4">Menu</h3>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {products?.map((product) => (
                <div
                  key={product.id}
                  className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow"
                >
                  <div className="flex items-center justify-center h-16 mb-3 bg-coffee-50 rounded-lg">
                    <Coffee className="h-8 w-8 text-coffee-600" />
                  </div>
                  <h4 className="font-medium text-gray-900 text-sm mb-1">{product.name}</h4>
                  <p className="text-xs text-gray-500 mb-2">{product.category?.name}</p>
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-coffee-700">{product.unitPrice} €</span>
                    <button
                      onClick={() => addToCart(product)}
                      disabled={product.currentStock <= 0}
                      className="btn btn-sm bg-coffee-600 text-white hover:bg-coffee-700 disabled:bg-gray-300"
                    >
                      <Plus className="h-4 w-4" />
                    </button>
                  </div>
                  {product.currentStock <= 0 && (
                    <p className="text-xs text-red-500 mt-1">Rupture de stock</p>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* My Orders */}
      <div className="card">
        <h3 className="font-semibold text-gray-900 mb-4">Mes Commandes Récentes</h3>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">N° Commande</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Table</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Montant</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Statut</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Date</th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {myOrders?.slice(0, 10).map((order) => {
                const status = getOrderStatus(order.status);
                return (
                  <tr key={order.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {order.orderNumber}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      Table #{order.table?.number}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-coffee-700">
                      {parseFloat(order.totalAmount).toFixed(2)} €
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={status.class}>{status.label}</span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                      {new Date(order.createdAt).toLocaleString('fr-FR')}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm">
                      {order.status === 'ready' && (
                        <button
                          onClick={() => updateStatusMutation.mutate({ id: order.id, status: 'delivered' })}
                          className="btn btn-sm bg-green-600 text-white hover:bg-green-700"
                        >
                          <Check className="h-4 w-4 mr-1" />
                          Livré
                        </button>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Cart Sidebar - Amélioré */}
      {showCart && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-end md:items-center justify-end z-50 transition-all">
          <div 
            className="bg-white h-full md:h-[95vh] w-full md:w-[450px] md:rounded-l-2xl shadow-2xl flex flex-col animate-slideIn"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-gray-200 bg-gradient-to-r from-coffee-600 to-coffee-700">
              <div className="flex items-center space-x-3">
                <ShoppingCart className="h-6 w-6 text-white" />
                <div>
                  <h2 className="text-xl font-bold text-white">Panier</h2>
                  <p className="text-xs text-coffee-100">
                    {cart.reduce((sum, item) => sum + item.quantity, 0)} article(s)
                  </p>
                </div>
              </div>
              <button 
                onClick={() => setShowCart(false)} 
                className="text-white hover:bg-coffee-800 p-2 rounded-full transition-colors"
              >
                <X className="h-6 w-6" />
              </button>
            </div>

            {/* Table Info */}
            {selectedTable && (
              <div className="p-4 bg-gradient-to-r from-coffee-50 to-coffee-100 border-b border-coffee-200">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs text-gray-600 uppercase tracking-wide">Table</p>
                    <p className="text-2xl font-bold text-coffee-800">#{selectedTable.number}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-xs text-gray-600">Capacité</p>
                    <p className="text-sm font-semibold text-gray-700">{selectedTable.capacity} places</p>
                  </div>
                </div>
              </div>
            )}

            {/* Cart Items */}
            <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-gray-50">
              {cart.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full text-gray-400">
                  <ShoppingCart className="h-20 w-20 mb-4 opacity-30" />
                  <p className="text-lg font-medium">Panier vide</p>
                  <p className="text-sm">Ajoutez des produits pour commencer</p>
                </div>
              ) : (
                <>
                  {cart.map((item) => (
                    <div 
                      key={item.productId} 
                      className="bg-white border border-gray-200 rounded-xl p-4 shadow-sm hover:shadow-md transition-shadow"
                    >
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex-1">
                          <h4 className="font-semibold text-gray-900 mb-1">{item.name}</h4>
                          <div className="flex items-center space-x-2 text-sm text-gray-600">
                            <span className="font-medium text-coffee-600">{item.unitPrice.toFixed(2)} €</span>
                            <span className="text-gray-400">•</span>
                            <span>{item.unit}</span>
                          </div>
                          <p className="text-xs text-gray-500 mt-1">
                            Stock: {item.maxStock} {item.unit}
                          </p>
                        </div>
                        <button 
                          onClick={() => removeFromCart(item.productId)} 
                          className="text-red-500 hover:text-red-700 hover:bg-red-50 p-2 rounded-lg transition-colors"
                          title="Supprimer"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div className="flex items-center bg-gray-100 rounded-lg">
                          <button
                            onClick={() => updateQuantity(item.productId, -1)}
                            className="p-2 hover:bg-gray-200 rounded-l-lg transition-colors"
                          >
                            <Minus className="h-4 w-4 text-gray-700" />
                          </button>
                          <span className="font-bold px-4 py-2 min-w-[50px] text-center text-gray-900">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => updateQuantity(item.productId, 1)}
                            className="p-2 hover:bg-gray-200 rounded-r-lg transition-colors"
                          >
                            <Plus className="h-4 w-4 text-gray-700" />
                          </button>
                        </div>
                        <div className="text-right">
                          <p className="text-xs text-gray-500">Sous-total</p>
                          <p className="font-bold text-lg text-coffee-700">
                            {(item.quantity * item.unitPrice).toFixed(2)} €
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}

                  {/* Notes Section */}
                  <div className="bg-white border border-gray-200 rounded-xl p-4">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      💬 Notes pour la cuisine
                    </label>
                    <textarea
                      value={notes}
                      onChange={(e) => setNotes(e.target.value)}
                      rows="3"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-coffee-500 focus:border-transparent resize-none"
                      placeholder="Ex: Sans oignons, bien cuit..."
                    />
                  </div>
                </>
              )}
            </div>

            {/* Footer with Total */}
            <div className="border-t border-gray-200 bg-white p-6 space-y-4 shadow-lg">
              {/* Summary */}
              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm text-gray-600">
                  <span>Articles ({cart.reduce((sum, item) => sum + item.quantity, 0)})</span>
                  <span>{getTotalAmount().toFixed(2)} €</span>
                </div>
              </div>

              {/* Total */}
              <div className="flex items-center justify-between pt-3 border-t border-gray-200">
                <span className="text-lg font-semibold text-gray-900">Total</span>
                <span className="text-2xl font-bold text-coffee-700">
                  {getTotalAmount().toFixed(2)} €
                </span>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-3">
                {cart.length > 0 && (
                  <button
                    onClick={() => {
                      setCart([]);
                      setNotes('');
                    }}
                    className="flex-1 btn bg-gray-200 text-gray-700 hover:bg-gray-300 py-3"
                  >
                    Vider
                  </button>
                )}
                <button
                  onClick={handleSubmitOrder}
                  disabled={!selectedTable || cart.length === 0 || createOrderMutation.isLoading}
                  className="flex-2 btn btn-primary w-full py-3 text-base font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {createOrderMutation.isLoading ? (
                    <span className="flex items-center justify-center">
                      <div className="spinner mr-2"></div>
                      Création...
                    </span>
                  ) : (
                    <span className="flex items-center justify-center">
                      <CheckCircle className="h-5 w-5 mr-2" />
                      Confirmer la Commande
                    </span>
                  )}
                </button>
              </div>

              {!selectedTable && cart.length > 0 && (
                <p className="text-center text-sm text-red-600 bg-red-50 p-2 rounded-lg">
                  ⚠️ Veuillez sélectionner une table
                </p>
              )}
            </div>
          </div>
        </div>
      )}
      
      <style>{`
        @keyframes slideIn {
          from {
            transform: translateX(100%);
          }
          to {
            transform: translateX(0);
          }
        }
        
        .animate-slideIn {
          animation: slideIn 0.3s ease-out;
        }
      `}</style>
    </div>
  );
};

export default Orders;
