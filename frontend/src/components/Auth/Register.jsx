/* eslint-disable react/prop-types */
import React, { useEffect, useState } from 'react';
import { useParams, useLocation, useNavigate } from 'react-router-dom';
import axiosInstance from '../../services/admin'; // Assuming you have axios instance configured
import toast from 'react-hot-toast';

const Register = ({ role: defaultRole }) => {
  const { role } = useParams();
  const [selectedRole, setSelectedRole] = useState(defaultRole || 'faculty');
  const location = useLocation();
  const [token, setToken] = useState(null);
  const navigate = useNavigate();
  const [data, setData] = useState({ name: '', email: '', password: '' });
  const [loading, setLoading] = useState(false); // Loading state for registration

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const tokenParam = queryParams.get('token');

    if (tokenParam) {
      setToken(tokenParam);
    }

    if (
      role === 'faculty' ||
      role === 'college_admin' ||
      role === 'department_admin'
    ) {
      setSelectedRole(role);
    } else {
      navigate('/error', { state: { message: 'INVALID_URL' } });
    }
  }, [role, location.search, navigate]);

  const formatRole = (role) => {
    return role
      .split('_')
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  };

  // Handle changes in form fields
  const handleChange = (e) => {
    setData((prevData) => ({
      ...prevData,
      [e.target.name]: e.target.value,
    }));
  };

  // General registration function
  const handleRegistration = async (role) => {
    setLoading(true); // Start loading

    const loadingToast = toast.loading('Processing your registration...');

    try {
      const dataTosend = {
        token: token,
        name: data.name,
        email: data.email,
        password: data.password,
      };

      const roleMap = {
        faculty: '/v1/faculty/register',
        college_admin: '/v1/admin/register/collegeadmin',
        department_admin: '/v1/admin/register/departmentadmin',
      };

      const response = await axiosInstance.post(roleMap[role], dataTosend);
      console.log(`${role} Response :: `, response);

      // Update toast based on response
      if (response.status === 400) {
        toast.error(response.data.message, { id: loadingToast });
      } else if (response.status === 201) {
        toast.success('Registration successful', { id: loadingToast });
        navigate(
          role === 'faculty' ? '/faculty-dashboard' : '/admin-dashboard'
        );
      }
    } catch (error) {
      console.error('error :: ', error);
      toast.error(
        error.response.data.message || 'An error occurred. Please try again',
        { id: loadingToast }
      );
    } finally {
      setLoading(false); // Stop loading
    }
  };

  // Handle Submit
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!token) {
      toast.error('Token not found. Please try again');
      return;
    }

    if (
      selectedRole === 'faculty' ||
      selectedRole === 'college_admin' ||
      selectedRole === 'department_admin'
    ) {
      await handleRegistration(selectedRole);
    } else {
      toast.error('Invalid role selected');
      navigate('/error', { state: { message: 'INVALID_URL' } });
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-orange-100">
      <div className="bg-white p-8 rounded shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6">{`${formatRole(
          selectedRole
        )} Registration`}</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <p className="text-sm text-gray-600 mb-2">
              You are registering as:{' '}
              <strong>{formatRole(selectedRole)}</strong>
            </p>
          </div>

          <input
            type="text"
            name="name"
            value={data.name}
            onChange={handleChange}
            placeholder="Name"
            className="w-full p-2 border border-gray-300 rounded mb-4"
          />
          <input
            type="email"
            name="email"
            value={data.email}
            onChange={handleChange}
            placeholder="Email"
            className="w-full p-2 border border-gray-300 rounded mb-4"
          />
          <input
            type="password"
            name="password"
            value={data.password}
            onChange={handleChange}
            placeholder="Password"
            className="w-full p-2 border border-gray-300 rounded mb-4"
          />
          <div className="flex items-center justify-between mb-4">
            <label>
              <input type="checkbox" className="mr-2" />
              Remember me
            </label>
          </div>
          <button
            type="submit"
            className="w-full bg-green-500 text-white p-2 rounded hover:bg-green-600"
            disabled={loading}
          >
            {loading ? 'Registering...' : 'Register'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Register;
