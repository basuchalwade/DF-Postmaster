import React from 'react';
import { NavLink } from 'react-router-dom';
import { LayoutDashboard, PenTool, Calendar, Image, Settings } from 'lucide-react';

const Sidebar: React.FC = () => {
  const navItems = [
    { to: "/", icon: <LayoutDashboard size={20} />, label: "Overview" },
    { to: "/create", icon: <PenTool size={20} />, label: "Creator Studio" },
    { to: "/calendar", icon: <Calendar size={20} />, label: "Calendar" },
    { to: "/media", icon: <Image size={20} />, label: "Media Library" },
    { to: "/settings", icon: <Settings size={20} />, label: "Settings" },
  ];

  return (
    <aside className="w-64 bg-gray-900 text-white flex flex-col h-screen fixed left-0 top-0">
      <div className="p-6">
        <h1 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500">
          PostMaster
        </h1>
      </div>
      <nav className="flex-1 px-4 space-y-2">
        {navItems.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                isActive ? "bg-blue-600 text-white" : "text-gray-400 hover:bg-gray-800 hover:text-white"
              }`
            }
          >
            {item.icon}
            <span className="font-medium">{item.label}</span>
          </NavLink>
        ))}
      </nav>
      <div className="p-4 border-t border-gray-800">
        <div className="text-xs text-gray-500">v0.1.0-alpha</div>
      </div>
    </aside>
  );
};

export default Sidebar;
