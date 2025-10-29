import { User, Mail, Phone, Shield } from 'lucide-react';
import useAuthStore from '../store/authStore';

const Profile = () => {
  const { user } = useAuthStore();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Mon Profil</h1>
        <p className="text-gray-600 mt-1">Gérez vos informations personnelles</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 card">
          <h2 className="text-lg font-semibold text-gray-900 mb-6">Informations Personnelles</h2>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <User className="h-4 w-4 inline mr-2" />
                Nom complet
              </label>
              <input type="text" defaultValue={user?.name} className="input" />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <Mail className="h-4 w-4 inline mr-2" />
                Email
              </label>
              <input type="email" defaultValue={user?.email} className="input" disabled />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <Phone className="h-4 w-4 inline mr-2" />
                Téléphone
              </label>
              <input type="tel" defaultValue={user?.phone} className="input" />
            </div>

            <div className="pt-4">
              <button className="btn btn-primary">
                Enregistrer les modifications
              </button>
            </div>
          </div>
        </div>

        <div className="card">
          <h2 className="text-lg font-semibold text-gray-900 mb-6">Informations de Compte</h2>
          
          <div className="space-y-4">
            <div className="flex items-center justify-between py-3 border-b border-gray-200">
              <span className="text-sm text-gray-600">Rôle</span>
              <span className="badge badge-info capitalize">{user?.role}</span>
            </div>

            <div className="flex items-center justify-between py-3 border-b border-gray-200">
              <span className="text-sm text-gray-600">Statut</span>
              <span className="badge badge-success">Actif</span>
            </div>

            <div className="flex items-center justify-between py-3">
              <span className="text-sm text-gray-600">ID</span>
              <span className="text-sm font-mono text-gray-900">#{user?.id}</span>
            </div>
          </div>

          <div className="mt-6 pt-6 border-t border-gray-200">
            <button className="btn btn-secondary w-full">
              <Shield className="h-4 w-4 mr-2" />
              Changer le mot de passe
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
