import { useEffect, useState } from 'react';
import AdminDashboard from '../components/dashboards/AdminDashboard';
import ManagerDashboard from '../components/dashboards/ManagerDashboard';
import EmployeeDashboard from '../components/dashboards/EmployeeDashboard';

const Dashboard = () => {
  const [userRole, setUserRole] = useState(null);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'));
    if (user && user.role) {
      setUserRole(user.role);
    }
  }, []);

  if (!userRole) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="spinner"></div>
      </div>
    );
  }

  // Route vers le dashboard approprié selon le rôle
  if (userRole === 'admin') {
    return <AdminDashboard />;
  }

  if (userRole === 'manager') {
    return <ManagerDashboard />;
  }

  if (userRole === 'employee') {
    return <EmployeeDashboard />;
  }

  // Fallback si aucun rôle ne correspond
  return (
    <div className="flex items-center justify-center h-64">
      <p className="text-gray-500">Rôle non reconnu</p>
    </div>
  );
};

export default Dashboard;
