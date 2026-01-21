import React from 'react';

const Calendar: React.FC = () => {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold text-gray-800">Calendar</h2>
        <button className="bg-white border border-gray-200 px-4 py-2 rounded-lg text-sm font-medium hover:bg-gray-50">
          Month View
        </button>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 h-[600px] flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-400 mb-2">Calendar feature coming soon</p>
          <button className="text-blue-600 text-sm hover:underline">
            Switch to List View
          </button>
        </div>
      </div>
    </div>
  );
};

export default Calendar;
