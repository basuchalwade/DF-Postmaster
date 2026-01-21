import React from 'react';

const Settings: React.FC = () => {
  return (
    <div className="max-w-2xl space-y-8">
      <h2 className="text-3xl font-bold text-gray-800">Settings</h2>
      
      <div className="space-y-6">
        <section className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <h3 className="text-lg font-semibold mb-4 text-gray-900">Account</h3>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
              <input type="email" disabled value="admin@postmaster.local" className="w-full p-2 border border-gray-200 rounded-lg bg-gray-50" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Timezone</label>
              <select className="w-full p-2 border border-gray-200 rounded-lg">
                <option>UTC (GMT+0)</option>
                <option>EST (GMT-5)</option>
              </select>
            </div>
          </div>
        </section>

        <section className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <h3 className="text-lg font-semibold mb-4 text-gray-900">Integrations</h3>
          <p className="text-sm text-gray-500 mb-4">Connect your social media accounts.</p>
          <div className="space-y-3">
            {['Twitter', 'LinkedIn', 'Instagram'].map(platform => (
              <div key={platform} className="flex items-center justify-between p-3 border border-gray-200 rounded-lg">
                <span className="font-medium">{platform}</span>
                <button className="text-sm text-blue-600 hover:text-blue-800 font-medium">Connect</button>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};

export default Settings;
