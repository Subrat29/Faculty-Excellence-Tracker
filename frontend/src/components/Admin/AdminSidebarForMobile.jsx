import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  HomeIcon,
  DocumentSearchIcon,
  UserIcon,
} from '@heroicons/react/outline';
import { FaBars } from 'react-icons/fa';
import { RxCross2 } from 'react-icons/rx';
import { TfiPencilAlt } from 'react-icons/tfi';
import { FaLock, FaSignOutAlt } from 'react-icons/fa';

const AdminSidebar = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const navigate = useNavigate();
  const sidebarRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (
        sidebarRef.current && 
        !sidebarRef.current.contains(event.target) &&
        !event.target.closest('.sidebar-toggle')
      ) {
        setIsSidebarOpen(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleLinkClick = () => {
    setIsSidebarOpen(false);
  };

  const handleLogout = () => {
    console.log('Logout');
    localStorage.removeItem('accessToken');
    localStorage.removeItem('roleType');
    localStorage.removeItem('refreshToken');
    localStorage.removeItem('user');

    document.cookie =
      'accessToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/';
    document.cookie =
      'refreshToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/';

    navigate('/');
  };

  const handleChangePassword = () => {
    navigate('/change-password');
    setIsSidebarOpen(false);
  };

  return (
    <div className="relative h-screen">
      <button
        className="fixed top-3 z-50 px-4 py-2 rounded sm:hidden sidebar-toggle"
        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
      >
        {isSidebarOpen ? (
          <RxCross2 className="text-red-500 text-2xl ml-48 -mt-1" />
        ) : (
          <FaBars className="text-black -mt-1 text-2xl" />
        )}
      </button>

      <div
        ref={sidebarRef}
        className={`fixed inset-y-0 left-0 bg-gray-800 text-white w-60 transform ${
          isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
        } transition-transform duration-300 sm:relative sm:translate-x-0 sm:flex sm:flex-col`}
      >
        <div className="text-xl font-bold p-4 sm:p-6 border-b border-gray-700">
          Admin Dashboard
        </div>
        <nav className="flex-1 px-4 py-6 space-y-4">
          <Link
            to="/admin-dashboard"
            className="flex items-center p-2 hover:bg-gray-700 rounded"
            onClick={handleLinkClick}
          >
            <HomeIcon className="w-5 h-5 mr-3" />
            Dashboard
          </Link>
          <Link
            to="/admin-dashboard/profile"
            className="flex items-center p-2 hover:bg-gray-700 rounded"
            onClick={handleLinkClick}
          >
            <UserIcon className="w-5 h-5 mr-3" />
            Profile Management
          </Link>
          <Link
            to="/admin-dashboard/appraisals"
            className="flex items-center p-2 hover:bg-gray-700 rounded"
            onClick={handleLinkClick}
          >
            <TfiPencilAlt className="w-5 h-5 mr-3" />
            Appraisals
          </Link>
          <Link
            to="/admin-dashboard/faculty-stats"
            className="flex mb-6 items-center p-2 hover:bg-gray-700 rounded"
            onClick={handleLinkClick}
          >
            <DocumentSearchIcon className="w-5 h-5 mr-3" />
            Faculty Stats
          </Link>
        </nav>
        <button
          className="px-4 py-2 mt-4 mx-4 bg-blue-500 hover:bg-blue-400 rounded-md flex items-center"
          onClick={handleChangePassword}
        >
          <FaLock className="mr-2" />
          Change Password
        </button>
        <button
          className="px-4 py-2 mt-4 mx-4 bg-red-500 hover:bg-red-400 rounded-md flex items-center"
          onClick={handleLogout}
        >
          <FaSignOutAlt className="mr-2" />
          Logout
        </button>
      </div>
    </div>
  );
};

export default AdminSidebar;
