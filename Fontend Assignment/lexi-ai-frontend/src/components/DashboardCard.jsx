// components/DashboardCard.jsx
import React from 'react';

const DashboardCard = ({ title, value, change, changeType, icon: Icon }) => {
  return (
    <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-gray-600 mb-1">{title}</p>
          <p className="text-2xl font-bold text-gray-900">{value}</p>
          <p className={`text-sm mt-1 ${
            changeType === 'positive' ? 'text-green-600' : 'text-red-600'
          }`}>
            {change}
          </p>
        </div>
        <div className="p-3 rounded-lg bg-gray-50">
          <Icon size={24} className="text-gray-600" />
        </div>
      </div>
    </div>
  );
};

export default DashboardCard;
