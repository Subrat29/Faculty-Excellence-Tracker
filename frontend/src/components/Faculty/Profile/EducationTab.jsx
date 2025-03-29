import React, { useEffect, useState } from 'react';
import {
  GraduationCap,
  BookOpen,
  Building2,
  Calendar,
  Plus,
  Pencil,
  Trash2,
  X,
  Save,
  Link,
  Key,
  Home,
  MapPin,
  TrendingUp,
} from 'lucide-react'; // Added necessary icons
import axiosInstance from '../../../services/admin';
import consoleTerminal from '../../../utils/consoleTerminal';
import { useSelector } from 'react-redux';

function EducationTab() {
  const facultyId = useSelector((state) => state.auth.user._id);

  const [educations, setEducations] = useState([]); // Fetch this from the backend initially

  const [editingId, setEditingId] = useState(null);
  const [newEntry, setNewEntry] = useState(null);

  const fetchQualifications = async () => {
    try {
      const response = await axiosInstance.get(
        `/v1/faculty/qualifications/fetch/${facultyId}`
      );
      if (response.status === 200) {
        consoleTerminal(
          'Qualifications data fetched successfully',
          response.data.data
        );
        setEducations(response.data.data);
      }
    } catch (error) {
      consoleTerminal('Error fetching qualifications data', error);
    }
  };

  useEffect(() => {
    if (facultyId) {
      fetchQualifications();
    }
  }, [facultyId]);

  const handleEdit = (index) => {
    setEditingId(index);
    setNewEntry(null);
  };

  const handleDelete = (index) => {
    const updatedEducations = educations.filter((_, i) => i !== index);
    setEducations(updatedEducations);
  };

  const handleAddNew = () => {
    setNewEntry({
      degree: '',
      institution: '',
      subject: '',
      passing_year: '',
      percentage: '',
      document_url: '',
      start_year: '',
      institute_id: '',
      institution_address: '',
    });
    setEditingId(null);
  };

  const handleCancel = () => {
    setEditingId(null);
    setNewEntry(null);
  };

  const handleSave = () => {
    if (newEntry) {
      setEducations([...educations, newEntry]);
      setNewEntry(null);
    } else if (editingId !== null) {
      const updatedEducations = educations.map((edu, index) =>
        index === editingId ? { ...edu, ...editedEducation } : edu
      );
      setEducations(updatedEducations);
      setEditingId(null);
    }
  };

  const [editedEducation, setEditedEducation] = useState({});

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (newEntry) {
      setNewEntry((prev) => ({ ...prev, [name]: value }));
    } else {
      setEditedEducation((prev) => ({ ...prev, [name]: value }));
    }
  };

  const renderInputWithIcon = (icon, color, value, onChange, placeholder) => (
    <div className="flex items-center border rounded w-full p-1 ">
      <span className={`pl-2 ${color}`}>
        {React.cloneElement(icon, { size: 18 })}
      </span>
      <input
        className="p-1 pl-2 w-full rounded outline-none"
        value={value}
        onChange={onChange}
        placeholder={placeholder}
      />
    </div>
  );

  return (
    <div className="bg-white shadow rounded-lg p-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">Education Qualifications</h2>
        <button
          onClick={handleAddNew}
          className="text-green-500 hover:text-green-700"
        >
          <Plus className="h-6 w-6" />
        </button>
      </div>
      <div className="space-y-4">
        {[...educations, newEntry].filter(Boolean).map((edu, index) => (
          <div
            key={index}
            className="flex items-center border rounded-lg p-4 relative group hover:shadow-md transition-shadow"
          >
            {/* Year Column */}
            <div className="w-24 mr-4 text-right flex items-center justify-end">
              <Calendar className="mr-2 text-gray-500" size={20} />
              {editingId === index ||
              (newEntry && index === educations.length) ? (
                <input
                  type="text"
                  name="passing_year"
                  placeholder="Year"
                  value={
                    newEntry
                      ? newEntry.passing_year
                      : editedEducation.passing_year || edu.passing_year
                  }
                  onChange={handleInputChange}
                  className="w-full text-right rounded-md border-gray-300"
                />
              ) : (
                <span className="font-semibold text-gray-600">
                  {edu.passing_year}
                </span>
              )}
            </div>

            {/* Vertical Separator */}
            <div className="w-px h-full bg-gray-300 mx-4"></div>

            {/* Details Column */}
            <div className="flex-grow">
              {editingId === index ||
              (newEntry && index === educations.length) ? (
                <div className="flex-grow grid grid-cols-2 gap-3">
                  {/* Degree Field */}
                  {renderInputWithIcon(
                    <GraduationCap />,
                    'text-blue-500',
                    newEntry
                      ? newEntry.degree
                      : editedEducation.degree || edu.degree,
                    handleInputChange,
                    'Degree'
                  )}

                  {/* Subject Field */}
                  {renderInputWithIcon(
                    <BookOpen />,
                    'text-green-500',
                    newEntry
                      ? newEntry.subject
                      : editedEducation.subject || edu.subject,
                    handleInputChange,
                    'Subject'
                  )}

                  {/* Institution Field */}
                  {renderInputWithIcon(
                    <Building2 />,
                    'text-red-500',
                    newEntry
                      ? newEntry.institution
                      : editedEducation.institution || edu.institution,
                    handleInputChange,
                    'Institution'
                  )}

                  {/* Percentage Field */}
                  {renderInputWithIcon(
                    <TrendingUp />,
                    'text-blue-500',
                    newEntry
                      ? newEntry.percentage
                      : editedEducation.percentage || edu.percentage,
                    handleInputChange,
                    'Percentage'
                  )}

                  {/* Document URL Field */}
                  {renderInputWithIcon(
                    <Link />,
                    'text-blue-500',
                    newEntry
                      ? newEntry.document_url
                      : editedEducation.document_url || edu.document_url,
                    handleInputChange,
                    'Document URL'
                  )}

                  {/* Start Year Field */}
                  {renderInputWithIcon(
                    <Calendar />,
                    'text-purple-500',
                    newEntry
                      ? newEntry.start_year
                      : editedEducation.start_year || edu.start_year,
                    handleInputChange,
                    'Start Year'
                  )}

                  {/* Institute ID Field */}
                  {renderInputWithIcon(
                    <Key />,
                    'text-gray-500',
                    newEntry
                      ? newEntry.institute_id
                      : editedEducation.institute_id || edu.institute_id,
                    handleInputChange,
                    'Institute ID'
                  )}

                  {/* Institution Address Field */}
                  {renderInputWithIcon(
                    <Home />,
                    'text-gray-500',
                    newEntry
                      ? newEntry.institution_address
                      : editedEducation.institution_address ||
                          edu.institution_address,
                    handleInputChange,
                    'Institution Address'
                  )}
                </div>
              ) : (
                <div className="flex items-center space-x-4">
                  <GraduationCap className="text-blue-500" size={20} />
                  <div>
                    <h3 className="text-xl font-semibold">{edu.degree}</h3>
                    <p className="text-gray-600 flex items-center">
                      <BookOpen className="mr-2 text-green-500" size={16} />
                      {edu.subject}
                    </p>
                    <p className="text-sm text-gray-500 flex items-center">
                      <Building2 className="mr-2 text-red-500" size={16} />
                      {edu.institution_address
                        ? `${edu.institution_address} - ${edu.institution}`
                        : edu.institution}
                    </p>
                    <p className="text-gray-600 flex items-center">
                      <MapPin className="mr-2 text-yellow-500" size={20} />
                      {edu.institution_address}
                    </p>
                    <p className="text-gray-600 flex items-center">
                      <Calendar className="mr-2 text-purple-500" size={20} />
                      Start Year: {edu.start_year}
                    </p>
                    {edu.percentage && (
                      <p className="text-gray-600 flex items-center">
                        <span className="mr-2 text-indigo-500">%</span>
                        Percentage: {edu.percentage}
                      </p>
                    )}
                    {edu.document_url && (
                      <a
                        href={edu.document_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-500"
                      >
                        View Document
                      </a>
                    )}
                  </div>
                </div>
              )}
            </div>

            {/* Action Buttons */}
            {editingId === index ||
            (newEntry && index === educations.length) ? (
              <div className="flex space-x-2 ml-4">
                <button
                  onClick={handleCancel}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <X className="h-5 w-5" />
                </button>
                <button
                  onClick={handleSave}
                  className="text-green-500 hover:text-green-700"
                >
                  <Save className="h-5 w-5" />
                </button>
              </div>
            ) : (
              <div className="absolute top-2 right-2 flex space-x-2 opacity-0 group-hover:opacity-100 transition-opacity">
                <button
                  onClick={() => handleEdit(index)}
                  className="text-blue-500 hover:text-blue-700"
                >
                  <Pencil className="h-4 w-4" />
                </button>
                <button
                  onClick={() => handleDelete(index)}
                  className="text-red-500 hover:text-red-700"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default EducationTab;
