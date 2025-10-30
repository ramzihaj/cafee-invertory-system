import { useQuery } from 'react-query';
import { ShoppingCart, Clock, CheckCircle, DollarSign } from 'lucide-react';
import { Link } from 'react-router-dom';
import api from '../../lib/api';
import Coffee3D from '../Coffee3D';

const EmployeeDashboard = () => {
  const { data: myOrders, isLoading } = useQuery('myOrders', async () => {
    const { data } = await api.get('/orders');
    return data.data;
  });

  const { data: myTables } = useQuery('myTables', async () => {
    const user = JSON.parse(localStorage.getItem('user'));
    const { data } = await api.get(`/tables?assignedTo=${user.id}`);
    return data.data;
  });

  if (isLoading) {
    return <div className="flex items-center justify-center h-64"><div className="spinner"></div></div>;
  }

  const todayOrders = myOrders?.filter(order => {
    const orderDate = new Date(order.createdAt);
    const today = new Date();
    return orderDate.toDateString() === today.toDateString();
  }) || [];

  const pendingOrders = myOrders?.filter(o => ['pending', 'preparing'].includes(o.status)) || [];
  const completedToday = todayOrders.filter(o => o.status === 'paid');
  const totalRevenueToday = completedToday.reduce((sum, o) => sum + parseFloat(o.totalAmount), 0);

  const statCards = [
    {
      name: 'Commandes Aujourd\'hui',
      value: todayOrders.length,
      icon: ShoppingCart,
      color: 'bg-blue-500',
      bgLight: 'bg-blue-100',
      textColor: 'text-blue-600'
    },
    {
      name: 'En Attente',
      value: pendingOrders.length,
      icon: Clock,
      color: 'bg-yellow-500',
      bgLight: 'bg-yellow-100',
      textColor: 'text-yellow-600'
    },
    {
      name: 'Complétées Aujourd\'hui',
      value: completedToday.length,
      icon: CheckCircle,
      color: 'bg-green-500',
      bgLight: 'bg-green-100',
      textColor: 'text-green-600'
    },
    {
      name: 'Ventes du Jour',
      value: `${totalRevenueToday.toFixed(2)} €`,
      icon: DollarSign,
      color: 'bg-purple-500',
      bgLight: 'bg-purple-100',
      textColor: 'text-purple-600'
    },
  ];

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
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Dashboard Employé</h1>
          <p className="text-gray-600 mt-1">Gérez vos commandes et tables</p>
        </div>
        <Coffee3D size={120} />
      </div>

      {/* Statistiques */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {statCards.map((stat) => {
          const Icon = stat.icon;
          return (
            <div key={stat.name} className="card hover:shadow-lg transition-all">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">{stat.name}</p>
                  <p className="text-2xl font-bold text-gray-900 mt-2">{stat.value}</p>
                </div>
                <div className={`${stat.bgLight} p-3 rounded-lg`}>
                  <Icon className={`h-6 w-6 ${stat.textColor}`} />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Quick Actions */}
      <div className="card bg-gradient-to-r from-coffee-500 to-coffee-700 text-white">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-xl font-bold mb-2">Prendre une nouvelle commande</h3>
            <p className="text-coffee-100">Sélectionnez une table et composez la commande</p>
          </div>
          <Link to="/orders" className="btn bg-white text-coffee-700 hover:bg-gray-100">
            <ShoppingCart className="h-5 w-5 mr-2" />
            Nouvelle Commande
          </Link>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Tables Assignées */}
        <div className="card">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Mes Tables</h3>
          {myTables && myTables.length > 0 ? (
            <div className="grid grid-cols-3 gap-3">
              {myTables.map((table) => (
                <div
                  key={table.id}
                  className={`p-4 border-2 rounded-lg text-center ${
                    table.status === 'available' ? 'border-green-300 bg-green-50' :
                    table.status === 'occupied' ? 'border-red-300 bg-red-50' :
                    'border-yellow-300 bg-yellow-50'
                  }`}
                >
                  <div className="text-2xl font-bold">#{table.number}</div>
                  <div className="text-xs mt-1">
                    {table.status === 'available' ? 'Disponible' :
                     table.status === 'occupied' ? 'Occupée' : 'Réservée'}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-500 text-center py-8">Aucune table assignée</p>
          )}
        </div>

        {/* Commandes en attente */}
        <div className="card">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Commandes en Cours</h3>
          <div className="space-y-3">
            {pendingOrders.length > 0 ? (
              pendingOrders.slice(0, 5).map((order) => {
                const status = getOrderStatus(order.status);
                return (
                  <div key={order.id} className="p-3 border border-gray-200 rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-medium text-gray-900">{order.orderNumber}</span>
                      <span className={status.class}>{status.label}</span>
                    </div>
                    <div className="flex items-center justify-between text-sm text-gray-600">
                      <span>Table #{order.table?.number}</span>
                      <span className="font-bold text-coffee-700">{parseFloat(order.totalAmount).toFixed(2)} €</span>
                    </div>
                  </div>
                );
              })
            ) : (
              <p className="text-gray-500 text-center py-8">Aucune commande en cours</p>
            )}
          </div>
        </div>
      </div>

      {/* Historique du jour */}
      <div className="card">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Historique du Jour</h3>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">N° Commande</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Table</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Montant</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Statut</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Heure</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {todayOrders.map((order) => {
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
                      {new Date(order.createdAt).toLocaleTimeString('fr-FR')}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default EmployeeDashboard;
