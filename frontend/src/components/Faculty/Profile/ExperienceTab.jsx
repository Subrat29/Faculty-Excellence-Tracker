import React, { useState, useEffect } from 'react';
import {
  Edit,
  Save,
  X,
  Plus,
  Trash2,
  CheckCircle2,
  Building2,
  Pencil,
  Briefcase,
  Building,
  Calendar,
  Award,
  ChevronRight,
} from 'lucide-react';
import axios from 'axios'; // Assuming you're using axios for API calls
import { useSelector } from 'react-redux';
import axiosInstance from '../../../services/admin';
import consoleTerminal from '../../../utils/consoleTerminal';

function ExperienceTab() {
  const faculty_id = useSelector((state) => state.auth.user._id);

  const [experiences, setExperiences] = useState([]);
  const [editedRecordIndex, setEditedRecordIndex] = useState(null);
  const [editedExperience, setEditedExperience] = useState({});
  const [addingNew, setAddingNew] = useState(false);

  // Fetch experiences data from backend when component mounts
  useEffect(() => {
    const fetchExperiences = async () => {
      try {
        const response = await axiosInstance.get(
          `/v1/faculty/experience/fetch/${faculty_id}`
        );
        setExperiences(response.data.data || []);
      } catch (error) {
        console.error('Error fetching experiences:', error);
      }
    };

    fetchExperiences();
  }, []); // Run only once when the component mounts

  const handleEditToggle = (index) => {
    if (editedRecordIndex === index) {
      setEditedRecordIndex(null);
    } else {
      setEditedRecordIndex(index);
      setEditedExperience({ ...experiences[index] });
    }
  };

  const handleInputChange = (field, value) => {
    const updatedExperience = { ...editedExperience };
    updatedExperience[field] = value;

    if (field === 'currentlyWorking') {
      updatedExperience.endDate = value ? 'Present' : '';
    }

    setEditedExperience(updatedExperience);
  };

  const handleSave = async (index) => {
    try {
      const updatedExperiences = [...experiences];
      updatedExperiences[index] = { ...editedExperience };
      setExperiences(updatedExperiences);
      setEditedRecordIndex(null);

      // Call the API to save the updated experience
      await axiosInstance.put(`/v1/faculty/experience/add`, editedExperience);
      console.log('Experience updated successfully');
    } catch (error) {
      console.error('Error saving experience:', error);
    }
  };

  const handleAddExperience = () => {
    setAddingNew(true);
    setEditedExperience({
      roleTitle: '',
      organizationName: '',
      departmentName: '',
      startDate: '',
      endDate: '',
      currentlyWorking: false,
    });
  };

  const handleSaveNew = async () => {
    try {
      // Call the API to save the new experience
      const response = await axiosInstance.post(
        '/v1/faculty/experience/add',
        editedExperience
      );
      setExperiences([...experiences, response.data.data]);
      setAddingNew(false);
      setEditedExperience({});
      console.log('New experience added');
    } catch (error) {
      console.error('Error adding experience:', error);
    }
  };

  const handleCancel = () => {
    setEditedRecordIndex(null);
    setAddingNew(false);
    setEditedExperience({});
  };

  const handleRemoveExperience = async (index) => {
    try {
      //   await axios.delete(
      //     `/api/experiences/${experiences[index].organizationId}`
      //   );
      //   const updatedExperiences = experiences.filter((_, i) => i !== index);
      //   setExperiences(updatedExperiences);
      console.log('Experience removed');
    } catch (error) {
      console.error('Error removing experience:', error);
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return '';

    // If the date is 'Present', show the current date
    if (dateString === 'Present') {
      return new Date().toLocaleDateString('en-US', {
        month: 'short',
        day: '2-digit',
        year: 'numeric',
      });
    }

    // If only year is provided, append '01-01' to make it a full date
    if (dateString.length === 4) {
      dateString = `${dateString}-01-01`;
    }

    // Format the date to 'Month Day, Year'
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: '2-digit',
      year: 'numeric',
    });
  };
  consoleTerminal(experiences);

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="bg-white shadow-lg rounded-lg overflow-hidden">
        <div className="flex justify-between items-center bg-gray-100 p-4">
          <h2 className="text-2xl font-bold text-gray-800 flex items-center">
            <Award className="mr-3 text-blue-600" size={28} />
            Professional Experience
          </h2>
          <button
            onClick={handleAddExperience}
            className="text-green-600 hover:bg-green-100 p-2 rounded-full transition duration-300"
          >
            <Plus size={24} />
          </button>
        </div>

        <div className="p-6">
          {experiences.length === 0 && !addingNew && (
            <p className="text-center text-gray-600">Add Experience</p>
          )}
          {experiences.map((exp, index) => (
            <div key={index} className="mb-6 pb-6 border-b">
              {editedRecordIndex === index ? (
                <div className="flex flex-wrap gap-4">
                  {/* Experience edit fields */}
                  <div className="flex items-center gap-2 w-full md:w-1/2">
                    <Briefcase size={20} className="text-gray-500" />
                    <input
                      type="text"
                      value={editedExperience.roleTitle}
                      onChange={(e) =>
                        handleInputChange('roleTitle', e.target.value)
                      }
                      className="w-full border rounded px-2 py-1"
                      placeholder="Role Title"
                    />
                  </div>
                  <div className="flex items-center gap-2 w-full md:w-1/2">
                    <Building size={20} className="text-gray-500" />
                    <input
                      type="text"
                      value={editedExperience.organizationName}
                      onChange={(e) =>
                        handleInputChange('organizationName', e.target.value)
                      }
                      className="w-full border rounded px-2 py-1"
                      placeholder="Organization Name"
                    />
                  </div>
                  <div className="flex items-center gap-2 w-full md:w-1/2">
                    <ChevronRight size={20} className="text-gray-500" />
                    <input
                      type="text"
                      value={editedExperience.departmentName}
                      onChange={(e) =>
                        handleInputChange('departmentName', e.target.value)
                      }
                      className="w-full border rounded px-2 py-1"
                      placeholder="Department"
                    />
                  </div>
                  <div className="flex items-center gap-2 w-full md:w-1/2">
                    <Calendar size={20} className="text-gray-500" />
                    <input
                      type="date"
                      value={formatDate(editedExperience.startDate)}
                      onChange={(e) =>
                        handleInputChange('startDate', e.target.value)
                      }
                      className="w-full border rounded px-2 py-1"
                    />
                  </div>
                  <div className="flex items-center gap-2 w-full md:w-1/2">
                    <Calendar size={20} className="text-gray-500" />
                    <input
                      type="date"
                      value={
                        editedExperience.currentlyWorking
                          ? ''
                          : formatDate(editedExperience.endDate)
                      }
                      onChange={(e) =>
                        handleInputChange('endDate', e.target.value)
                      }
                      disabled={editedExperience.currentlyWorking}
                      className={`w-full border rounded px-2 py-1 ${
                        editedExperience.currentlyWorking
                          ? 'bg-gray-100 text-gray-500'
                          : ''
                      }`}
                    />
                  </div>
                  <div className="flex items-center gap-2 w-full md:w-1/2">
                    <input
                      type="checkbox"
                      checked={editedExperience.currentlyWorking}
                      onChange={(e) =>
                        handleInputChange('currentlyWorking', e.target.checked)
                      }
                      className="mr-2"
                    />
                    <label className="text-sm text-gray-600">
                      Currently Working
                    </label>
                  </div>
                  <div className="flex gap-4 mt-4">
                    <button
                      onClick={() => handleSave(index)}
                      className="text-blue-600 hover:bg-blue-100 p-2 rounded transition duration-300"
                    >
                      <Save size={20} />
                    </button>
                    <button
                      onClick={handleCancel}
                      className="text-red-600 hover:bg-red-100 p-2 rounded transition duration-300"
                    >
                      <X size={20} />
                    </button>
                  </div>
                </div>
              ) : (
                <div className="flex bg-white shadow-sm rounded-lg p-4 mb-4 border border-gray-100 hover:shadow-md transition-shadow duration-300">
                  {/* Display experience */}
                  <div className="w-1/4 pr-4 border-r border-gray-200 flex flex-col items-end">
                    <div className="flex items-center text-gray-600 mb-2">
                      <Calendar size={16} className="mr-2 text-gray-500" />
                      <span className="font-medium">{exp.startDate}</span>
                    </div>
                    <div className="flex items-center text-gray-600">
                      <Calendar size={16} className="mr-2 text-gray-500" />
                      <span className="font-medium">
                        {exp.currentlyWorking ? 'Present' : exp.endDate}
                      </span>
                    </div>
                  </div>
                  <div className="flex-1 px-4">
                    <div className="flex items-center mb-1">
                      <Briefcase size={16} className="mr-2 text-blue-500" />
                      <h3 className="text-lg font-bold text-gray-800">
                        {exp.roleTitle}
                      </h3>
                    </div>
                    <div className="flex items-center mb-1">
                      <Building2 size={16} className="mr-2 text-green-500" />
                      <p className="text-gray-700">{exp.organizationName}</p>
                    </div>
                    <p className="text-sm text-gray-500">
                      {exp.departmentName}
                    </p>
                  </div>
                  <div className="ml-4 flex items-center gap-2">
                    <button
                      onClick={() => handleEditToggle(index)}
                      className="text-blue-600 hover:bg-blue-100 p-2 rounded-full transition duration-300"
                    >
                      <Pencil size={18} />
                    </button>
                    <button
                      onClick={() => handleRemoveExperience(index)}
                      className="text-red-600 hover:bg-red-100 p-2 rounded-full transition duration-300"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                </div>
              )}
            </div>
          ))}
          {addingNew && (
            <div className="mb-6 pb-6">
              {/* New Experience */}
              <div className="flex flex-wrap gap-4">
                <div className="flex items-center gap-2 w-full md:w-1/2">
                  <Briefcase size={20} className="text-gray-500" />
                  <input
                    type="text"
                    value={editedExperience.roleTitle}
                    onChange={(e) =>
                      handleInputChange('roleTitle', e.target.value)
                    }
                    className="w-full border rounded px-2 py-1"
                    placeholder="Role Title"
                  />
                </div>
                <div className="flex items-center gap-2 w-full md:w-1/2">
                  <Building size={20} className="text-gray-500" />
                  <input
                    type="text"
                    value={editedExperience.organizationName}
                    onChange={(e) =>
                      handleInputChange('organizationName', e.target.value)
                    }
                    className="w-full border rounded px-2 py-1"
                    placeholder="Organization Name"
                  />
                </div>
                <div className="flex items-center gap-2 w-full md:w-1/2">
                  <ChevronRight size={20} className="text-gray-500" />
                  <input
                    type="text"
                    value={editedExperience.departmentName}
                    onChange={(e) =>
                      handleInputChange('departmentName', e.target.value)
                    }
                    className="w-full border rounded px-2 py-1"
                    placeholder="Department"
                  />
                </div>
                <div className="flex items-center gap-2 w-full md:w-1/2">
                  <Calendar size={20} className="text-gray-500" />
                  <input
                    type="date"
                    value={editedExperience.startDate}
                    onChange={(e) =>
                      handleInputChange('startDate', e.target.value)
                    }
                    className="w-full border rounded px-2 py-1"
                  />
                </div>
                <div className="flex items-center gap-2 w-full md:w-1/2">
                  <Calendar size={20} className="text-gray-500" />
                  <input
                    type="date"
                    value={
                      editedExperience.currentlyWorking
                        ? ''
                        : editedExperience.endDate
                    }
                    onChange={(e) =>
                      handleInputChange('endDate', e.target.value)
                    }
                    disabled={editedExperience.currentlyWorking}
                    className={`w-full border rounded px-2 py-1 ${
                      editedExperience.currentlyWorking
                        ? 'bg-gray-100 text-gray-500'
                        : ''
                    }`}
                  />
                </div>
                <div className="flex items-center gap-2 w-full md:w-1/2">
                  <input
                    type="checkbox"
                    checked={editedExperience.currentlyWorking}
                    onChange={(e) =>
                      handleInputChange('currentlyWorking', e.target.checked)
                    }
                    className="mr-2"
                  />
                  <label className="text-sm text-gray-600">
                    Currently Working
                  </label>
                </div>
                <div className="flex gap-4 mt-4">
                  <button
                    onClick={handleSaveNew}
                    className="text-blue-600 hover:bg-blue-100 p-2 rounded transition duration-300"
                  >
                    <Save size={20} />
                  </button>
                  <button
                    onClick={handleCancel}
                    className="text-red-600 hover:bg-red-100 p-2 rounded transition duration-300"
                  >
                    <X size={20} />
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default ExperienceTab;
