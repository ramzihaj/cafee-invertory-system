import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from 'react-query';
import { Grid, Plus, Edit2, Trash2, X, Users as UsersIcon } from 'lucide-react';
import api from '../lib/api';

const Tables = () => {
  const [showModal, setShowModal] = useState(false);
  const [editingTable, setEditingTable] = useState(null);
  const [formData, setFormData] = useState({
    number: '',
    capacity: 4,
    assignedTo: ''
  });
  const [errors, setErrors] = useState({});
  const queryClient = useQueryClient();

  const { data: tables } = useQuery('tables', async () => {
    const { data } = await api.get('/tables');
    return data.data;
  });

  const { data: employees } = useQuery('employees', async () => {
    const { data } = await api.get('/users?role=employee&isActive=true');
    return data.data;
  });

  const createTableMutation = useMutation(
    (tableData) => api.post('/tables', tableData),
    {
      onSuccess: () => {
        queryClient.invalidateQueries('tables');
        setShowModal(false);
        resetForm();
        alert('Table créée avec succès!');
      },
      onError: (error) => {
        alert('Erreur: ' + (error.response?.data?.message || error.message));
      }
    }
  );

  const updateTableMutation = useMutation(
    ({ id, data }) => api.put(`/tables/${id}`, data),
    {
      onSuccess: () => {
        queryClient.invalidateQueries('tables');
        setShowModal(false);
        resetForm();
        alert('Table modifiée avec succès!');
      },
      onError: (error) => {
        alert('Erreur: ' + (error.response?.data?.message || error.message));
      }
    }
  );

  const deleteTableMutation = useMutation(
    (id) => api.delete(`/tables/${id}`),
    {
      onSuccess: () => {
        queryClient.invalidateQueries('tables');
        alert('Table désactivée avec succès!');
      }
    }
  );

  const resetForm = () => {
    setFormData({ number: '', capacity: 4, assignedTo: '' });
    setEditingTable(null);
    setErrors({});
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors(prev => ({ ...prev, [name]: '' }));
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.number || formData.number < 1) newErrors.number = 'Le numéro est requis';
    if (!formData.capacity || formData.capacity < 1) newErrors.capacity = 'La capacité est requise';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    const tableData = {
      ...formData,
      number: parseInt(formData.number),
      capacity: parseInt(formData.capacity),
      assignedTo: formData.assignedTo || null
    };

    if (editingTable) {
      updateTableMutation.mutate({ id: editingTable.id, data: tableData });
    } else {
      createTableMutation.mutate(tableData);
    }
  };

  const handleEdit = (table) => {
    setEditingTable(table);
    setFormData({
      number: table.number.toString(),
      capacity: table.capacity,
      assignedTo: table.assignedTo || ''
    });
    setShowModal(true);
  };

  const handleDelete = (table) => {
    if (window.confirm(`Êtes-vous sûr de vouloir désactiver la Table #${table.number} ?`)) {
      deleteTableMutation.mutate(table.id);
    }
  };

  const getStatusBadge = (status) => {
    const statuses = {
      available: { class: 'badge bg-green-100 text-green-800', label: 'Disponible' },
      occupied: { class: 'badge bg-red-100 text-red-800', label: 'Occupée' },
      reserved: { class: 'badge bg-yellow-100 text-yellow-800', label: 'Réservée' }
    };
    return statuses[status] || statuses.available;
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Gestion des Tables</h1>
          <p className="text-gray-600 mt-1">{tables?.length || 0} tables configurées</p>
        </div>
        <button className="btn btn-primary" onClick={() => setShowModal(true)}>
          <Plus className="h-5 w-5 mr-2" />
          Nouvelle Table
        </button>
      </div>

      {/* Tables Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4">
        {tables?.map((table) => {
          const status = getStatusBadge(table.status);
          return (
            <div
              key={table.id}
              className="card hover:shadow-lg transition-all cursor-pointer group relative"
            >
              <div className="text-center">
                <div className={`w-16 h-16 mx-auto mb-3 rounded-full flex items-center justify-center ${
                  table.status === 'available' ? 'bg-green-100' :
                  table.status === 'occupied' ? 'bg-red-100' : 'bg-yellow-100'
                }`}>
                  <span className="text-2xl font-bold text-gray-800">#{table.number}</span>
                </div>
                
                <span className={`${status.class} text-xs mb-2 inline-block`}>{status.label}</span>
                
                <div className="text-sm text-gray-600 mb-2">
                  <UsersIcon className="h-4 w-4 inline mr-1" />
                  {table.capacity} places
                </div>

                {table.assignedEmployee && (
                  <div className="text-xs text-coffee-600 font-medium truncate" title={table.assignedEmployee.name}>
                    {table.assignedEmployee.name}
                  </div>
                )}
              </div>

              {/* Actions */}
              <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity flex gap-1">
                <button
                  onClick={() => handleEdit(table)}
                  className="p-1.5 bg-blue-100 text-blue-600 rounded-lg hover:bg-blue-200"
                  title="Modifier"
                >
                  <Edit2 className="h-3 w-3" />
                </button>
                <button
                  onClick={() => handleDelete(table)}
                  className="p-1.5 bg-red-100 text-red-600 rounded-lg hover:bg-red-200"
                  title="Désactiver"
                >
                  <Trash2 className="h-3 w-3" />
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg shadow-xl max-w-md w-full">
            <div className="flex items-center justify-between p-6 border-b border-gray-200">
              <h2 className="text-2xl font-bold text-gray-900">
                {editingTable ? 'Modifier la Table' : 'Nouvelle Table'}
              </h2>
              <button onClick={() => { setShowModal(false); resetForm(); }} className="text-gray-400 hover:text-gray-600">
                <X className="h-6 w-6" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Numéro de Table <span className="text-red-500">*</span>
                </label>
                <input
                  type="number"
                  name="number"
                  value={formData.number}
                  onChange={handleInputChange}
                  min="1"
                  className={`input ${errors.number ? 'border-red-500' : ''}`}
                  placeholder="1"
                />
                {errors.number && <p className="text-red-500 text-sm mt-1">{errors.number}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Capacité (nombre de places) <span className="text-red-500">*</span>
                </label>
                <input
                  type="number"
                  name="capacity"
                  value={formData.capacity}
                  onChange={handleInputChange}
                  min="1"
                  max="20"
                  className={`input ${errors.capacity ? 'border-red-500' : ''}`}
                  placeholder="4"
                />
                {errors.capacity && <p className="text-red-500 text-sm mt-1">{errors.capacity}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Serveur Assigné (optionnel)
                </label>
                <select
                  name="assignedTo"
                  value={formData.assignedTo}
                  onChange={handleInputChange}
                  className="input"
                >
                  <option value="">Aucun serveur assigné</option>
                  {employees?.map((emp) => (
                    <option key={emp.id} value={emp.id}>
                      {emp.name}
                    </option>
                  ))}
                </select>
              </div>

              <div className="flex justify-end space-x-3 pt-4 border-t border-gray-200">
                <button type="button" onClick={() => { setShowModal(false); resetForm(); }} className="btn btn-secondary">
                  Annuler
                </button>
                <button type="submit" className="btn btn-primary">
                  {editingTable ? 'Modifier' : 'Créer'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Tables;
