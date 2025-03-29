import React, { useState } from 'react';
import { Edit, Save, X } from 'lucide-react';

function PersonalInformationTab() {
    // Initial personal information with all fields editable
    const [personalInfo, setPersonalInfo] = useState([
        { label: "Full Name", value: "Prof. Subrat Kar", type: "text" },
        { label: "Designation", value: "Professor", type: "text" },
        { label: "Employee Code", value: "34798", type: "text" },
        { label: "Joining Date", value: "12-11-2009", type: "date" },
        { label: "Teaching Experience (yrs)", value: "12", type: "number" },
        { label: "Session", value: "2023-2024", type: "text" },
        { label: "Gender", value: "Male", type: "select", options: ["Male", "Female", "Other"] },
        { label: "Department", value: "Department Of Electrical Engineering", type: "text" },
        { label: "College", value: "Indian Institute Of Technology Delhi, Hauz Khas, New Delhi -110016", type: "text" },
        { label: "Date of Birth", value: "15 April 1965", type: "date" },
        { label: "Nationality", value: "Indian", type: "text" },
        { label: "Email", value: "subratkar@iitd.ac.in", type: "email" },
        { label: "Contact Number", value: "+91-11-XXXXXXXX", type: "tel" },
        { label: "Address", value: "New Delhi, Delhi, India - 110016", type: "text" },
        { label: "Website", value: "http://web.iitd.ac.in/~subrat", type: "url" },
    ]);

    // State to manage edit mode
    const [isEditing, setIsEditing] = useState(false);

    // Temporary state to hold edited values
    const [editedInfo, setEditedInfo] = useState([...personalInfo]);

    // Toggle edit mode
    const handleEditToggle = () => {
        setIsEditing(!isEditing);
        // Reset edited info when cancelling
        if (isEditing) {
            setEditedInfo([...personalInfo]);
        }
    };

    // Handle input change during edit
    const handleInputChange = (index, newValue) => {
        const updatedInfo = [...editedInfo];
        updatedInfo[index] = { ...updatedInfo[index], value: newValue };
        setEditedInfo(updatedInfo);
    };

    // Save edited information
    const handleSave = () => {
        setPersonalInfo([...editedInfo]);
        setIsEditing(false);
    };

    // Render input based on type
    const renderInput = (info, index) => {
        switch(info.type) {
            case 'select':
                return (
                    <select 
                        value={info.value}
                        onChange={(e) => handleInputChange(index, e.target.value)}
                        className="w-full border rounded px-2 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-blue-300"
                    >
                        {info.options.map((option) => (
                            <option key={option} value={option}>{option}</option>
                        ))}
                    </select>
                );
            default:
                return (
                    <input 
                        type={info.type}
                        value={info.value}
                        onChange={(e) => handleInputChange(index, e.target.value)}
                        className="w-full border rounded px-2 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-blue-300"
                    />
                );
        }
    };

    return (
        <div className="w-full px-4 py-8">
            <div className="bg-white shadow-lg rounded-lg overflow-hidden">
                <div className="flex justify-between items-center bg-gray-100 p-4">
                    <h2 className="text-2xl font-bold text-gray-800">Personal Details</h2>
                    <div className="flex items-center space-x-2">
                        {!isEditing ? (
                            <button 
                                onClick={handleEditToggle}
                                className="text-blue-600 hover:bg-blue-100 p-2 rounded-full transition duration-300"
                            >
                                <Edit size={24} />
                            </button>
                        ) : (
                            <div className="flex space-x-2">
                                <button 
                                    onClick={handleSave}
                                    className="text-green-600 hover:bg-green-100 p-2 rounded-full transition duration-300"
                                >
                                    <Save size={24} />
                                </button>
                                <button 
                                    onClick={handleEditToggle}
                                    className="text-red-600 hover:bg-red-100 p-2 rounded-full transition duration-300"
                                >
                                    <X size={24} />
                                </button>
                            </div>
                        )}
                    </div>
                </div>
                
                <div className="p-6">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        {editedInfo.map((info, index) => (
                            <div key={index} className="border-b pb-3">
                                <span className="text-gray-600 block text-sm mb-1">{info.label}</span>
                                {isEditing ? (
                                    renderInput(info, index)
                                ) : (
                                    <span className="font-semibold text-gray-800">{info.value}</span>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default PersonalInformationTab;