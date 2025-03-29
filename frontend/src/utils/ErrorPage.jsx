/* eslint-disable react/prop-types */
import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { BookX, Link2Off, WifiOffIcon } from 'lucide-react';
import { Button } from '../components/ui/Button';
import { Card } from '../components/ui/Card';

const ErrorPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { errorType = 'INVALID_URL' } = location.state || {};

  const handleButtonClick = () => {
    navigate('/');
  };

  const errorConfig = {
    INVALID_URL: {
      icon: Link2Off,
      title: 'Invalid URL',
      message: "The URL you're trying to access appears to be incorrect.",
      supportText:
        "Please ensure you've copied the complete URL or contact support.",
    },
    API_ERROR: {
      icon: WifiOffIcon,
      title: 'Unable to Load Admission Form',
      message: "We're having trouble connecting to our servers.",
      supportText:
        'Please try again later or contact our technical support team.',
    },
    NOT_ACCESSIBLE: {
      icon: BookX,
      title: 'Access Denied',
      message: 'You do not have permission to access this page.',
      supportText: 'Please contact support for assistance.',
    },
    DEFAULT: {
      icon: BookX,
      title: 'Oops! Something Went Wrong',
      message: 'We encountered an unexpected error.',
      supportText: 'Please try again or contact support for assistance.',
    },
  };

  const {
    icon: Icon,
    title,
    message,
    supportText,
  } = errorConfig[errorType] || errorConfig.DEFAULT;

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <Card className="max-w-lg w-full mx-auto text-center p-6 space-y-6">
        <div className="flex justify-center">
          <div className="bg-red-100 p-6 rounded-full">
            <Icon className="w-24 h-24 text-red-500" />
          </div>
        </div>

        <div className="space-y-4">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900">
            {title}
          </h1>

          <p className="text-lg text-gray-600 max-w-md mx-auto">{message}</p>

          <div className="bg-yellow-50 p-4 rounded-lg">
            <p className="text-sm text-yellow-800">
              Need help? Contact our support team:
              <br />
              <span className="font-semibold">contactus@fet.com</span>
            </p>
          </div>
        </div>

        <div className="pt-4">
          <Button
            onClick={handleButtonClick}
            className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-2 rounded-lg transition-colors"
          >
            Return to Home
          </Button>
        </div>

        <p className="text-sm text-gray-500">{supportText}</p>
      </Card>
    </div>
  );
};

export default ErrorPage;
