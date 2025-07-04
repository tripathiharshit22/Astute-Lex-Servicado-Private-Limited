// components/Sidebar.jsx
import React from 'react';
import { Home, Users, CreditCard, Settings, UserCheck, LogOut } from 'lucide-react';

const Sidebar = () => {
  const menuItems = [
    { icon: Home, label: 'Workspaces', active: true },
    { icon: Users, label: 'Team Management', active: false },
    { icon: CreditCard, label: 'Billings & Plans', active: false },
    { icon: Settings, label: 'Settings', active: false },
    { icon: UserCheck, label: 'Contact Admin', active: false },
  ];

  return (
    <div className="w-64 bg-primary text-white h-screen fixed left-0 top-0 flex flex-col">
      {/* Logo */}
      <div className="p-6 border-b border-gray-700">
        <h1 className="text-2xl font-bold">LeXi Ai</h1>
      </div>

      {/* Menu Items */}
      <nav className="flex-1 p-4">
        <ul className="space-y-2">
          {menuItems.map((item, index) => (
            <li key={index}>
              <a
                href="#"
                className={`flex items-center space-x-3 px-3 py-2 rounded-lg transition-colors ${
                  item.active 
                    ? 'bg-blue-600 text-white' 
                    : 'text-gray-300 hover:bg-gray-700 hover:text-white'
                }`}
              >
                <item.icon size={20} />
                <span>{item.label}</span>
              </a>
            </li>
          ))}
        </ul>
      </nav>

      {/* Sign Out */}
      <div className="p-4 border-t border-gray-700">
        <button className="flex items-center space-x-3 px-3 py-2 rounded-lg text-gray-300 hover:bg-gray-700 hover:text-white transition-colors w-full">
          <LogOut size={20} />
          <span>Sign Out</span>
        </button>
      </div>
    </div>
  );
};

export default Sidebar;