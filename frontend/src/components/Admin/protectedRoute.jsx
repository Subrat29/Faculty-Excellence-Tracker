import React, { useEffect } from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../../store/features/authSlice';

const ProtectedRoute = ({ redirectPath = '/login', children }) => {
  const dispatch = useDispatch();
  const { status, loading, accessToken } = useSelector((state) => state.auth);
  const location = useLocation();

  useEffect(() => {
    // Additional check to verify localStorage
    const storedToken = localStorage.getItem('accessToken');

    // If no token in localStorage but Redux thinks we're authenticated, force logout
    if ((!storedToken || !accessToken) && status === 'authenticated') {
      dispatch(logout());
    }
  }, [dispatch, status]);

  // Strict loading and authentication check
  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        Loading...
      </div>
    );
  }

  // Check both Redux status and localStorage
  const storedToken = localStorage.getItem('accessToken');
  if (!storedToken || !accessToken || status !== 'authenticated') {
    return <Navigate to={redirectPath} state={{ from: location }} replace />;
  }

  // If authenticated, render children or Outlet
  return children ? children : <Outlet />;
};

export default ProtectedRoute;
