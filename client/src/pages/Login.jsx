import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Coffee, Mail, Lock } from 'lucide-react';
import toast from 'react-hot-toast';
import useAuthStore from '../store/authStore';

const Login = () => {
  const navigate = useNavigate();
  const { login, isLoading } = useAuthStore();
  const [credentials, setCredentials] = useState({
    email: '',
    password: '',
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!credentials.email || !credentials.password) {
      toast.error('Veuillez remplir tous les champs');
      return;
    }

    try {
      await login(credentials.email, credentials.password);
      toast.success('Connexion réussie !');
      navigate('/');
    } catch (error) {
      toast.error(error.response?.data?.message || 'Erreur de connexion');
    }
  };

  const handleDemoLogin = (role) => {
    const demoUsers = {
      admin: { email: 'admin@cafe.com', password: 'password123' },
      manager: { email: 'manager@cafe.com', password: 'password123' },
      employee: { email: 'employee@cafe.com', password: 'password123' },
    };
    setCredentials(demoUsers[role]);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-coffee-800 via-coffee-700 to-coffee-600 flex items-center justify-center p-4">
      <div className="max-w-md w-full">
        {/* Logo et titre */}
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <div className="bg-white p-4 rounded-2xl shadow-lg">
              <Coffee className="h-12 w-12 text-coffee-600" />
            </div>
          </div>
          <h1 className="text-3xl font-bold text-white mb-2">Café Inventory</h1>
          <p className="text-cream-200">Système de gestion de stock</p>
        </div>

        {/* Formulaire */}
        <div className="bg-white rounded-2xl shadow-2xl p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Connexion</h2>
          
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Email
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type="email"
                  value={credentials.email}
                  onChange={(e) => setCredentials({ ...credentials, email: e.target.value })}
                  className="input pl-10"
                  placeholder="votre@email.com"
                  disabled={isLoading}
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Mot de passe
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type="password"
                  value={credentials.password}
                  onChange={(e) => setCredentials({ ...credentials, password: e.target.value })}
                  className="input pl-10"
                  placeholder="••••••••"
                  disabled={isLoading}
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full btn btn-primary py-3 text-base font-semibold"
            >
              {isLoading ? 'Connexion...' : 'Se connecter'}
            </button>
          </form>

          {/* Comptes de démonstration */}
          <div className="mt-8 pt-6 border-t border-gray-200">
            <p className="text-sm text-gray-600 mb-3 text-center">Comptes de démonstration :</p>
            <div className="grid grid-cols-3 gap-2">
              <button
                onClick={() => handleDemoLogin('admin')}
                className="text-xs px-3 py-2 bg-purple-100 text-purple-700 rounded-lg hover:bg-purple-200 transition-colors font-medium"
                disabled={isLoading}
              >
                Admin
              </button>
              <button
                onClick={() => handleDemoLogin('manager')}
                className="text-xs px-3 py-2 bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200 transition-colors font-medium"
                disabled={isLoading}
              >
                Manager
              </button>
              <button
                onClick={() => handleDemoLogin('employee')}
                className="text-xs px-3 py-2 bg-green-100 text-green-700 rounded-lg hover:bg-green-200 transition-colors font-medium"
                disabled={isLoading}
              >
                Employé
              </button>
            </div>
          </div>
        </div>

        {/* Footer */}
        <p className="text-center text-cream-200 text-sm mt-6">
          © 2024 Café Inventory System. Tous droits réservés.
        </p>
      </div>
    </div>
  );
};

export default Login;
