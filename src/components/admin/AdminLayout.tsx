
import { ReactNode } from 'react';
import { useLocation, Navigate } from 'react-router-dom';
import AdminInitializer from './AdminInitializer';
import useAdminAuth from '@/hooks/useAdminAuth';

interface AdminLayoutProps {
  children: ReactNode;
}

const AdminLayout = ({ children }: AdminLayoutProps) => {
  const { isAuthenticated, isLoading } = useAdminAuth();
  const location = useLocation();

  // Add AdminInitializer to initialize our data
  return (
    <>
      <AdminInitializer />
      {isLoading ? (
        <div className="flex items-center justify-center h-screen">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900"></div>
        </div>
      ) : isAuthenticated || location.pathname === '/admin/login' ? (
        <div className="bg-gray-50 min-h-screen">
          {children}
        </div>
      ) : (
        <Navigate to="/admin/login" replace />
      )}
    </>
  );
};

export default AdminLayout;
