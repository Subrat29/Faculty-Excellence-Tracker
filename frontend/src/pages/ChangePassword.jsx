import React, { useState, useRef, useEffect } from 'react';
import { Lock, CheckCircle, XCircle, Info } from 'lucide-react'; // Add Info icon for constraints
import AdminHeader from '../components/Admin/AdminHeader';
import axiosInstance from '../services/admin';
import toast from 'react-hot-toast';

const ChangePasswordPage = () => {
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordStrength, setPasswordStrength] = useState(0);
  const [showRequirements, setShowRequirements] = useState(false);
  const requirementsRef = useRef(null);
  const [validationErrors, setValidationErrors] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });
  const [loading, setLoading] = useState(false); // New state to track loading

  useEffect(() => {
    function handleClickOutside(event) {
      if (
        requirementsRef.current &&
        !requirementsRef.current.contains(event.target)
      ) {
        setShowRequirements(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const calculatePasswordStrength = (password) => {
    let strength = 0;
    if (password.length >= 8) strength++;
    if (/[A-Z]/.test(password)) strength++;
    if (/[a-z]/.test(password)) strength++;
    if (/[0-9]/.test(password)) strength++;
    if (/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password)) strength++;
    return strength;
  };

  const validateForm = () => {
    const errors = {
      currentPassword: '',
      newPassword: '',
      confirmPassword: '',
    };

    if (!currentPassword) {
      errors.currentPassword = 'Current password is required';
    }

    if (!newPassword) {
      errors.newPassword = 'New password is required';
    } else {
      const strength = calculatePasswordStrength(newPassword);
      setPasswordStrength(strength);
      if (strength < 3) errors.newPassword = 'Password is too weak';
      if (newPassword === currentPassword)
        errors.newPassword =
          'New password cannot be the same as current password';
    }

    if (!confirmPassword) {
      errors.confirmPassword = 'Please confirm your new password';
    } else if (newPassword !== confirmPassword) {
      errors.confirmPassword = 'Passwords do not match';
    }

    setValidationErrors(errors);
    return Object.values(errors).every((error) => error === '');
  };

  const handleNewPasswordChange = (e) => {
    const password = e.target.value;
    setNewPassword(password);
    setPasswordStrength(calculatePasswordStrength(password));
  };

  const getStrengthLabel = () => {
    if (passwordStrength === 0) return '';
    if (passwordStrength <= 2) return 'Weak';
    if (passwordStrength <= 4) return 'Medium';
    return 'Strong';
  };

  const getStrengthColor = () => {
    if (passwordStrength <= 2) return 'text-red-500';
    if (passwordStrength <= 4) return 'text-yellow-500';
    return 'text-green-500';
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return; // Don't proceed if form is invalid

    const loadingToastId = toast.loading('Changing password...'); // Show loading toast
    setLoading(true); // Set loading state to true

    try {
      const dataToSend = {
        oldPassword: currentPassword,
        newPassword: newPassword,
      };

      const response = await axiosInstance.post(
        '/v1/user/changePassword',
        dataToSend
      );

      if (response.status === 200) {
        toast.success('Password changed successfully');
      }
    } catch (error) {
      console.error(error);
      toast.error('An error occurred. Please try again.');
    } finally {
      toast.remove(loadingToastId); // Remove loading toast
      setLoading(false); // Set loading state to false
      // Clear all fields after submission
      setCurrentPassword('');
      setNewPassword('');
      setConfirmPassword('');
      setPasswordStrength(0);
      setValidationErrors({
        currentPassword: '',
        newPassword: '',
        confirmPassword: '',
      });
    }
  };

  return (
    <div>
      <AdminHeader />
      <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
        <div className="w-full max-w-md bg-white shadow-lg rounded-xl p-8 transform transition-all duration-300 hover:scale-105">
          <div className="text-center mb-6">
            <h2 className="text-2xl font-bold text-blue-800">
              Change Password
            </h2>
            <p className="text-gray-600">Faculty Excellence Tracker</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Current Password Input */}
            <div>
              <label
                htmlFor="currentPassword"
                className="block text-sm font-medium text-gray-700"
              >
                Current Password
              </label>
              <div className="relative">
                <input
                  type="password"
                  id="currentPassword"
                  value={currentPassword}
                  onChange={(e) => setCurrentPassword(e.target.value)}
                  className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 ${
                    validationErrors.currentPassword
                      ? 'border-red-500 focus:ring-red-500'
                      : 'border-gray-300 focus:ring-blue-500'
                  }`}
                  disabled={loading} // Disable input if loading
                />
                <Lock
                  className="absolute right-3 top-3 text-gray-400"
                  size={20}
                />
              </div>
              {validationErrors.currentPassword && (
                <p className="text-red-500 text-xs mt-1">
                  {validationErrors.currentPassword}
                </p>
              )}
            </div>

            {/* New Password Input */}
            <div>
              <label
                htmlFor="newPassword"
                className="block text-sm font-medium text-gray-700"
              >
                New Password
              </label>
              <div className="relative">
                <input
                  type="password"
                  id="newPassword"
                  value={newPassword}
                  onChange={handleNewPasswordChange}
                  className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 ${
                    validationErrors.newPassword
                      ? 'border-red-500 focus:ring-red-500'
                      : 'border-gray-300 focus:ring-blue-500'
                  }`}
                  disabled={loading} // Disable input if loading
                />
              </div>
              {/* Password Strength Indicator */}
              <div className="mt-2">
                <div className="flex space-x-1 mb-1">
                  {[1, 2, 3, 4, 5].map((level) => (
                    <div
                      key={level}
                      className={`h-1 flex-1 rounded-full transition-colors duration-300 ${
                        level <= passwordStrength
                          ? level <= 2
                            ? 'bg-red-500'
                            : level <= 4
                            ? 'bg-yellow-500'
                            : 'bg-green-500'
                          : 'bg-gray-300'
                      }`}
                    />
                  ))}
                </div>
                {newPassword && (
                  <p className="text-xs flex">
                    <span className={getStrengthColor()}>
                      Password Strength: {getStrengthLabel()}
                    </span>
                    <span
                      className="ml-2 cursor-pointer relative"
                      ref={requirementsRef}
                    >
                      <Info
                        size={16}
                        className="text-gray-500 hover:text-blue-500"
                        onClick={(e) => {
                          e.stopPropagation();
                          setShowRequirements(!showRequirements);
                        }}
                      />
                      <span
                        className={`absolute left-1/2 transform -translate-x-1/2 mt-1 w-40 p-2 
                          bg-white border border-gray-300 rounded-md text-sm text-gray-600 
                          shadow-md transition-opacity z-50 
                          ${
                            showRequirements
                              ? 'opacity-100'
                              : 'opacity-0 pointer-events-none'
                          }`}
                      >
                        <ul className="space-y-1">
                          <li
                            className={
                              newPassword.length >= 8 ? 'text-green-500' : ''
                            }
                          >
                            • At least 8 characters
                          </li>
                          <li
                            className={
                              /[A-Z]/.test(newPassword) ? 'text-green-500' : ''
                            }
                          >
                            • At least one uppercase letter
                          </li>
                          <li
                            className={
                              /[a-z]/.test(newPassword) ? 'text-green-500' : ''
                            }
                          >
                            • At least one lowercase letter
                          </li>
                          <li
                            className={
                              /[0-9]/.test(newPassword) ? 'text-green-500' : ''
                            }
                          >
                            • At least one number
                          </li>
                          <li
                            className={
                              /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(
                                newPassword
                              )
                                ? 'text-green-500'
                                : ''
                            }
                          >
                            • At least one special character
                          </li>
                        </ul>
                      </span>
                    </span>
                  </p>
                )}
              </div>
              {validationErrors.newPassword && (
                <p className="text-red-500 text-xs mt-1">
                  {validationErrors.newPassword}
                </p>
              )}
            </div>

            {/* Confirm Password Input */}
            <div>
              <label
                htmlFor="confirmPassword"
                className="block text-sm font-medium text-gray-700"
              >
                Confirm New Password
              </label>
              <div className="relative">
                <input
                  type="password"
                  id="confirmPassword"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 ${
                    validationErrors.confirmPassword
                      ? 'border-red-500 focus:ring-red-500'
                      : 'border-gray-300 focus:ring-blue-500'
                  }`}
                  disabled={loading} // Disable input if loading
                />
                {confirmPassword &&
                  (newPassword === confirmPassword ? (
                    <CheckCircle
                      className="absolute right-3 top-3 text-green-500"
                      size={20}
                    />
                  ) : (
                    <XCircle
                      className="absolute right-3 top-3 text-red-500"
                      size={20}
                    />
                  ))}
              </div>
              {validationErrors.confirmPassword && (
                <p className="text-red-500 text-xs mt-1">
                  {validationErrors.confirmPassword}
                </p>
              )}
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full bg-blue-800 text-white py-2 rounded-md hover:bg-blue-900 transition-colors duration-300 ease-in-out transform active:scale-95"
              disabled={loading} // Disable button when loading
            >
              {loading ? 'Changing...' : 'Change Password'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ChangePasswordPage;
