import { useQuery } from 'react-query';
import { Package, AlertTriangle, TrendingUp, TrendingDown, DollarSign, Users } from 'lucide-react';
import api from '../lib/api';

const Dashboard = () => {
  const { data: stats, isLoading } = useQuery('dashboardStats', async () => {
    const { data } = await api.get('/dashboard/stats');
    return data.data;
  });

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="spinner"></div>
      </div>
    );
  }

  const statCards = [
    {
      name: 'Total Produits',
      value: stats?.overview?.totalProducts || 0,
      icon: Package,
      color: 'bg-blue-500',
      change: '+5%',
    },
    {
      name: 'Stock Faible',
      value: stats?.overview?.lowStockCount || 0,
      icon: AlertTriangle,
      color: 'bg-red-500',
      change: '-2%',
    },
    {
      name: 'Entrées (7j)',
      value: stats?.movements?.recentEntries || 0,
      icon: TrendingUp,
      color: 'bg-green-500',
      change: '+12%',
    },
    {
      name: 'Sorties (7j)',
      value: stats?.movements?.recentExits || 0,
      icon: TrendingDown,
      color: 'bg-orange-500',
      change: '+8%',
    },
  ];

  return (
    <div className="space-y-6">
      {/* En-tête */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-gray-600 mt-1">Vue d'ensemble de votre inventaire</p>
      </div>

      {/* Cartes de statistiques */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {statCards.map((stat) => {
          const Icon = stat.icon;
          return (
            <div key={stat.name} className="card hover:shadow-md transition-shadow">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">{stat.name}</p>
                  <p className="text-3xl font-bold text-gray-900 mt-2">{stat.value}</p>
                </div>
                <div className={`${stat.color} p-3 rounded-lg`}>
                  <Icon className="h-6 w-6 text-white" />
                </div>
              </div>
              <div className="mt-4 flex items-center text-sm">
                <span className="text-green-600 font-medium">{stat.change}</span>
                <span className="text-gray-600 ml-2">vs mois dernier</span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Top produits et alertes */}
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

      {/* Statistiques supplémentaires */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="card">
          <div className="flex items-center">
            <div className="bg-purple-100 p-3 rounded-lg">
              <Package className="h-6 w-6 text-purple-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm text-gray-600">Catégories</p>
              <p className="text-2xl font-bold text-gray-900">
                {stats?.overview?.totalCategories || 0}
              </p>
            </div>
          </div>
        </div>

        <div className="card">
          <div className="flex items-center">
            <div className="bg-indigo-100 p-3 rounded-lg">
              <Users className="h-6 w-6 text-indigo-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm text-gray-600">Fournisseurs</p>
              <p className="text-2xl font-bold text-gray-900">
                {stats?.overview?.totalSuppliers || 0}
              </p>
            </div>
          </div>
        </div>

        <div className="card">
          <div className="flex items-center">
            <div className="bg-green-100 p-3 rounded-lg">
              <TrendingUp className="h-6 w-6 text-green-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm text-gray-600">Mouvements aujourd'hui</p>
              <p className="text-2xl font-bold text-gray-900">
                {stats?.overview?.todayMovements || 0}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
