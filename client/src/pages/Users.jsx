import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from 'react-query';
import { Users as UsersIcon, Plus, Edit2, Trash2, X, Gift, TrendingUp } from 'lucide-react';
import api from '../lib/api';

const Users = () => {
  const [showModal, setShowModal] = useState(false);
  const [showCouponModal, setShowCouponModal] = useState(false);
  const [editingUser, setEditingUser] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    role: 'employee',
    phone: ''
  });
  const [couponData, setCouponData] = useState({
    role: 'employee',
    expiresIn: 30
  });
  const [errors, setErrors] = useState({});
  const queryClient = useQueryClient();

  const { data: users } = useQuery('users', async () => {
    const { data } = await api.get('/users');
    return data.data;
  });

  const { data: coupons } = useQuery('coupons', async () => {
    const { data } = await api.get('/coupons');
    return data.data;
  });

  const createUserMutation = useMutation(
    (userData) => api.post('/users', userData),
    {
      onSuccess: () => {
        queryClient.invalidateQueries('users');
        setShowModal(false);
        resetForm();
        alert('Utilisateur créé avec succès!');
      },
      onError: (error) => {
        alert('Erreur: ' + (error.response?.data?.message || error.message));
      }
    }
  );

  const updateUserMutation = useMutation(
    ({ id, data }) => api.put(`/users/${id}`, data),
    {
      onSuccess: () => {
        queryClient.invalidateQueries('users');
        setShowModal(false);
        resetForm();
        alert('Utilisateur modifié avec succès!');
      },
      onError: (error) => {
        alert('Erreur: ' + (error.response?.data?.message || error.message));
      }
    }
  );

  const deleteUserMutation = useMutation(
    (id) => api.delete(`/users/${id}`),
    {
      onSuccess: () => {
        queryClient.invalidateQueries('users');
        alert('Utilisateur désactivé avec succès!');
      }
    }
  );

  const generateCouponMutation = useMutation(
    (couponData) => api.post('/coupons', couponData),
    {
      onSuccess: () => {
        queryClient.invalidateQueries('coupons');
        setShowCouponModal(false);
        alert('Coupon généré avec succès!');
      }
    }
  );

  const resetForm = () => {
    setFormData({ name: '', email: '', password: '', role: 'employee', phone: '' });
    setEditingUser(null);
    setErrors({});
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors(prev => ({ ...prev, [name]: '' }));
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = 'Le nom est requis';
    if (!formData.email.trim()) newErrors.email = 'L\'email est requis';
    if (!editingUser && !formData.password) newErrors.password = 'Le mot de passe est requis';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    if (editingUser) {
      const { password, ...updateData } = formData;
      updateUserMutation.mutate({ id: editingUser.id, data: updateData });
    } else {
      createUserMutation.mutate(formData);
    }
  };

  const handleEdit = (user) => {
    setEditingUser(user);
    setFormData({
      name: user.name,
      email: user.email,
      password: '',
      role: user.role,
      phone: user.phone || ''
    });
    setShowModal(true);
  };

  const handleDelete = (user) => {
    if (window.confirm(`Êtes-vous sûr de vouloir désactiver ${user.name} ?`)) {
      deleteUserMutation.mutate(user.id);
    }
  };

  const getRoleBadge = (role) => {
    const badges = {
      admin: 'badge bg-purple-100 text-purple-800',
      manager: 'badge bg-blue-100 text-blue-800',
      employee: 'badge bg-green-100 text-green-800'
    };
    const labels = {
      admin: 'Admin',
      manager: 'Manager',
      employee: 'Employé'
    };
    return { class: badges[role], label: labels[role] };
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Gestion des Utilisateurs</h1>
          <p className="text-gray-600 mt-1">{users?.length || 0} utilisateurs</p>
        </div>
        <div className="flex space-x-3">
          <button className="btn bg-purple-600 text-white hover:bg-purple-700" onClick={() => setShowCouponModal(true)}>
            <Gift className="h-5 w-5 mr-2" />
            Générer Coupon
          </button>
          <button className="btn btn-primary" onClick={() => setShowModal(true)}>
            <Plus className="h-5 w-5 mr-2" />
            Nouvel Utilisateur
          </button>
        </div>
      </div>

      {/* Coupons Section */}
      <div className="card">
        <h3 className="font-semibold text-gray-900 mb-4">Coupons d'Accès</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {coupons?.filter(c => !c.isUsed).slice(0, 6).map((coupon) => (
            <div key={coupon.id} className="p-4 border border-gray-200 rounded-lg bg-gradient-to-r from-coffee-50 to-coffee-100">
              <div className="flex items-center justify-between mb-2">
                <span className="font-mono font-bold text-lg text-coffee-800">{coupon.code}</span>
                <span className={getRoleBadge(coupon.role).class}>{getRoleBadge(coupon.role).label}</span>
              </div>
              <p className="text-xs text-gray-600">
                {coupon.expiresAt ? `Expire le ${new Date(coupon.expiresAt).toLocaleDateString()}` : 'Pas d\'expiration'}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Users Table */}
      <div className="card p-0">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Utilisateur</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Email</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Rôle</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Téléphone</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Statut</th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {users?.map((user) => {
                const roleBadge = getRoleBadge(user.role);
                return (
                  <tr key={user.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="h-10 w-10 flex-shrink-0">
                          <div className="h-10 w-10 rounded-full bg-coffee-100 flex items-center justify-center">
                            <span className="text-coffee-700 font-semibold">
                              {user.name.charAt(0).toUpperCase()}
                            </span>
                          </div>
                        </div>
                        <div className="ml-4">
                          <div className="font-medium text-gray-900">{user.name}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{user.email}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={roleBadge.class}>{roleBadge.label}</span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{user.phone || '-'}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {user.isActive ? (
                        <span className="badge badge-success">Actif</span>
                      ) : (
                        <span className="badge badge-danger">Inactif</span>
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <button onClick={() => handleEdit(user)} className="text-coffee-600 hover:text-coffee-900 mr-3">
                        <Edit2 className="h-4 w-4" />
                      </button>
                      <button onClick={() => handleDelete(user)} className="text-red-600 hover:text-red-900">
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* User Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg shadow-xl max-w-md w-full">
            <div className="flex items-center justify-between p-6 border-b border-gray-200">
              <h2 className="text-2xl font-bold text-gray-900">
                {editingUser ? 'Modifier l\'Utilisateur' : 'Nouvel Utilisateur'}
              </h2>
              <button onClick={() => { setShowModal(false); resetForm(); }} className="text-gray-400 hover:text-gray-600">
                <X className="h-6 w-6" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Nom <span className="text-red-500">*</span>
                </label>
                <input type="text" name="name" value={formData.name} onChange={handleInputChange}
                  className={`input ${errors.name ? 'border-red-500' : ''}`} placeholder="Nom complet" />
                {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Email <span className="text-red-500">*</span>
                </label>
                <input type="email" name="email" value={formData.email} onChange={handleInputChange}
                  className={`input ${errors.email ? 'border-red-500' : ''}`} placeholder="email@exemple.com" />
                {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
              </div>

              {!editingUser && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Mot de passe <span className="text-red-500">*</span>
                  </label>
                  <input type="password" name="password" value={formData.password} onChange={handleInputChange}
                    className={`input ${errors.password ? 'border-red-500' : ''}`} placeholder="Minimum 6 caractères" />
                  {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password}</p>}
                </div>
              )}

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Rôle</label>
                <select name="role" value={formData.role} onChange={handleInputChange} className="input">
                  <option value="employee">Employé</option>
                  <option value="manager">Manager</option>
                  <option value="admin">Admin</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Téléphone</label>
                <input type="tel" name="phone" value={formData.phone} onChange={handleInputChange}
                  className="input" placeholder="06 12 34 56 78" />
              </div>

              <div className="flex justify-end space-x-3 pt-4 border-t border-gray-200">
                <button type="button" onClick={() => { setShowModal(false); resetForm(); }} className="btn btn-secondary">
                  Annuler
                </button>
                <button type="submit" className="btn btn-primary">
                  {editingUser ? 'Modifier' : 'Créer'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Coupon Modal */}
      {showCouponModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg shadow-xl max-w-md w-full">
            <div className="flex items-center justify-between p-6 border-b border-gray-200">
              <h2 className="text-2xl font-bold text-gray-900">Générer un Coupon</h2>
              <button onClick={() => setShowCouponModal(false)} className="text-gray-400 hover:text-gray-600">
                <X className="h-6 w-6" />
              </button>
            </div>

            <form onSubmit={(e) => {
              e.preventDefault();
              generateCouponMutation.mutate(couponData);
            }} className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Rôle</label>
                <select value={couponData.role} onChange={(e) => setCouponData(prev => ({ ...prev, role: e.target.value }))}
                  className="input">
                  <option value="employee">Employé</option>
                  <option value="manager">Manager</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Expiration (jours)</label>
                <input type="number" value={couponData.expiresIn}
                  onChange={(e) => setCouponData(prev => ({ ...prev, expiresIn: parseInt(e.target.value) }))}
                  min="1" max="365" className="input" />
              </div>

              <div className="flex justify-end space-x-3 pt-4 border-t border-gray-200">
                <button type="button" onClick={() => setShowCouponModal(false)} className="btn btn-secondary">
                  Annuler
                </button>
                <button type="submit" className="btn btn-primary">
                  Générer
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Users;
