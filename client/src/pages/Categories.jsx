import { useQuery } from 'react-query';
import { Layers, Plus } from 'lucide-react';
import api from '../lib/api';

const Categories = () => {
  const { data: categories, isLoading } = useQuery('categories', async () => {
    const { data } = await api.get('/categories');
    return data.data;
  });

  if (isLoading) {
    return <div className="flex items-center justify-center h-64"><div className="spinner"></div></div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Catégories</h1>
          <p className="text-gray-600 mt-1">{categories?.length || 0} catégories</p>
        </div>
        <button className="btn btn-primary">
          <Plus className="h-5 w-5 mr-2" />
          Nouvelle Catégorie
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {categories?.map((category) => (
          <div key={category.id} className="card hover:shadow-lg transition-shadow">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center">
                <div className="p-3 rounded-lg mr-4" style={{ backgroundColor: category.color + '20' }}>
                  <Layers className="h-6 w-6" style={{ color: category.color }} />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">{category.name}</h3>
                  <p className="text-sm text-gray-500">{category.description}</p>
                </div>
              </div>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span className="text-gray-600">{category.products?.length || 0} produits</span>
              <button className="text-coffee-600 hover:text-coffee-800 font-medium">
                Voir détails →
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Categories;
