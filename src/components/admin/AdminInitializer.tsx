
import { useEffect } from 'react';
import { initializeData } from '@/utils/dataService';

const AdminInitializer = () => {
  useEffect(() => {
    // Initialize the data service when the app loads
    initializeData();
  }, []);

  return null; // This component doesn't render anything
};

export default AdminInitializer;
