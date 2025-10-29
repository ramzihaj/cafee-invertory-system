import { useQuery } from 'react-query';
import { Truck, Plus, Mail, Phone } from 'lucide-react';
import api from '../lib/api';

const Suppliers = () => {
  const { data: suppliers, isLoading } = useQuery('suppliers', async () => {
    const { data } = await api.get('/suppliers');
    return data.data;
  });

  if (isLoading) {
    return <div className="flex items-center justify-center h-64"><div className="spinner"></div></div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Fournisseurs</h1>
          <p className="text-gray-600 mt-1">{suppliers?.length || 0} fournisseurs</p>
        </div>
        <button className="btn btn-primary">
          <Plus className="h-5 w-5 mr-2" />
          Nouveau Fournisseur
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {suppliers?.map((supplier) => (
          <div key={supplier.id} className="card hover:shadow-lg transition-shadow">
            <div className="flex items-start justify-between">
              <div className="flex items-start">
                <div className="bg-coffee-100 p-3 rounded-lg mr-4">
                  <Truck className="h-6 w-6 text-coffee-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 text-lg">{supplier.name}</h3>
                  {supplier.company && (
                    <p className="text-sm text-gray-600">{supplier.company}</p>
                  )}
                  <div className="mt-3 space-y-2">
                    {supplier.email && (
                      <div className="flex items-center text-sm text-gray-600">
                        <Mail className="h-4 w-4 mr-2" />
                        {supplier.email}
                      </div>
                    )}
                    <div className="flex items-center text-sm text-gray-600">
                      <Phone className="h-4 w-4 mr-2" />
                      {supplier.phone}
                    </div>
                  </div>
                </div>
              </div>
              <span className={`badge ${supplier.isActive ? 'badge-success' : 'badge-danger'}`}>
                {supplier.isActive ? 'Actif' : 'Inactif'}
              </span>
            </div>
            <div className="mt-4 pt-4 border-t border-gray-200">
              <p className="text-sm text-gray-600">
                <strong>{supplier.products?.length || 0}</strong> produits fournis
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Suppliers;
