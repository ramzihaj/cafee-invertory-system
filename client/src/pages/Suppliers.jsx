import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from 'react-query';
import { Truck, Plus, Mail, Phone, Edit2, Trash2, X } from 'lucide-react';
import api from '../lib/api';

const Suppliers = () => {
  const [showModal, setShowModal] = useState(false);
  const [editingSupplier, setEditingSupplier] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    company: '',
    email: '',
    phone: '',
    addressStreet: '',
    addressCity: '',
    addressPostalCode: '',
    addressCountry: 'France',
    notes: '',
    isActive: true
  });
  const [errors, setErrors] = useState({});

  const queryClient = useQueryClient();

  const { data: suppliers, isLoading } = useQuery('suppliers', async () => {
    const { data } = await api.get('/suppliers');
    return data.data;
  });

  const createSupplierMutation = useMutation(
    (supplierData) => api.post('/suppliers', supplierData),
    {
      onSuccess: () => {
        queryClient.invalidateQueries('suppliers');
        setShowModal(false);
        resetForm();
        alert('Fournisseur créé avec succès!');
      },
      onError: (error) => {
        alert('Erreur: ' + (error.response?.data?.message || error.message));
      }
    }
  );

  const updateSupplierMutation = useMutation(
    ({ id, data }) => api.put(`/suppliers/${id}`, data),
    {
      onSuccess: () => {
        queryClient.invalidateQueries('suppliers');
        setShowModal(false);
        resetForm();
        alert('Fournisseur modifié avec succès!');
      },
      onError: (error) => {
        alert('Erreur: ' + (error.response?.data?.message || error.message));
      }
    }
  );

  const deleteSupplierMutation = useMutation(
    (id) => api.delete(`/suppliers/${id}`),
    {
      onSuccess: () => {
        queryClient.invalidateQueries('suppliers');
        alert('Fournisseur désactivé avec succès!');
      },
      onError: (error) => {
        alert('Erreur: ' + (error.response?.data?.message || error.message));
      }
    }
  );

  const resetForm = () => {
    setFormData({
      name: '',
      company: '',
      email: '',
      phone: '',
      addressStreet: '',
      addressCity: '',
      addressPostalCode: '',
      addressCountry: 'France',
      notes: '',
      isActive: true
    });
    setEditingSupplier(null);
    setErrors({});
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({ ...prev, [name]: type === 'checkbox' ? checked : value }));
    if (errors[name]) setErrors(prev => ({ ...prev, [name]: '' }));
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = 'Le nom est requis';
    if (!formData.phone.trim()) newErrors.phone = 'Le téléphone est requis';
    if (formData.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Email invalide';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    if (editingSupplier) {
      updateSupplierMutation.mutate({ id: editingSupplier.id, data: formData });
    } else {
      createSupplierMutation.mutate(formData);
    }
  };

  const handleEdit = (supplier) => {
    setEditingSupplier(supplier);
    setFormData({
      name: supplier.name,
      company: supplier.company || '',
      email: supplier.email || '',
      phone: supplier.phone,
      addressStreet: supplier.addressStreet || '',
      addressCity: supplier.addressCity || '',
      addressPostalCode: supplier.addressPostalCode || '',
      addressCountry: supplier.addressCountry || 'France',
      notes: supplier.notes || '',
      isActive: supplier.isActive
    });
    setShowModal(true);
  };

  const handleDelete = (supplier) => {
    if (window.confirm(`Êtes-vous sûr de vouloir désactiver "${supplier.name}" ?`)) {
      deleteSupplierMutation.mutate(supplier.id);
    }
  };

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
        <button className="btn btn-primary" onClick={() => setShowModal(true)}>
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
            <div className="mt-4 pt-4 border-t border-gray-200 flex items-center justify-between">
              <p className="text-sm text-gray-600">
                <strong>{supplier.products?.length || 0}</strong> produits fournis
              </p>
              <div className="flex space-x-2">
                <button onClick={() => handleEdit(supplier)} className="text-coffee-600 hover:text-coffee-800 p-2">
                  <Edit2 className="h-4 w-4" />
                </button>
                <button onClick={() => handleDelete(supplier)} className="text-red-600 hover:text-red-800 p-2">
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between p-6 border-b border-gray-200">
              <h2 className="text-2xl font-bold text-gray-900">
                {editingSupplier ? 'Modifier le Fournisseur' : 'Nouveau Fournisseur'}
              </h2>
              <button onClick={() => { setShowModal(false); resetForm(); }} className="text-gray-400 hover:text-gray-600">
                <X className="h-6 w-6" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Nom <span className="text-red-500">*</span>
                  </label>
                  <input type="text" name="name" value={formData.name} onChange={handleInputChange}
                    className={`input ${errors.name ? 'border-red-500' : ''}`} placeholder="Nom du contact" />
                  {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Entreprise</label>
                  <input type="text" name="company" value={formData.company} onChange={handleInputChange}
                    className="input" placeholder="Nom de l'entreprise" />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                  <input type="email" name="email" value={formData.email} onChange={handleInputChange}
                    className={`input ${errors.email ? 'border-red-500' : ''}`} placeholder="email@exemple.com" />
                  {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Téléphone <span className="text-red-500">*</span>
                  </label>
                  <input type="tel" name="phone" value={formData.phone} onChange={handleInputChange}
                    className={`input ${errors.phone ? 'border-red-500' : ''}`} placeholder="06 12 34 56 78" />
                  {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone}</p>}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Adresse</label>
                <input type="text" name="addressStreet" value={formData.addressStreet} onChange={handleInputChange}
                  className="input" placeholder="Rue" />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Ville</label>
                  <input type="text" name="addressCity" value={formData.addressCity} onChange={handleInputChange}
                    className="input" placeholder="Paris" />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Code Postal</label>
                  <input type="text" name="addressPostalCode" value={formData.addressPostalCode} onChange={handleInputChange}
                    className="input" placeholder="75001" />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Pays</label>
                  <input type="text" name="addressCountry" value={formData.addressCountry} onChange={handleInputChange}
                    className="input" placeholder="France" />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Notes</label>
                <textarea name="notes" value={formData.notes} onChange={handleInputChange}
                  rows="3" className="input" placeholder="Informations supplémentaires..." />
              </div>

              <div className="flex items-center">
                <input type="checkbox" name="isActive" checked={formData.isActive} onChange={handleInputChange}
                  className="h-4 w-4 text-coffee-600 focus:ring-coffee-500 border-gray-300 rounded" />
                <label className="ml-2 block text-sm text-gray-900">Fournisseur actif</label>
              </div>

              <div className="flex justify-end space-x-3 pt-4 border-t border-gray-200">
                <button type="button" onClick={() => { setShowModal(false); resetForm(); }} className="btn btn-secondary">
                  Annuler
                </button>
                <button type="submit" className="btn btn-primary">
                  {editingSupplier ? 'Modifier' : 'Créer'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Suppliers;
