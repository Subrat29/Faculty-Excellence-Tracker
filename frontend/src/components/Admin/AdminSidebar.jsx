import React from "react";
import { Link } from "react-router-dom";
import {
  HomeIcon,
  DocumentSearchIcon,
  UserIcon,
} from "@heroicons/react/outline"; // Importing icons from Heroicons

const AdminSidebar = () => {
  return (
    <div className="h-auto hidden   bg-gray-800 text-white w-64 sm:flex flex-col">
      <div className="text-2xl font-bold p-6 border-b border-gray-700">
        Admin Dashboard
      </div>
      <nav className="flex-1 px-4 py-6 space-y-4">
        <Link
          to="/admin-dashboard"
          className="flex items-center p-2 hover:bg-gray-700 rounded"
        >
          <HomeIcon className="w-5 h-5 mr-3" />
          Dashboard
        </Link>

        <Link
          to="/admin-dashboard/profile"
          className="flex items-center p-2 hover:bg-gray-700 rounded"
        >
          <UserIcon className="w-5 h-5 mr-3" />
          Profile Management
        </Link>

        <Link
          to="/admin-dashboard/appraisals"
          className="flex items-center p-2 hover:bg-gray-700 rounded"
        >
          <UserIcon className="w-5 h-5 mr-3" />
          Appraisals
        </Link>
        <Link
          to="/admin-dashboard/faculty-stats"
          className="flex items-center p-2 hover:bg-gray-700 rounded"
        >
          <DocumentSearchIcon className="w-5 h-5 mr-3" />
          Faculty Stats
        </Link>

        {/* Add more navigation links as required */}
      </nav>
    </div>
  );
};

export default AdminSidebar;
