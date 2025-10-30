import { useQuery } from 'react-query';
import { Users, DollarSign, TrendingUp, Package, Gift, ShoppingCart } from 'lucide-react';
import api from '../../lib/api';
import Coffee3D from '../Coffee3D';

const AdminDashboard = () => {
  const { data: stats, isLoading } = useQuery('adminStats', async () => {
    const { data } = await api.get('/dashboard/stats');
    return data.data;
  });

  const { data: users } = useQuery('users', async () => {
    const { data } = await api.get('/users');
    return data.data;
  });

  const { data: orders } = useQuery('allOrders', async () => {
    const { data } = await api.get('/orders');
    return data.data?.filter(o => o.status === 'paid') || [];
  });

  if (isLoading) {
    return <div className="flex items-center justify-center h-64"><div className="spinner"></div></div>;
  }

  // Calculate employee stats
  const employeeStats = users?.filter(u => u.role === 'employee' && u.isActive).map(employee => {
    const employeeOrders = orders?.filter(o => o.employeeId === employee.id) || [];
    const totalRevenue = employeeOrders.reduce((sum, o) => sum + parseFloat(o.totalAmount), 0);
    return {
      ...employee,
      ordersCount: employeeOrders.length,
      totalRevenue
    };
  }).sort((a, b) => b.totalRevenue - a.totalRevenue) || [];

  const totalRevenue = orders?.reduce((sum, o) => sum + parseFloat(o.totalAmount), 0) || 0;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Dashboard Administrateur</h1>
          <p className="text-gray-600 mt-1">Vue d'ensemble complète du système</p>
        </div>
        <Coffee3D size={120} />
      </div>

      {/* Main Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="card hover:shadow-lg transition-all">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Chiffre d'Affaires</p>
              <p className="text-3xl font-bold text-green-600 mt-2">{totalRevenue.toFixed(2)} €</p>
              <p className="text-xs text-gray-500 mt-1">Total des ventes payées</p>
            </div>
            <div className="bg-green-100 p-3 rounded-lg">
              <DollarSign className="h-6 w-6 text-green-600" />
            </div>
          </div>
        </div>

        <div className="card hover:shadow-lg transition-all">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Commandes Totales</p>
              <p className="text-3xl font-bold text-blue-600 mt-2">{orders?.length || 0}</p>
              <p className="text-xs text-gray-500 mt-1">Commandes payées</p>
            </div>
            <div className="bg-blue-100 p-3 rounded-lg">
              <ShoppingCart className="h-6 w-6 text-blue-600" />
            </div>
          </div>
        </div>

        <div className="card hover:shadow-lg transition-all">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Utilisateurs</p>
              <p className="text-3xl font-bold text-purple-600 mt-2">{users?.length || 0}</p>
              <p className="text-xs text-gray-500 mt-1">Total des utilisateurs</p>
            </div>
            <div className="bg-purple-100 p-3 rounded-lg">
              <Users className="h-6 w-6 text-purple-600" />
            </div>
          </div>
        </div>

        <div className="card hover:shadow-lg transition-all">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Produits</p>
              <p className="text-3xl font-bold text-orange-600 mt-2">{stats?.overview?.totalProducts || 0}</p>
              <p className="text-xs text-gray-500 mt-1">Dans l'inventaire</p>
            </div>
            <div className="bg-orange-100 p-3 rounded-lg">
              <Package className="h-6 w-6 text-orange-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Employee Performance */}
      <div className="card">
        <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
          <TrendingUp className="h-5 w-5 mr-2 text-coffee-600" />
          Performance des Employés
        </h3>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Employé</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Commandes</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Chiffre d'Affaires</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Moyenne/Commande</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {employeeStats.slice(0, 10).map((employee, index) => (
                <tr key={employee.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="h-10 w-10 flex-shrink-0">
                        <div className="h-10 w-10 rounded-full bg-coffee-100 flex items-center justify-center">
                          <span className="text-coffee-700 font-semibold">
                            {employee.name.charAt(0).toUpperCase()}
                          </span>
                        </div>
                      </div>
                      <div className="ml-4">
                        <div className="font-medium text-gray-900">{employee.name}</div>
                        <div className="text-sm text-gray-500">{employee.email}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="badge badge-primary">{employee.ordersCount} commandes</span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-bold text-green-600">
                    {employee.totalRevenue.toFixed(2)} €
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {employee.ordersCount > 0 ? (employee.totalRevenue / employee.ordersCount).toFixed(2) : '0.00'} €
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Quick Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="card bg-gradient-to-br from-blue-50 to-blue-100">
          <div className="flex items-center">
            <div className="bg-blue-500 p-3 rounded-lg">
              <Users className="h-6 w-6 text-white" />
            </div>
            <div className="ml-4">
              <p className="text-sm text-blue-700">Managers</p>
              <p className="text-2xl font-bold text-blue-900">
                {users?.filter(u => u.role === 'manager' && u.isActive).length || 0}
              </p>
            </div>
          </div>
        </div>

        <div className="card bg-gradient-to-br from-green-50 to-green-100">
          <div className="flex items-center">
            <div className="bg-green-500 p-3 rounded-lg">
              <Users className="h-6 w-6 text-white" />
            </div>
            <div className="ml-4">
              <p className="text-sm text-green-700">Employés Actifs</p>
              <p className="text-2xl font-bold text-green-900">
                {users?.filter(u => u.role === 'employee' && u.isActive).length || 0}
              </p>
            </div>
          </div>
        </div>

        <div className="card bg-gradient-to-br from-purple-50 to-purple-100">
          <div className="flex items-center">
            <div className="bg-purple-500 p-3 rounded-lg">
              <Package className="h-6 w-6 text-white" />
            </div>
            <div className="ml-4">
              <p className="text-sm text-purple-700">Stock Bas</p>
              <p className="text-2xl font-bold text-purple-900">
                {stats?.overview?.lowStockCount || 0}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
