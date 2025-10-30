import { useState, useMemo } from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  LayoutDashboard,
  Package,
  Layers,
  Truck,
  TrendingUp,
  FileText,
  User,
  Users,
  ShoppingCart,
  Grid,
  LogOut,
  Menu,
  X,
  Coffee
} from 'lucide-react';
import useAuthStore from '../store/authStore';

const Layout = ({ children }) => {
  const location = useLocation();
  const { user, logout } = useAuthStore();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Navigation différenciée par rôle
  const getNavigation = () => {
    const baseNav = [
      { name: 'Dashboard', href: '/', icon: LayoutDashboard, roles: ['admin', 'manager', 'employee'] }
    ];

    // Admin a accès à tout
    if (user?.role === 'admin') {
      return [
        ...baseNav,
        { name: 'Utilisateurs', href: '/users', icon: Users, roles: ['admin'] },
        { name: 'Commandes', href: '/orders', icon: ShoppingCart, roles: ['admin', 'manager', 'employee'] },
        { name: 'Tables', href: '/tables', icon: Grid, roles: ['admin', 'manager'] },
        { name: 'Produits', href: '/products', icon: Package, roles: ['admin', 'manager'] },
        { name: 'Catégories', href: '/categories', icon: Layers, roles: ['admin', 'manager'] },
        { name: 'Fournisseurs', href: '/suppliers', icon: Truck, roles: ['admin', 'manager'] },
        { name: 'Mouvements', href: '/movements', icon: TrendingUp, roles: ['admin', 'manager'] },
        { name: 'Rapports', href: '/reports', icon: FileText, roles: ['admin', 'manager'] },
      ];
    }

    // Manager peut gérer stock et fournisseurs
    if (user?.role === 'manager') {
      return [
        ...baseNav,
        { name: 'Commandes', href: '/orders', icon: ShoppingCart, roles: ['admin', 'manager', 'employee'] },
        { name: 'Tables', href: '/tables', icon: Grid, roles: ['admin', 'manager'] },
        { name: 'Produits', href: '/products', icon: Package, roles: ['admin', 'manager'] },
        { name: 'Catégories', href: '/categories', icon: Layers, roles: ['admin', 'manager'] },
        { name: 'Fournisseurs', href: '/suppliers', icon: Truck, roles: ['admin', 'manager'] },
        { name: 'Mouvements', href: '/movements', icon: TrendingUp, roles: ['admin', 'manager'] },
        { name: 'Rapports', href: '/reports', icon: FileText, roles: ['admin', 'manager'] },
      ];
    }

    // Employee ne voit que les commandes
    if (user?.role === 'employee') {
      return [
        ...baseNav,
        { name: 'Commandes', href: '/orders', icon: ShoppingCart, roles: ['admin', 'manager', 'employee'] },
      ];
    }

    return baseNav;
  };

  const navigation = useMemo(() => getNavigation(), [user?.role]);

  const isActive = (path) => location.pathname === path;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Sidebar Desktop */}
      <div className="hidden md:fixed md:inset-y-0 md:flex md:w-64 md:flex-col">
        <div className="flex flex-col flex-grow pt-5 bg-coffee-800 overflow-y-auto">
          {/* Logo */}
          <div className="flex items-center flex-shrink-0 px-4 mb-8">
            <Coffee className="h-8 w-8 text-cream-200" />
            <span className="ml-2 text-xl font-bold text-white">Café Inventory</span>
          </div>

          {/* Navigation */}
          <div className="mt-5 flex-1 flex flex-col">
            <nav className="flex-1 px-2 space-y-1">
              {navigation.map((item) => {
                const Icon = item.icon;
                return (
                  <Link
                    key={item.name}
                    to={item.href}
                    className={`group flex items-center px-3 py-2.5 text-sm font-medium rounded-lg transition-colors ${
                      isActive(item.href)
                        ? 'bg-coffee-700 text-white'
                        : 'text-cream-200 hover:bg-coffee-700 hover:text-white'
                    }`}
                  >
                    <Icon className="mr-3 h-5 w-5" />
                    {item.name}
                  </Link>
                );
              })}
            </nav>
          </div>

          {/* User section */}
          <div className="flex-shrink-0 flex border-t border-coffee-700 p-4">
            <div className="flex items-center w-full">
              <div className="flex-1">
                <p className="text-sm font-medium text-white">{user?.name}</p>
                <p className="text-xs text-cream-300 capitalize">{user?.role}</p>
              </div>
              <button
                onClick={logout}
                className="ml-2 p-2 text-cream-300 hover:text-white transition-colors"
                title="Déconnexion"
              >
                <LogOut className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile sidebar */}
      {sidebarOpen && (
        <div className="md:hidden fixed inset-0 z-40 flex">
          <div className="fixed inset-0 bg-gray-600 bg-opacity-75" onClick={() => setSidebarOpen(false)} />
          <div className="relative flex-1 flex flex-col max-w-xs w-full bg-coffee-800">
            <div className="absolute top-0 right-0 -mr-12 pt-2">
              <button
                onClick={() => setSidebarOpen(false)}
                className="ml-1 flex items-center justify-center h-10 w-10 rounded-full focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
              >
                <X className="h-6 w-6 text-white" />
              </button>
            </div>
            <div className="flex-1 h-0 pt-5 pb-4 overflow-y-auto">
              <div className="flex items-center flex-shrink-0 px-4">
                <Coffee className="h-8 w-8 text-cream-200" />
                <span className="ml-2 text-xl font-bold text-white">Café Inventory</span>
              </div>
              <nav className="mt-5 px-2 space-y-1">
                {navigation.map((item) => {
                  const Icon = item.icon;
                  return (
                    <Link
                      key={item.name}
                      to={item.href}
                      onClick={() => setSidebarOpen(false)}
                      className={`group flex items-center px-3 py-2.5 text-sm font-medium rounded-lg transition-colors ${
                        isActive(item.href)
                          ? 'bg-coffee-700 text-white'
                          : 'text-cream-200 hover:bg-coffee-700 hover:text-white'
                      }`}
                    >
                      <Icon className="mr-3 h-5 w-5" />
                      {item.name}
                    </Link>
                  );
                })}
              </nav>
            </div>
            <div className="flex-shrink-0 flex border-t border-coffee-700 p-4">
              <div className="flex items-center w-full">
                <div className="flex-1">
                  <p className="text-sm font-medium text-white">{user?.name}</p>
                  <p className="text-xs text-cream-300 capitalize">{user?.role}</p>
                </div>
                <button
                  onClick={() => {
                    logout();
                    setSidebarOpen(false);
                  }}
                  className="ml-2 p-2 text-cream-300 hover:text-white transition-colors"
                >
                  <LogOut className="h-5 w-5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Main content */}
      <div className="md:pl-64 flex flex-col flex-1">
        {/* Top bar mobile */}
        <div className="sticky top-0 z-10 md:hidden pl-1 pt-1 sm:pl-3 sm:pt-3 bg-white border-b border-gray-200">
          <button
            onClick={() => setSidebarOpen(true)}
            className="h-12 w-12 inline-flex items-center justify-center rounded-md text-gray-500 hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-coffee-500"
          >
            <Menu className="h-6 w-6" />
          </button>
        </div>

        {/* Page content */}
        <main className="flex-1">
          <div className="py-6">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
              {children}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Layout;
