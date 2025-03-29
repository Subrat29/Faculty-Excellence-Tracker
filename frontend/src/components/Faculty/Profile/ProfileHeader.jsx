import React, { useState, useRef } from 'react';
import { Pencil } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const profileData = {
    name: "Prof. Subrat Kar",
    designation: "Professor (HAG), Indian Institute of Technology Delhi",
    vidwanScore: 9.7,
    image: "/api/placeholder/200/200",
};

function ProfileHeader() {
    const [profileImage, setProfileImage] = useState(profileData.image);
    const fileInputRef = useRef(null);
    const navigate = useNavigate();

    const handleImageUpload = (event) => {
        const file = event.target.files[0];
        if (file) {
            // Create a FileReader to convert the file to a data URL
            const reader = new FileReader();
            reader.onloadend = () => {
                // Set the profile image to the local file's data URL
                setProfileImage(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    const triggerFileInput = () => {
        fileInputRef.current.click();
    };

    const handleChangePassword = () => {
        navigate('/change-password'); // Redirect to change-password page
      };

    return (
        <header className="bg-gradient-to-r from-slate-800 to-slate-700 text-white p-6 shadow-md flex items-center">
            <div className="flex-grow flex items-center space-x-6 relative">
                <div className="relative">
                    <img
                        src={profileImage}
                        alt={profileData.name}
                        className="w-20 h-20 rounded-full border-3 border-white object-cover shadow-md"
                    />
                    <button 
                        onClick={triggerFileInput}
                        className="absolute bottom-0 right-0 bg-blue-700 rounded-full p-1 hover:bg-blue-600 transition-colors"
                    >
                        <Pencil size={16} className="text-white" />
                    </button>
                    <input 
                        type="file" 
                        ref={fileInputRef}
                        onChange={handleImageUpload}
                        accept="image/*"
                        className="hidden"
                    />
                </div>

                <div className="flex-grow">
                    <h1 className="text-2xl font-semibold">{profileData.name}</h1>
                    <p className="text-sm text-blue-200 truncate">{profileData.designation}</p>
                </div>

                <div className="flex items-center space-x-4">
                    <div className="text-center">
                        <p className="text-xs uppercase tracking-wide opacity-80">Profile Score</p>
                        <div className="text-3xl font-bold text-yellow-300">{profileData.vidwanScore}</div>
                    </div>
                    <div className="flex flex-col space-y-2">
                        {/* <button className="px-3 py-1.5 bg-blue-900 hover:bg-blue-700 rounded-md text-sm transition-colors">
                            Download CV
                        </button> */}
                        <button className="px-3 py-1.5 bg-blue-900 hover:bg-blue-700 rounded-md text-sm transition-colors"
                        onClick={handleChangePassword}
                        >
                            Reset Password
                        </button>
                    </div>
                </div>
            </div>
        </header>
    );
}

export default ProfileHeader;