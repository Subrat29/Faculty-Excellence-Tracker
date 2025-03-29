import React, { useState, useEffect } from 'react';
import {
  Edit2,
  Trash2,
  Plus,
  X,
  Check,
  Calendar,
  Building2,
  UserCircle2,
  Award,
  Link2,
} from 'lucide-react';

import axiosInstance from '../../../services/admin';
import { useSelector } from 'react-redux';
import consoleTerminal from '../../../utils/consoleTerminal';

function ProfessionalBodiesMembershipTab() {
  const facultyId = useSelector((state) => state.auth.user._id);
  const [memberships, setMemberships] = useState([]);
  const [editingMembership, setEditingMembership] = useState(null);
  const [newMembership, setNewMembership] = useState(null);

  // Fetch the memberships from the backend when the component mounts
  useEffect(() => {
    const getMemberships = async () => {
      try {
        const data = await axiosInstance.get(
          `/v1/faculty/professionalMembership/fetch/${facultyId}`
        );
        setMemberships(data.data.data);
      } catch (error) {
        console.error('Error fetching memberships:', error);
      }
    };

    getMemberships();
  }, [facultyId]);

  // Handle edit action
  const handleEdit = (membership) => {
    // Create a deep copy of the membership object to avoid reference issues
    setEditingMembership(JSON.parse(JSON.stringify(membership)));
  };

  // Handle delete action
  const handleDelete = async (id) => {
    try {
      consoleTerminal('id', id);
      // await deleteMembership(id); // Call backend to delete membership
      setMemberships(memberships.filter((membership) => membership._id !== id)); // Remove from state
    } catch (error) {
      console.error('Error deleting membership:', error);
    }
  };

  // Handle saving edited membership
  const handleSaveEdit = async () => {
    if (
      editingMembership &&
      Object.values(editingMembership).every((val) => val !== '')
    ) {
      try {
        consoleTerminal('editingMembership', editingMembership);
        // const updatedMembership = await editMembership(editingMembership); // Call backend to save the edited membership
        setMemberships(
          memberships.map((membership) =>
            membership._id === editingMembership._id
              ? { ...editingMembership } // Create a new object
              : membership
          )
        );
        setEditingMembership(null);
      } catch (error) {
        console.error('Error saving edited membership:', error);
      }
    }
  };

  // Handle adding new membership
  const handleAddNew = () => {
    setNewMembership({
      id: Date.now(),
      mc_member_year: '',
      mc_name: '',
      mc_designation: '',
      mc_region: '',
      mc_url: '',
    });
  };

  // Handle saving new membership
  const handleSaveNew = async () => {
    if (
      newMembership &&
      newMembership.mc_member_year &&
      newMembership.mc_name &&
      newMembership.mc_designation
    ) {
      try {
        consoleTerminal('newMembership', newMembership);
        // const createdMembership = await addMembership(newMembership); // Call backend to save new membership
        setMemberships([...memberships, { ...newMembership }]); // Create a new object
        setNewMembership(null);
      } catch (error) {
        console.error('Error adding new membership:', error);
      }
    } else {
      alert('Please fill in at least year, organization, and membership type');
    }
  };

  const renderInputWithIcon = (icon, color, value, onChange, placeholder) => (
    <div className="flex items-center border rounded">
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

  const renderMembershipContent = (membership, isEditing) => {
    if (isEditing) {
      return (
        <div className="flex-grow grid grid-cols-2 gap-3">
          {renderInputWithIcon(
            <Calendar />,
            'text-blue-600',
            membership.mc_member_year,
            (e) =>
              setEditingMembership({
                ...membership,
                mc_member_year: e.target.value,
              }),
            'Year'
          )}
          {renderInputWithIcon(
            <Building2 />,
            'text-red-600',
            membership.mc_name,
            (e) =>
              setEditingMembership({ ...membership, mc_name: e.target.value }),
            'Organization'
          )}
          {renderInputWithIcon(
            <Award />,
            'text-purple-600',
            membership.mc_designation,
            (e) =>
              setEditingMembership({
                ...membership,
                mc_designation: e.target.value,
              }),
            'Membership Type'
          )}
          {renderInputWithIcon(
            <UserCircle2 />,
            'text-green-600',
            membership.mc_region,
            (e) =>
              setEditingMembership({
                ...membership,
                mc_region: e.target.value,
              }),
            'Region'
          )}
          {renderInputWithIcon(
            <Link2 />,
            'text-indigo-600',
            membership.mc_url,
            (e) =>
              setEditingMembership({
                ...membership,
                mc_url: e.target.value,
              }),
            'URL (if not N/A)'
          )}
        </div>
      );
    }

    return (
      <div className="flex-grow">
        <h3 className="text-xl font-semibold">{membership.mc_name}</h3>
        <div className="flex items-center text-gray-600 mt-1">
          <Award size={16} className="mr-2 text-purple-600" />
          <span>{membership.mc_designation}</span>
        </div>
        {membership.mc_region && (
          <div className="flex items-center text-gray-700 mt-1">
            <UserCircle2 size={16} className="mr-2 text-green-600" />
            <span>Region: {membership.mc_region}</span>
          </div>
        )}
        {membership.mc_url && (
          <div className="flex items-center text-gray-700 mt-1">
            <Link2 size={16} className="mr-2 text-indigo-600" />
            {membership.mc_url !== 'N/A' ? (
              <a
                href={membership.mc_url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-500"
              >
                {membership.mc_url}
              </a>
            ) : (
              <span>{membership.mc_url}</span>
            )}
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="bg-white shadow rounded-lg p-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">
          Membership In Professional Bodies
        </h2>
        <button
          onClick={handleAddNew}
          className="text-green-600 hover:bg-green-100 p-2 rounded-full"
        >
          <Plus />
        </button>
      </div>

      {newMembership && (
        <div className="flex items-center mb-4 pb-4 border-b bg-green-50 p-4 rounded">
          <div className="flex-grow grid grid-cols-2 gap-3">
            {renderInputWithIcon(
              <Calendar />,
              'text-blue-600',
              newMembership.mc_member_year,
              (e) =>
                setNewMembership({
                  ...newMembership,
                  mc_member_year: e.target.value,
                }),
              'Year'
            )}
            {renderInputWithIcon(
              <Building2 />,
              'text-red-600',
              newMembership.mc_name,
              (e) =>
                setNewMembership({ ...newMembership, mc_name: e.target.value }),
              'Organization'
            )}
            {renderInputWithIcon(
              <Award />,
              'text-purple-600',
              newMembership.mc_designation,
              (e) =>
                setNewMembership({
                  ...newMembership,
                  mc_designation: e.target.value,
                }),
              'Membership Type'
            )}
            {renderInputWithIcon(
              <UserCircle2 />,
              'text-green-600',
              newMembership.mc_region,
              (e) =>
                setNewMembership({
                  ...newMembership,
                  mc_region: e.target.value,
                }),
              'Region'
            )}
            {renderInputWithIcon(
              <Link2 />,
              'text-indigo-600',
              newMembership.mc_url,
              (e) =>
                setNewMembership({
                  ...newMembership,
                  mc_url: e.target.value,
                }),
              'URL (if not N/A)'
            )}
          </div>
          <div className="flex ml-4">
            <button
              onClick={handleSaveNew}
              className="text-green-600 hover:bg-green-100 p-2 rounded-full mr-2"
            >
              <Check />
            </button>
            <button
              onClick={() => setNewMembership(null)}
              className="text-red-600 hover:bg-red-100 p-2 rounded-full"
            >
              <X />
            </button>
          </div>
        </div>
      )}

      {memberships.map((membership) => (
        <div
          key={membership._id}
          className="flex items-center mb-4 pb-4 border-b"
        >
          <div className="w-20 mr-4 text-right">
            <div className="flex items-center justify-end">
              <Calendar size={14} className="mr-1 text-blue-600" />
              <p className="text-sm text-gray-500 font-semibold">
                {membership.mc_member_year}
              </p>
            </div>
          </div>

          {editingMembership && editingMembership._id === membership._id ? (
            <>
              {renderMembershipContent(editingMembership, true)}
              <div className="flex ml-4">
                <button
                  onClick={handleSaveEdit}
                  className="text-green-600 hover:bg-green-100 p-2 rounded-full mr-2"
                >
                  <Check />
                </button>
                <button
                  onClick={() => setEditingMembership(null)}
                  className="text-red-600 hover:bg-red-100 p-2 rounded-full"
                >
                  <X />
                </button>
              </div>
            </>
          ) : (
            <>
              {renderMembershipContent(membership, false)}
              <div className="flex ml-4">
                <button
                  onClick={() => handleEdit(membership)}
                  className="text-blue-600 hover:bg-blue-100 p-2 rounded-full mr-2"
                >
                  <Edit2 />
                </button>
                <button
                  onClick={() => handleDelete(membership._id)}
                  className="text-red-600 hover:bg-red-100 p-2 rounded-full"
                >
                  <Trash2 />
                </button>
              </div>
            </>
          )}
        </div>
      ))}
    </div>
  );
}

export default ProfessionalBodiesMembershipTab;
