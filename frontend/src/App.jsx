/* eslint-disable react/prop-types */
import React, { useEffect, Suspense } from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  useLocation,
} from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Toaster } from 'react-hot-toast';

// Lazy load pages for better performance
const LoginPage = React.lazy(() => import('./pages/LoginPage'));
const Landing = React.lazy(() => import('./pages/LandingPage'));
const RegisterPage = React.lazy(() => import('./pages/RegisterPage'));
const FacultyDashboardPage = React.lazy(() =>
  import('./pages/FacultyDashboardPage')
);
const AdminDashboardPage = React.lazy(() =>
  import('./pages/AdminDashboardPage')
);
const StudentDashboardPage = React.lazy(() =>
  import('./components/Student/StudentDashboardPage')
);
const ErrorPage = React.lazy(() => import('./utils/ErrorPage'));

import { loginSuccess } from './store/features/authSlice';
import ProtectedRoute from './components/Admin/protectedRoute';
import ChangePasswordPage from './pages/ChangePassword';
import { getRoleFromToken } from './utils/getRoleFromToken';

function App() {
  const dispatch = useDispatch();
  const role = getRoleFromToken();

  // Get data from Redux store
  const { accessToken, status } = useSelector((state) => state.auth);

  // Initialize user data in Redux store from localStorage on app load
  useEffect(() => {
    if (!accessToken) {
      const storedAccessToken = localStorage.getItem('accessToken');
      if (storedAccessToken) {
        dispatch(
          loginSuccess({
            accessToken: storedAccessToken,
          })
        );
      }
    }
  }, [dispatch, accessToken]);

  return (
    <Router>
      <Toaster />
      <Suspense>
        <AppRoutes status={status} role={role} />
      </Suspense>
    </Router>
  );
}

// Simplified Routes Component
const AppRoutes = ({ status, role }) => {
  const location = useLocation();

  return (
    <Routes>
      {/* Landing Page (Public Page) */}
      <Route path="/" element={<Landing />} />


      {/* Login Route */}
      <Route
        path="/login"
        element={
          status === 'authenticated' ? (
            <Navigate
              to={
                role === 'faculty'
                  ? '/faculty-dashboard'
                  : role === 'admin'
                  ? '/admin-dashboard'
                  : role === 'student'
                  ? '/student-dashboard'
                  : '/'
              }
              replace
            />
          ) : (
            <LoginPage />
          )
        }
      />

      {/* Register Route */}
      <Route path="/register/*" element={<RegisterPage />} />

      {/* Protected Routes */}
      <Route element={<ProtectedRoute redirectPath="/" />}>
        <Route
          path="/faculty-dashboard/*"
          element={
            role === 'faculty' ? <FacultyDashboardPage /> : <Navigate to="/" />
          }
        />
        <Route
          path="/admin-dashboard/*"
          element={
            role === 'admin' ? <AdminDashboardPage /> : <Navigate to="/" />
          }
        />
        <Route
          path="/student-dashboard/*"
          element={
            role === 'student' ? <StudentDashboardPage /> : <Navigate to="/" />
          }
        />
        <Route path="/change-password" element={<ChangePasswordPage />} />
      </Route>

      {/* Error Route */}
      <Route path="/error" element={<ErrorPage />} />

      {/* Catch-all route */}
      <Route path="*" element={<Navigate to="/error" replace />} />
    </Routes>
  );
};

// Loading Screen Component
const LoadingScreen = () => (
  <div className="flex justify-center items-center h-screen bg-gray-100">
    <div className="flex flex-col items-center">
      <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-500 mb-4"></div>
      <p className="text-gray-600">Loading...</p>
    </div>
  </div>
);

export default App;
