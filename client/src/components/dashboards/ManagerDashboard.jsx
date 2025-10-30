import { useQuery } from 'react-query';
import { Package, AlertTriangle, TrendingUp, TrendingDown, Users, ShoppingCart } from 'lucide-react';
import api from '../../lib/api';
import Coffee3D from '../Coffee3D';

const ManagerDashboard = () => {
  const { data: stats, isLoading } = useQuery('dashboardStats', async () => {
    const { data } = await api.get('/dashboard/stats');
    return data.data;
  });

  const { data: orders } = useQuery('recentOrders', async () => {
    const { data } = await api.get('/orders?limit=20');
    return data.data;
  });

  if (isLoading) {
    return <div className="flex items-center justify-center h-64"><div className="spinner"></div></div>;
  }

  const statCards = [
    {
      name: 'Total Produits',
      value: stats?.overview?.totalProducts || 0,
      icon: Package,
      color: 'bg-blue-500',
      bgLight: 'bg-blue-100',
      textColor: 'text-blue-600'
    },
    {
      name: 'Stock Faible',
      value: stats?.overview?.lowStockCount || 0,
      icon: AlertTriangle,
      color: 'bg-red-500',
      bgLight: 'bg-red-100',
      textColor: 'text-red-600'
    },
    {
      name: 'Entrées (7j)',
      value: stats?.movements?.recentEntries || 0,
      icon: TrendingUp,
      color: 'bg-green-500',
      bgLight: 'bg-green-100',
      textColor: 'text-green-600'
    },
    {
      name: 'Sorties (7j)',
      value: stats?.movements?.recentExits || 0,
      icon: TrendingDown,
      color: 'bg-orange-500',
      bgLight: 'bg-orange-100',
      textColor: 'text-orange-600'
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Dashboard Manager</h1>
          <p className="text-gray-600 mt-1">Gestion du stock et des fournisseurs</p>
        </div>
        <Coffee3D size={120} />
      </div>

      {/* Cartes de statistiques */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {statCards.map((stat) => {
          const Icon = stat.icon;
          return (
            <div key={stat.name} className="card hover:shadow-lg transition-all">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">{stat.name}</p>
                  <p className="text-3xl font-bold text-gray-900 mt-2">{stat.value}</p>
                </div>
                <div className={`${stat.bgLight} p-3 rounded-lg`}>
                  <Icon className={`h-6 w-6 ${stat.textColor}`} />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Top Produits Vendus */}
        <div className="card">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Top 5 Produits (7 derniers jours)
          </h3>
          <div className="space-y-3">
            {stats?.topProducts?.length > 0 ? (
              stats.topProducts.map((item, index) => (
                <div key={index} className="flex items-center justify-between py-2">
                  <div className="flex items-center">
                    <span className="text-lg font-bold text-gray-400 mr-3">{index + 1}</span>
                    <div>
                      <p className="font-medium text-gray-900">{item.product?.name}</p>
                      <p className="text-sm text-gray-500">{item.product?.category?.name}</p>
                    </div>
                  </div>
                  <span className="badge badge-success">
                    {Math.round(item.quantity)} {item.product?.unit}
                  </span>
                </div>
              ))
            ) : (
              <p className="text-gray-500 text-center py-4">Aucune donnée disponible</p>
            )}
          </div>
        </div>

        {/* Alertes Stock Bas */}
        <div className="card">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">
              Alertes Stock Faible
            </h3>
            <span className="badge badge-danger">
              {stats?.overview?.lowStockCount || 0} alertes
            </span>
          </div>
          <div className="space-y-3">
            {stats?.alerts?.lowStock?.length > 0 ? (
              stats.alerts.lowStock.map((product, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-red-50 rounded-lg">
                  <div className="flex items-center">
                    <AlertTriangle className="h-5 w-5 text-red-500 mr-3" />
                    <div>
                      <p className="font-medium text-gray-900">{product.name}</p>
                      <p className="text-sm text-gray-500">
                        Stock: {product.currentStock} {product.unit} / Min: {product.minStock}
                      </p>
                    </div>
                  </div>
                  <button className="btn btn-sm bg-red-600 text-white hover:bg-red-700 text-xs px-3 py-1">
                    Commander
                  </button>
                </div>
              ))
            ) : (
              <div className="text-center py-8">
                <Package className="h-12 w-12 text-gray-300 mx-auto mb-2" />
                <p className="text-gray-500">Aucune alerte de stock</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Commandes Récentes */}
      <div className="card">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Commandes Récentes</h3>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">N° Commande</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Employé</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Table</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Montant</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Statut</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Date</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {orders?.slice(0, 10).map((order) => (
                <tr key={order.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {order.orderNumber}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {order.employee?.name}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    Table #{order.table?.number}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-coffee-700">
                    {parseFloat(order.totalAmount).toFixed(2)} €
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`badge ${
                      order.status === 'paid' ? 'badge-success' :
                      order.status === 'delivered' ? 'bg-green-100 text-green-800' :
                      order.status === 'ready' ? 'bg-purple-100 text-purple-800' :
                      order.status === 'preparing' ? 'bg-blue-100 text-blue-800' :
                      'bg-yellow-100 text-yellow-800'
                    }`}>
                      {order.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                    {new Date(order.createdAt).toLocaleString('fr-FR')}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Statistiques supplémentaires */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="card bg-gradient-to-br from-purple-50 to-purple-100">
          <div className="flex items-center">
            <div className="bg-purple-500 p-3 rounded-lg">
              <Package className="h-6 w-6 text-white" />
            </div>
            <div className="ml-4">
              <p className="text-sm text-purple-700">Catégories</p>
              <p className="text-2xl font-bold text-purple-900">
                {stats?.overview?.totalCategories || 0}
              </p>
            </div>
          </div>
        </div>

        <div className="card bg-gradient-to-br from-indigo-50 to-indigo-100">
          <div className="flex items-center">
            <div className="bg-indigo-500 p-3 rounded-lg">
              <Users className="h-6 w-6 text-white" />
            </div>
            <div className="ml-4">
              <p className="text-sm text-indigo-700">Fournisseurs</p>
              <p className="text-2xl font-bold text-indigo-900">
                {stats?.overview?.totalSuppliers || 0}
              </p>
            </div>
          </div>
        </div>

        <div className="card bg-gradient-to-br from-green-50 to-green-100">
          <div className="flex items-center">
            <div className="bg-green-500 p-3 rounded-lg">
              <ShoppingCart className="h-6 w-6 text-white" />
            </div>
            <div className="ml-4">
              <p className="text-sm text-green-700">Commandes Aujourd'hui</p>
              <p className="text-2xl font-bold text-green-900">
                {stats?.overview?.todayMovements || 0}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ManagerDashboard;
