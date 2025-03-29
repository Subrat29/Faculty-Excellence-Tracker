import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function Navbar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Remove tokens from localStorage
    console.log('Logout');
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');

    // Optional: Remove tokens from cookies if they are set there too
    document.cookie =
      'accessToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/';
    document.cookie =
      'refreshToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/';

    // Redirect to login page after logout
    navigate('/login');
  };

  return (
    <div className="bg-white shadow-md p-4 flex items-center justify-between">
      <h1 className="text-2xl font-bold">Faculty Excellence Tracker</h1>
      <div className="flex items-center space-x-4">  
        <button
          onClick={handleLogout} // Call the logout function
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Logout
        </button>
      </div>
    </div>
  );
}
