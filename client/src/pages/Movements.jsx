import { useQuery } from 'react-query';
import { TrendingUp, TrendingDown, Plus, ArrowUpCircle, ArrowDownCircle } from 'lucide-react';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';
import api from '../lib/api';

const Movements = () => {
  const { data: movements, isLoading } = useQuery('movements', async () => {
    const { data } = await api.get('/movements?limit=50');
    return data.data;
  });

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
        <button className="btn btn-primary">
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
    </div>
  );
};

export default Movements;
