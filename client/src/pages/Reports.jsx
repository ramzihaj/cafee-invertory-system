import { FileText, Download, Calendar } from 'lucide-react';

const Reports = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Rapports</h1>
        <p className="text-gray-600 mt-1">Générez et téléchargez vos rapports</p>
      </div>

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
          <button className="btn btn-secondary w-full">
            <Download className="h-4 w-4 mr-2" />
            Télécharger PDF
          </button>
        </div>

        <div className="card">
          <div className="flex items-center mb-4">
            <div className="bg-green-100 p-3 rounded-lg mr-4">
              <FileText className="h-6 w-6 text-green-600" />
            </div>
            <div>
              <h3 className="font-semibold text-gray-900">Rapport des Ventes</h3>
              <p className="text-sm text-gray-600">Sorties et consommation</p>
            </div>
          </div>
          <button className="btn btn-secondary w-full">
            <Download className="h-4 w-4 mr-2" />
            Télécharger PDF
          </button>
        </div>

        <div className="card">
          <div className="flex items-center mb-4">
            <div className="bg-purple-100 p-3 rounded-lg mr-4">
              <Calendar className="h-6 w-6 text-purple-600" />
            </div>
            <div>
              <h3 className="font-semibold text-gray-900">Rapport Mensuel</h3>
              <p className="text-sm text-gray-600">Récapitulatif du mois</p>
            </div>
          </div>
          <button className="btn btn-secondary w-full">
            <Download className="h-4 w-4 mr-2" />
            Télécharger Excel
          </button>
        </div>

        <div className="card">
          <div className="flex items-center mb-4">
            <div className="bg-orange-100 p-3 rounded-lg mr-4">
              <FileText className="h-6 w-6 text-orange-600" />
            </div>
            <div>
              <h3 className="font-semibold text-gray-900">Historique Mouvements</h3>
              <p className="text-sm text-gray-600">Tous les mouvements de stock</p>
            </div>
          </div>
          <button className="btn btn-secondary w-full">
            <Download className="h-4 w-4 mr-2" />
            Télécharger Excel
          </button>
        </div>
      </div>
    </div>
  );
};

export default Reports;
