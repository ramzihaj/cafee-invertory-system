import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Coffee, Mail, Lock, User, Phone, Gift, CheckCircle } from 'lucide-react';
import toast from 'react-hot-toast';
import api from '../lib/api';

const Register = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1); // 1: Vérifier coupon, 2: Inscription
  const [couponCode, setCouponCode] = useState('');
  const [couponRole, setCouponRole] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    phone: ''
  });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const verifyCoupon = async () => {
    if (!couponCode.trim()) {
      toast.error('Veuillez entrer un code coupon');
      return;
    }

    setIsLoading(true);
    try {
      const { data } = await api.post('/coupons/verify', { code: couponCode });
      setCouponRole(data.data.role);
      setStep(2);
      toast.success(`Code valide ! Vous pouvez vous inscrire en tant que ${data.data.role === 'manager' ? 'Manager' : 'Employé'}`);
    } catch (error) {
      toast.error(error.response?.data?.message || 'Code coupon invalide');
    } finally {
      setIsLoading(false);
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.name.trim()) newErrors.name = 'Le nom est requis';
    if (!formData.email.trim()) {
      newErrors.email = 'L\'email est requis';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Email invalide';
    }
    if (!formData.password) {
      newErrors.password = 'Le mot de passe est requis';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Le mot de passe doit contenir au moins 6 caractères';
    }
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Les mots de passe ne correspondent pas';
    }
    if (!formData.phone.trim()) newErrors.phone = 'Le téléphone est requis';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    setIsLoading(true);
    try {
      // Inscription
      const { data: registerData } = await api.post('/auth/register', {
        name: formData.name,
        email: formData.email,
        password: formData.password,
        role: couponRole,
        phone: formData.phone
      });

      // Marquer le coupon comme utilisé
      await api.put('/coupons/use', {
        code: couponCode,
        userId: registerData.data.user.id
      });

      toast.success('Inscription réussie ! Vous pouvez maintenant vous connecter.');
      navigate('/login');
    } catch (error) {
      toast.error(error.response?.data?.message || 'Erreur lors de l\'inscription');
    } finally {
      setIsLoading(false);
    }
  };

  const getRoleBadge = (role) => {
    if (role === 'manager') {
      return { class: 'bg-blue-100 text-blue-800', label: 'Manager' };
    }
    return { class: 'bg-green-100 text-green-800', label: 'Employé' };
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
          <p className="text-cream-200">Inscription nouveau membre</p>
        </div>

        {/* Formulaire */}
        <div className="bg-white rounded-2xl shadow-2xl p-8">
          {step === 1 ? (
            // Étape 1: Vérification du coupon
            <>
              <div className="text-center mb-6">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-purple-100 rounded-full mb-4">
                  <Gift className="h-8 w-8 text-purple-600" />
                </div>
                <h2 className="text-2xl font-bold text-gray-900">Code d'Accès</h2>
                <p className="text-gray-600 mt-2">Entrez votre code d'invitation pour continuer</p>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Code Coupon
                  </label>
                  <input
                    type="text"
                    value={couponCode}
                    onChange={(e) => setCouponCode(e.target.value.toUpperCase())}
                    className="input text-center text-lg font-mono tracking-widest"
                    placeholder="XXXXXXXX"
                    maxLength={8}
                    disabled={isLoading}
                  />
                  <p className="text-xs text-gray-500 mt-2 text-center">
                    Le code vous a été fourni par un administrateur
                  </p>
                </div>

                <button
                  onClick={verifyCoupon}
                  disabled={isLoading || !couponCode}
                  className="w-full btn btn-primary py-3 text-base font-semibold"
                >
                  {isLoading ? 'Vérification...' : 'Vérifier le Code'}
                </button>

                <div className="text-center pt-4">
                  <Link to="/login" className="text-sm text-coffee-600 hover:text-coffee-800 font-medium">
                    ← Retour à la connexion
                  </Link>
                </div>
              </div>
            </>
          ) : (
            // Étape 2: Formulaire d'inscription
            <>
              <div className="text-center mb-6">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mb-4">
                  <CheckCircle className="h-8 w-8 text-green-600" />
                </div>
                <h2 className="text-2xl font-bold text-gray-900">Inscription</h2>
                <div className="mt-3">
                  <span className={`badge ${getRoleBadge(couponRole).class} text-sm px-4 py-2`}>
                    {getRoleBadge(couponRole).label}
                  </span>
                </div>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Nom complet <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                    <input
                      type="text"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className={`input pl-10 ${errors.name ? 'border-red-500' : ''}`}
                      placeholder="Jean Dupont"
                      disabled={isLoading}
                    />
                  </div>
                  {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Email <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className={`input pl-10 ${errors.email ? 'border-red-500' : ''}`}
                      placeholder="jean@exemple.com"
                      disabled={isLoading}
                    />
                  </div>
                  {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Téléphone <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                    <input
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className={`input pl-10 ${errors.phone ? 'border-red-500' : ''}`}
                      placeholder="06 12 34 56 78"
                      disabled={isLoading}
                    />
                  </div>
                  {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone}</p>}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Mot de passe <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                    <input
                      type="password"
                      value={formData.password}
                      onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                      className={`input pl-10 ${errors.password ? 'border-red-500' : ''}`}
                      placeholder="Minimum 6 caractères"
                      disabled={isLoading}
                    />
                  </div>
                  {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password}</p>}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Confirmer le mot de passe <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                    <input
                      type="password"
                      value={formData.confirmPassword}
                      onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                      className={`input pl-10 ${errors.confirmPassword ? 'border-red-500' : ''}`}
                      placeholder="Confirmer le mot de passe"
                      disabled={isLoading}
                    />
                  </div>
                  {errors.confirmPassword && <p className="text-red-500 text-sm mt-1">{errors.confirmPassword}</p>}
                </div>

                <div className="flex gap-3 pt-2">
                  <button
                    type="button"
                    onClick={() => setStep(1)}
                    className="flex-1 btn btn-secondary py-3"
                    disabled={isLoading}
                  >
                    Retour
                  </button>
                  <button
                    type="submit"
                    disabled={isLoading}
                    className="flex-1 btn btn-primary py-3 text-base font-semibold"
                  >
                    {isLoading ? 'Inscription...' : 'S\'inscrire'}
                  </button>
                </div>
              </form>
            </>
          )}
        </div>

        {/* Footer */}
        <p className="text-center text-cream-200 text-sm mt-6">
          © 2024 Café Inventory System. Tous droits réservés.
        </p>
      </div>
    </div>
  );
};

export default Register;
