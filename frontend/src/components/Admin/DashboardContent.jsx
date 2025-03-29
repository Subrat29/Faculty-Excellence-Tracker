import React, { useState } from 'react';
import toast from 'react-hot-toast';
import axiosInstance from '../../services/admin';
import { useSelector } from 'react-redux'; // Import useSelector to access Redux state

const DashboardPage = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [email, setEmail] = useState('');
  const [role, setRole] = useState('faculty'); // State to hold the role selected in the dropdown
  const [loading, setLoading] = useState(false);

  // Get the logged-in user's role from Redux store
  const userRole = useSelector((state) => state.auth.roleType);
  console.log('User role: ', userRole);

  const openModal = () => {
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setEmail('');
  };

  const addNewUserHandler = async () => {
    if (!email.trim()) {
      toast.error('Email is required.');
      return;
    }

    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailPattern.test(email)) {
      toast.error('Invalid email address.');
      return;
    }

    const trimmedEmail = email.trim();
    console.log('trimmedEmail :: ', trimmedEmail);
    console.log('role :: ', role);

    setLoading(true); // Start loading state
    const toastId = toast.loading('Sending email...'); // Show loading toast
    try {
      // Send email to the entered email address wrapped in an object
      const response = await axiosInstance.post(
        '/v1/admin/generateRegistrationLink',
        { email: trimmedEmail, role } // Send email and role as JSON object
      );
      if (response.status !== 200) {
        toast.error('Failed to send email. Please try again later.');
        return;
      }
      toast.success(`Mail on ${email} has been sent successfully!`);
      setEmail('');
    } catch (error) {
      toast.error('Failed to send email. Please try again later.', error);
    } finally {
      setLoading(false); // Stop loading state
      toast.dismiss(toastId); // Dismiss loading toast
      closeModal();
    }
  };

  // Determine the title and available roles based on the user role
  const getTitle = () => {
    if (userRole === 'University Admin') {
      return 'Add New Admin or Faculty';
    } else if (userRole === 'College Admin') {
      return 'Add New Faculty or Department Admin';
    } else if (userRole === 'Department Admin') {
      return 'Add New Faculty';
    }
  };

  // Get the roles for dropdown based on user role
  const getRolesForDropdown = () => {
    if (userRole === 'University Admin') {
      return {
        faculty: 'Faculty',
        college_admin: 'College Admin',
        department_admin: 'Department Admin',
      };
    } else if (userRole === 'College Admin') {
      return {
        faculty: 'Faculty',
        department_admin: 'Department Admin',
      };
    } else if (userRole === 'Department Admin') {
      return {
        faculty: 'Faculty',
      };
    }
  };

  return (
    <div className="p-2 sm:p-6 mt-14 sm:mt-0 bg-gray-100 sm:min-h-screen">
      {/* Welcome Banner */}
      <div className="p-6 bg-blue-500 text-white rounded-lg mb-6">
        <h1 className="text-2xl sm:text-3xl font-bold">Welcome, Admin!</h1>
        <p className="text-lg mt-2">
          Here’s a quick overview of your faculty’s performance
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 mt-4 gap-4">
          <div className="bg-white text-blue-500 p-4 rounded-lg shadow-lg">
            <h3 className="text-xl font-semibold">Total Faculty</h3>
            <p className="text-xl sm:text-2xl font-bold">150</p>
          </div>
          <div className="bg-white text-blue-500 p-4 rounded-lg shadow-lg">
            <h3 className="text-xl font-semibold">Top Performer</h3>
            <p className="text-xl sm:text-2xl font-bold">Dr. Smith</p>
          </div>
          <div className="bg-white text-blue-500 p-4 rounded-lg shadow-lg">
            <h3 className="text-xl font-semibold">Pending Promotions</h3>
            <p className="text-xl sm:text-2xl font-bold">5</p>
          </div>
        </div>
      </div>

      {/* Activity Feed */}
      <div className="bg-white rounded-lg shadow p-6 mb-6">
        <h3 className="text-xl font-bold mb-4">Recent Faculty Activity</h3>
        <ul className="text-xm space-y-2">
          <li className="mb-2">
            📄 Dr. Johnson published a paper on AI in Education.
          </li>
          <li className="mb-2">
            🏅 Dr. Smith was promoted to Senior Professor.
          </li>
          <li className="mb-2">
            📊 Department of Science achieved 90% conference participation.
          </li>
          <li className="mb-2">👥 Dr. Brown mentored 5 new PhD students.</li>
        </ul>
      </div>

      {/* Call-to-Action Buttons */}
      <div className="flex-wrap flex justify-between ml-96 gap-4 mt-6">
        <button
          onClick={openModal}
          className="bg-green-500 text-white p-3 rounded-lg hover:bg-green-600 flex-1 md:flex-none md:w-auto"
        >
          {userRole === 'Department Admin'
            ? 'Add New Faculty'
            : 'Add New Admin or Faculty'}
        </button>
        {/* <button className="bg-blue-500 text-white p-3 rounded-lg hover:bg-blue-600 flex-1 md:flex-none md:w-auto">
          Generate Reports
        </button> */}
        {/* <button className="bg-yellow-500 text-white p-3 rounded-lg hover:bg-yellow-600 flex-1 md:flex-none md:w-auto">
          Schedule Meeting
        </button> */}
      </div>

      {modalOpen && (
        <div className="flex items-center justify-center fixed inset-0 bg-gray-800 bg-opacity-75 flex-1 md:flex-none md:w-auto">
          <div className="bg-white w-10/12 sm:w-3/4 md:w-1/2 lg:w-1/3 shadow-xl p-8 rounded-2xl max-w-lg">
            <h3 className="text-2xl font-semibold mb-6 text-center text-blue-600">
              {getTitle()} {/* Dynamic title based on user role */}
            </h3>

            {/* Dropdown for role selection, visible based on user role */}
            {userRole !== 'Department Admin' && (
              <select
                value={role}
                onChange={(e) => setRole(e.target.value)}
                className="border border-gray-300 rounded-lg w-full p-4 mb-6 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-300 ease-in-out"
              >
                {Object.entries(getRolesForDropdown()).map(([key, value]) => (
                  <option key={key} value={key}>
                    {value}
                  </option>
                ))}
              </select>
            )}

            <input
              type="text"
              placeholder="Enter the email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="border border-gray-300 rounded-lg w-full p-4 mb-6 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-300 ease-in-out"
            />
            <div className="space-x-4 text-center">
              <button
                className="bg-gray-500 text-white px-6 py-3 rounded-lg hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-opacity-50 transition duration-300"
                onClick={closeModal}
              >
                Cancel
              </button>
              <button
                className="bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition duration-300"
                onClick={addNewUserHandler}
                disabled={loading} // Disable button while loading
              >
                {loading ? (
                  <span className="animate-spin inline-block w-5 h-5 border-4 border-t-transparent border-blue-600 rounded-full" />
                ) : (
                  'Add User'
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DashboardPage;
