import React, { useState, useRef, useEffect } from 'react';
import AdminSidebarForMobile from './AdminSidebarForMobile';
import logo from '../../assets/Logo.png';
import { useNavigate } from 'react-router-dom';
import { FaCog, FaSignOutAlt, FaLock } from 'react-icons/fa'; // Import icons

const AdminHeader = () => {
  const navigate = useNavigate();

  const [selectedLanguage, setSelectedLanguage] = useState('English');
  const [selectedYear, setSelectedYear] = useState('2023-24');
  const [openSidebar, setOpenSidebar] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false); // Manage dropdown state
  const dropdownRef = useRef(null); // Ref for dropdown

  // handle language change
  const handleLanguageChange = (e) => {
    setSelectedLanguage(e.target.value);
  };

  // handle year change
  const handleYearChange = (e) => {
    setSelectedYear(e.target.value);
  };

  const handleLogout = () => {
    // Remove tokens from localStorage
    console.log('Logout');
    localStorage.removeItem('accessToken');
    localStorage.removeItem('roleType');
    localStorage.removeItem('refreshToken');
    localStorage.removeItem('user');

    // Optional: Remove tokens from cookies if they are set there too
    document.cookie =
      'accessToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/';
    document.cookie =
      'refreshToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/';

    // Redirect to login page after logout
    navigate('/');
  };

  const handleChangePassword = () => {
    navigate('/change-password'); // Redirect to change-password page
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className="bg-white shadow-md p-3 sm:p-4 flex items-center justify-between fixed top-0 left-0 w-full z-50 sm:static">
      <img
        className="h-8 ml-10 w-10 sm:hidden cursor-pointer"
        src={logo}
        alt="FET logo"
        onClick={() => navigate('/')}
      />
      <h1
        className="text-2xl font-bold hidden sm:text-2xl cursor-pointer sm:flex"
        onClick={() => navigate('/')}
      >
        Faculty Excellence Tracker
      </h1>

      <div className="hidden sm:flex space-x-1">
        <div className="flex space-x-1">
          <select
            value={selectedYear}
            onChange={handleYearChange}
            className="bg-white text-gray-700 py-2 px-4 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 w-full sm:w-auto mr-1"
          >
            <option value="2023-24">2023-24</option>
            <option value="2022-23">2022-23</option>
            <option value="2021-22">2021-22</option>
          </select>

          {/* <select
            value={selectedLanguage}
            onChange={handleLanguageChange}
            className="bg-white text-gray-700 py-2 px-4 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 w-full sm:w-auto"
          >
            <option value="English">English</option>
            <option value="Hindi">Hindi</option>
            <option value="Tamil">Tamil</option>
          </select> */}
        </div>

        {/* Settings Button */}
        <div className="relative" ref={dropdownRef}>
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-all duration-200 w-full sm:w-auto flex items-center"
            onClick={() => setDropdownOpen(!dropdownOpen)} // Toggle dropdown visibility
          >
            <FaCog className="mr-2" /> {/* Settings Icon */}
            Settings
          </button>

          {/* Dropdown Menu */}
          {dropdownOpen && (
            <div className="absolute right-0 mt-2 bg-white shadow-lg rounded-md w-48 z-10 border border-gray-200 animate-fade-in">
              <button
                className="w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100 flex items-center transition-colors duration-200"
                onClick={handleChangePassword}
              >
                <FaLock className="mr-2" />{' '}
                {/* Lock Icon for Change Password */}
                Change Password
              </button>
              <button
                className="w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100 flex items-center transition-colors duration-200"
                onClick={handleLogout}
              >
                <FaSignOutAlt className="mr-2" />{' '}
                {/* Sign Out Icon for Logout */}
                Logout
              </button>
            </div>
          )}
        </div>
      </div>

      <div className="px-3 py-1 text-white font-medium rounded-lg bg-blue-500 shadow-sm sm:hidden">
        2023-2024
      </div>

      <div
        className={`fixed top-0 left-0 bg-blue-500 text-white shadow-lg z-50 transform ${
          openSidebar ? 'translate-x-0' : '-translate-x-full'
        } transition-transform duration-300 sm:hidden`}
      >
        <AdminSidebarForMobile />
      </div>
    </div>
  );
};

export default AdminHeader;
