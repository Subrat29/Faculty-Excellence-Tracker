import React, { useEffect, useState } from 'react';
import { FiEdit2 } from 'react-icons/fi'; 
import { AiOutlineCamera } from 'react-icons/ai';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { getAdminDetails, updateAvatar, updateProfile } from '../../store/features/adminSlice';
import toast from 'react-hot-toast';

const AdminProfile = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [adminDetails, setAdminDetails] = useState({
    name: '',
    email: '',
    avatar:''
  });

  const [profile, setProfile] = useState({
    name: '', 
    email: '',
    avatar: '',
    role: '',
    collage_name: '',
    department_name: '',
  });

  const [isEditModalOpen, setEditModalOpen] = useState(false);

  // College List
  const collegeList = [
    "Agra College, Agra",
    "B.D.K. Mahavidhyala, Agra",
    "B. V. R. I., PG College, Bichpuri Agra",
    "Bhadawar Vidya Mandir P.G. College, Bah, Agra",
    "R.B.S. College, Agra",
    "Smt. B.D. Jain. Girls P.G. College, Agra",
    "St. John’s College, Agra",
    "Narain PG College, Shikohabad, Firozabad",
    "Paliwal PG College  Shikohabad Firozabad",
    "A.K.(PG) College, Shikohabad, Firozabad",
    "B.D.M.M.Girls P.G. College, Shikohabad Firozabad",
    "C.L .Jain  PG College, Firozabad",
    "Dau Dayal Mahila PG College, Firozabad",
    "M.G.B.V. P.G. College, Firozabad",
    "S. R. K. PG College, Firozabad",
  ];

  // Department List
  const departmentList = [
    "Department of Biotechnology",
    "Department of Botany",
    "Department of Chemistry",
    "Department of Commerce",
    "Department of Computer Science",
    "Department of Environmental Science",
    "Department of Hindi",
    "Department of History & Culture",
    "Department of Hotel & Tourism Management",
    "Department of Instrumentation",
    "Department of Library & Information Science",
  ];

  async function adminProfile() {
    try {
      const res = await dispatch(getAdminDetails());
      const data = res?.payload?.data;

      if (data) {
        setProfile((prevProfile) => ({
          ...prevProfile, // Spread previous state
          name: data.name,
          email: data.email,
          phone: data.phone,
          avatar: data.avatar,
          role: data.role,
        }));
        setAdminDetails((preData)=>({
          ...preData,
          name: data.name,
          email: data.email,
        }))
      }
    } catch (error) {
      console.error('Error fetching admin details:', error);
    }
  }

  function handleInput(e) {
    const {name, value} = e.target;
    setAdminDetails({
        ...adminDetails,
        [name]: value
    })
  }

  const handleAvatarChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      // Directly update the avatar file in state
      setAdminDetails((prev) => ({ ...prev, avatar: file }));

      // Immediately call the upload function with the file
      handleUpdateAvatar(file);
    }
  };
  
  const handleUpdateAvatar = async (avatarFile) => {
    if (!avatarFile) {
      toast.error("Picture not found");
      return;
    }
    const formData = new FormData();
    formData.append("avatar", avatarFile); // Append the file object directly
    try {
      const response = await dispatch(updateAvatar(formData));
      if(response){
        adminProfile()
      }
      if (response?.payload?.data) {
        setProfile((prev) => ({
          ...prev,
          avatar: response.payload.data.avatar, // Update profile avatar from server response
        })); 
      }
    } catch (error) {
      console.error("Error updating avatar:", error);
      toast.error("Failed to update avatar");
    }
  };

  // Handle Profile Edit Save
  const handleSaveProfile = async (e) => {
    e.preventDefault();
    // Create a FormData instance
    const formData = new FormData();
    formData.append('name', adminDetails.name);
    formData.append('email', adminDetails.email);
    try {
      const response = await dispatch(updateProfile(formData));
      if(response){
        adminProfile()
      }
      setEditModalOpen(false); // Close the modal
    } catch (error) {
      console.error("Error updating profile", error);
    }
  };

  // Handle logout profile
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

  useEffect(() => {
    adminProfile();
  },[]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-blue-50 to-green-100 p-6">
      <div className="max-w-4xl w-full bg-white shadow-lg rounded-lg overflow-hidden">
        {/* Header Section */}
        <div className="relative bg-gradient-to-r from-blue-600 to-green-600 text-white p-6 text-center">
          <div className="relative inline-block mx-auto">
            <img
              src={profile.avatar}
              alt="Admin Avatar"
              className="w-32 h-32 rounded-full mx-auto border-4 border-white shadow-md"
            />
            <label
              htmlFor="avatar-upload"
              className="absolute bottom-2 right-2 bg-blue-500 text-white p-2 rounded-full shadow-md hover:bg-blue-600 transition-all cursor-pointer"
            >
              <AiOutlineCamera size={20} />
              <input
                type="file"
                id="avatar-upload"
                accept="image/*"
                className="hidden"
                onChange={handleAvatarChange}
              />
            </label>
          </div>
          <h1 className="text-2xl font-bold mt-4">{profile.name}</h1>
          <p className="text-lg">{profile.role}</p>
        </div>

        {/* Profile Details */}
        <div className="p-6">
          <h2 className="text-xl font-semibold mb-4 text-gray-700">
            Profile Details
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <ProfileDetail label="Name" value={profile.name} />
            <ProfileDetail label="Email" value={profile.email} />
            <ProfileDetail label="Role" value={profile.role} />
            <ProfileDetail label="Collage Name" value={profile.collage_name} />
            <ProfileDetail
              label="Department Name"
              value={profile.department_name}
            />
          </div>
        </div>

        {/* Action Buttons */}
        <div className="p-6 border-t border-gray-200 flex flex-col sm:flex-row items-center justify-center">
          <button
            onClick={() => setEditModalOpen(true)}
            className="bg-blue-500 text-white py-2 px-6 rounded-lg shadow hover:bg-blue-600 transition-all"
          >
            <FiEdit2 className="inline mr-2" />
            Edit Profile
          </button>
        </div>
      </div>

      {/* Edit Profile Modal */}
      {isEditModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-lg shadow-lg">
            <h2 className="text-2xl font-semibold mb-4">Edit Profile</h2>
            <form onSubmit={handleSaveProfile}>
              <div className="grid grid-cols-1 gap-4">
                <InputField
                  label="Name"
                  name="name"
                  id="name"
                  value={adminDetails.name}
                  onChange={handleInput}
                />
                <InputField
                  label="Email"
                  name="email"
                  id="email"
                  value={adminDetails.email}
                  onChange={handleInput}
                />
                <DropdownField
                  label="College Name"
                  options={collegeList}
                  value={profile.collage_name}
                  onChange={(e) =>
                    setProfile((prev) => ({
                      ...prev,
                      collage_name: e.target.value,
                    }))
                  }
                />
                <DropdownField
                  label="Department Name"
                  options={departmentList}
                  value={profile.department_name}
                  onChange={(e) =>
                    setProfile((prev) => ({
                      ...prev,
                      department_name: e.target.value,
                    }))
                  }
                />
              </div>
              <div className="flex justify-end mt-4">
                <button
                  type="button"
                  onClick={() => setEditModalOpen(false)}
                  className="bg-gray-300 text-gray-700 py-2 px-6 rounded-lg shadow mr-2 hover:bg-gray-400 transition-all"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-blue-500 text-white py-2 px-6 rounded-lg shadow hover:bg-blue-600 transition-all"
                >
                  Save
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
// Reusable Components
const ProfileDetail = ({ label, value }) => (
  <div className="bg-gray-50 p-4 rounded shadow-sm">
    <h3 className="text-sm font-semibold text-gray-600">{label}:</h3>
    <p className="text-gray-800">{value}</p>
  </div>
);

const InputField = ({ label, value, onChange,name,id}) => (
  <div>
    <label className="block text-gray-700 text-sm font-semibold mb-1">
      {label}
    </label>
    <input
      type="text"
      id={id}
      name={name}
      value={value}
      onChange={onChange}
      className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
    />
  </div>
);

const DropdownField = ({ label, options, value, onChange,name, id }) => (
  <div>
    <label className="block text-gray-700 text-sm font-semibold mb-1">
      {label}
    </label>
    <select
    disabled
      value={value}
      name={name}
      onChange={onChange}
      className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
    >
      {options.map((option, index) => (
        <option key={index} value={option}>
          {option}
        </option>
      ))}
    </select>
  </div>
);

export default AdminProfile;
