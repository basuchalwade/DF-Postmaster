import React, { useEffect, useState } from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import { checkHealth } from '../api';
import { AlertTriangle, CheckCircle } from 'lucide-react';

const Layout: React.FC = () => {
  const [isBackendUp, setIsBackendUp] = useState<boolean | null>(null);

  useEffect(() => {
    const ping = async () => {
      const healthy = await checkHealth();
      setIsBackendUp(healthy);
    };
    ping();
    const interval = setInterval(ping, 10000); // Check every 10s
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar />
      <div className="ml-64 flex-1 flex flex-col">
        {/* Status Banner */}
        <div className={`w-full px-6 py-2 flex items-center justify-between text-sm font-medium ${
            isBackendUp === null ? 'bg-gray-200 text-gray-700' :
            isBackendUp ? 'bg-green-100 text-green-800 border-b border-green-200' : 
            'bg-amber-100 text-amber-800 border-b border-amber-200'
        }`}>
            <div className="flex items-center gap-2">
                {isBackendUp === null ? (
                    <span>Connecting...</span>
                ) : isBackendUp ? (
                    <>
                        <CheckCircle size={16} />
                        <span>Connected to Backend</span>
                    </>
                ) : (
                    <>
                        <AlertTriangle size={16} />
                        <span>Backend not detected – using mock data</span>
                    </>
                )}
            </div>
            <div className="text-xs opacity-75">
                {new Date().toLocaleTimeString()}
            </div>
        </div>
        
        <main className="flex-1 p-8 overflow-y-auto">
          <Outlet context={{ isBackendUp }} />
        </main>
      </div>
    </div>
  );
};

export default Layout;
