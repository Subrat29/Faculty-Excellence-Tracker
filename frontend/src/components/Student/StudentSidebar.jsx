import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  HomeIcon,
  DocumentSearchIcon,
  UserIcon,
  MenuIcon,
  XIcon,
} from "@heroicons/react/outline";

const StudentSidebar = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="flex">
      {/* Sidebar Toggle Button for Mobile */}
      <button
        className="sm:hidden bg-gray-800 text-white p-3 fixed top-4 left-4 z-50"
        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
      >
        {isSidebarOpen ? (
          <XIcon className="w-6 h-6" />
        ) : (
          <MenuIcon className="w-6 h-6" />
        )}
      </button>

      {/* Sidebar */}
      <div
        className={`h-screen bg-gray-800 text-white w-64 flex flex-col fixed sm:relative z-40 transition-transform duration-300 ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full sm:translate-x-0"
        }`}
      >
        <div className="text-2xl font-bold p-6 border-b border-gray-700">
          Student Dashboard
        </div>
        <nav className="flex-1 px-4 py-6 space-y-4">
          <Link
            to="/student-dashboard"
            className="flex items-center p-2 hover:bg-gray-700 rounded"
          >
            <HomeIcon className="w-5 h-5 mr-3" />
            Dashboard
          </Link>
          <Link
            to="/student-dashboard/profile"
            className="flex items-center p-2 hover:bg-gray-700 rounded"
          >
            <UserIcon className="w-5 h-5 mr-3" />
            Profile
          </Link>
          <Link
            to="/student-dashboard/feedback-form"
            className="flex items-center p-2 hover:bg-gray-700 rounded"
          >
            <DocumentSearchIcon className="w-5 h-5 mr-3" />
            Feedback Form
          </Link>
          {/* Add more navigation links as required */}
        </nav>
      </div>

      {/* Overlay for Mobile */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black opacity-50 sm:hidden"
          onClick={() => setIsSidebarOpen(false)}
        ></div>
      )}
    </div>
  );
};

export default StudentSidebar;
