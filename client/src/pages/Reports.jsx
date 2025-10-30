import { useState } from 'react';
import { useQuery } from 'react-query';
import { FileText, Download, Calendar, TrendingUp, Package, AlertCircle, DollarSign } from 'lucide-react';
import { format, subDays, startOfMonth, endOfMonth } from 'date-fns';
import { fr } from 'date-fns/locale';
import api from '../lib/api';

const Reports = () => {
  const [dateRange, setDateRange] = useState({
    start: format(startOfMonth(new Date()), 'yyyy-MM-dd'),
    end: format(endOfMonth(new Date()), 'yyyy-MM-dd')
  });

  const { data: products } = useQuery('products', async () => {
    const { data } = await api.get('/products');
    return data.data;
  });

  const { data: movements } = useQuery(['movements', dateRange], async () => {
    const { data } = await api.get(`/movements?startDate=${dateRange.start}&endDate=${dateRange.end}&limit=1000`);
    return data.data;
  });

  const { data: categories } = useQuery('categories', async () => {
    const { data } = await api.get('/categories');
    return data.data;
  });

  // Calculate statistics
  const stats = {
    totalProducts: products?.length || 0,
    lowStockProducts: products?.filter(p => p.currentStock <= p.minStock).length || 0,
    totalMovements: movements?.length || 0,
    entries: movements?.filter(m => m.type === 'entry').reduce((sum, m) => sum + m.quantity, 0) || 0,
    exits: movements?.filter(m => m.type === 'exit').reduce((sum, m) => sum + m.quantity, 0) || 0,
    totalValue: products?.reduce((sum, p) => sum + (p.currentStock * p.unitPrice), 0) || 0
  };

  const handleExportStock = () => {
    if (!products) return;
    const csv = [
      ['Nom', 'Catégorie', 'Stock Actuel', 'Stock Min', 'Prix Unitaire', 'Valeur Totale', 'Statut'].join(','),
      ...products.map(p => [
        p.name,
        p.category?.name || '',
        p.currentStock,
        p.minStock,
        p.unitPrice,
        (p.currentStock * p.unitPrice).toFixed(2),
        p.isActive ? 'Actif' : 'Inactif'
      ].join(','))
    ].join('\n');
    
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `rapport-stock-${format(new Date(), 'yyyy-MM-dd')}.csv`;
    a.click();
  };

  const handleExportMovements = () => {
    if (!movements) return;
    const csv = [
      ['Date', 'Type', 'Produit', 'Quantité', 'Stock Précédent', 'Nouveau Stock', 'Raison', 'Utilisateur'].join(','),
      ...movements.map(m => [
        format(new Date(m.date), 'dd/MM/yyyy HH:mm', { locale: fr }),
        m.type === 'entry' ? 'Entrée' : m.type === 'exit' ? 'Sortie' : m.type === 'adjustment' ? 'Ajustement' : 'Retour',
        m.product?.name || '',
        m.quantity,
        m.previousStock,
        m.newStock,
        m.reason || '',
        m.user?.name || ''
      ].join(','))
    ].join('\n');
    
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `rapport-mouvements-${format(new Date(), 'yyyy-MM-dd')}.csv`;
    a.click();
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Rapports & Statistiques</h1>
        <p className="text-gray-600 mt-1">Analysez vos données d'inventaire</p>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="card">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Total Produits</p>
              <p className="text-2xl font-bold text-gray-900">{stats.totalProducts}</p>
            </div>
            <div className="bg-blue-100 p-3 rounded-lg">
              <Package className="h-6 w-6 text-blue-600" />
            </div>
          </div>
        </div>

        <div className="card">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Stock Bas</p>
              <p className="text-2xl font-bold text-red-600">{stats.lowStockProducts}</p>
            </div>
            <div className="bg-red-100 p-3 rounded-lg">
              <AlertCircle className="h-6 w-6 text-red-600" />
            </div>
          </div>
        </div>

        <div className="card">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Mouvements</p>
              <p className="text-2xl font-bold text-gray-900">{stats.totalMovements}</p>
            </div>
            <div className="bg-green-100 p-3 rounded-lg">
              <TrendingUp className="h-6 w-6 text-green-600" />
            </div>
          </div>
        </div>

        <div className="card">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Valeur Stock</p>
              <p className="text-2xl font-bold text-gray-900">{stats.totalValue.toFixed(0)} €</p>
            </div>
            <div className="bg-purple-100 p-3 rounded-lg">
              <DollarSign className="h-6 w-6 text-purple-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Date Range Filter */}
      <div className="card">
        <h3 className="font-semibold text-gray-900 mb-4">Période d'analyse</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Date de début</label>
            <input
              type="date"
              value={dateRange.start}
              onChange={(e) => setDateRange(prev => ({ ...prev, start: e.target.value }))}
              className="input"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Date de fin</label>
            <input
              type="date"
              value={dateRange.end}
              onChange={(e) => setDateRange(prev => ({ ...prev, end: e.target.value }))}
              className="input"
            />
          </div>
        </div>
      </div>

      {/* Movement Summary */}
      <div className="card">
        <h3 className="font-semibold text-gray-900 mb-4">Résumé des Mouvements</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-gray-600">Entrées</span>
              <span className="text-lg font-bold text-green-600">{stats.entries.toFixed(2)}</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className="bg-green-600 h-2 rounded-full"
                style={{ width: `${(stats.entries / (stats.entries + stats.exits || 1)) * 100}%` }}
              ></div>
            </div>
          </div>
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-gray-600">Sorties</span>
              <span className="text-lg font-bold text-red-600">{stats.exits.toFixed(2)}</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className="bg-red-600 h-2 rounded-full"
                style={{ width: `${(stats.exits / (stats.entries + stats.exits || 1)) * 100}%` }}
              ></div>
            </div>
          </div>
        </div>
      </div>

      {/* Export Reports */}
      <div>
        <h3 className="font-semibold text-gray-900 mb-4">Exporter les Rapports</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="card">
          <div className="flex items-center mb-4">
            <div className="bg-blue-100 p-3 rounded-lg mr-4">
              <FileText className="h-6 w-6 text-blue-600" />
            </div>
            <div>
              <h3 className="font-semibold text-gray-900">Rapport de Stock</h3>
              <p className="text-sm text-gray-600">État actuel de l'inventaire</p>
            </div>
          </div>
          <button onClick={handleExportStock} className="btn btn-secondary w-full">
            <Download className="h-4 w-4 mr-2" />
            Télécharger CSV
          </button>
        </div>

        <div className="card">
          <div className="flex items-center mb-4">
            <div className="bg-green-100 p-3 rounded-lg mr-4">
              <FileText className="h-6 w-6 text-green-600" />
            </div>
            <div>
              <h3 className="font-semibold text-gray-900">Rapport des Mouvements</h3>
              <p className="text-sm text-gray-600">Historique complet</p>
            </div>
          </div>
          <button onClick={handleExportMovements} className="btn btn-secondary w-full">
            <Download className="h-4 w-4 mr-2" />
            Télécharger CSV
          </button>
        </div>

        <div className="card">
          <div className="flex items-center mb-4">
            <div className="bg-purple-100 p-3 rounded-lg mr-4">
              <AlertCircle className="h-6 w-6 text-purple-600" />
            </div>
            <div>
              <h3 className="font-semibold text-gray-900">Alertes Stock Bas</h3>
              <p className="text-sm text-gray-600">Produits en rupture</p>
            </div>
          </div>
          <button onClick={() => {
            const lowStock = products?.filter(p => p.currentStock <= p.minStock) || [];
            if (lowStock.length === 0) {
              alert('Aucun produit en stock bas');
              return;
            }
            const csv = [
              ['Nom', 'Catégorie', 'Stock Actuel', 'Stock Min', 'Différence'].join(','),
              ...lowStock.map(p => [
                p.name,
                p.category?.name || '',
                p.currentStock,
                p.minStock,
                p.minStock - p.currentStock
              ].join(','))
            ].join('\n');
            const blob = new Blob([csv], { type: 'text/csv' });
            const url = window.URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = `alertes-stock-bas-${format(new Date(), 'yyyy-MM-dd')}.csv`;
            a.click();
          }} className="btn btn-secondary w-full">
            <Download className="h-4 w-4 mr-2" />
            Télécharger CSV
          </button>
        </div>

        <div className="card">
          <div className="flex items-center mb-4">
            <div className="bg-orange-100 p-3 rounded-lg mr-4">
              <Package className="h-6 w-6 text-orange-600" />
            </div>
            <div>
              <h3 className="font-semibold text-gray-900">Valeurs par Catégorie</h3>
              <p className="text-sm text-gray-600">Répartition du stock</p>
            </div>
          </div>
          <button onClick={() => {
            if (!categories || !products) return;
            const csv = [
              ['Catégorie', 'Nombre de Produits', 'Valeur Totale'].join(','),
              ...categories.map(cat => {
                const catProducts = products.filter(p => p.categoryId === cat.id);
                const totalValue = catProducts.reduce((sum, p) => sum + (p.currentStock * p.unitPrice), 0);
                return [cat.name, catProducts.length, totalValue.toFixed(2)].join(',');
              })
            ].join('\n');
            const blob = new Blob([csv], { type: 'text/csv' });
            const url = window.URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = `valeurs-categories-${format(new Date(), 'yyyy-MM-dd')}.csv`;
            a.click();
          }} className="btn btn-secondary w-full">
            <Download className="h-4 w-4 mr-2" />
            Télécharger CSV
          </button>
        </div>
      </div>
      </div>
    </div>
  );
};

export default Reports;
