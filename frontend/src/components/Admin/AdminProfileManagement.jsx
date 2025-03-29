import React, { useState } from 'react';
import AdminProfile from './AdminProfile';
import AddSession from './AddSession';
import AddUniversity from './AddUniversity';
import AddCollege from './AddCollege';
import AddDepartment from './AddDepartment';

const AdminProfileManagement = () => {

  const [activeTab, setActiveTab] = useState('tab1');
  const role = localStorage.getItem("roleType"); 
  const roleType = role ? role.trim().toLowerCase() : ""; 

  const tabs = [{ id: 'tab1', label: 'Profile' }];

    if (roleType === "university admin") {
    // University admin can access all tabs
       tabs.push(
      { id: 'tab2', label: 'Add Session' },
      { id: 'tab3', label: 'Add University' },
      { id: 'tab4', label: 'Add College' },
      { id: 'tab5', label: 'Add Department' }
      );
    } else if (roleType === "department admin") {
     tabs.push(
      // { id: 'tab5', label: 'Add Department' }
    );
    } else if (roleType === "college admin") {
    // College admin can access Add Department only
    tabs.push({ id: 'tab5', label: 'Add Department' });
   }

  const tabContent = {
    tab1: <AdminProfile/>,
    tab2: <AddSession/>,
    tab3: <AddUniversity/>,
    tab4: <AddCollege/>,
    tab5: <AddDepartment/>,
  };

  return (
    <div>
        <div className="max-w-4xl mx-auto mt-12 lg:mt-3 bg-blue-300   sm:p-4 rounded-lg shadow-lg">
      {/* Tabs */}
      <div
        className="grid gap-2 lg:justify-center sm:flex sm:items-center sm:space-x-4 bg-white rounded-t-lg p-2"
      >
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`relative px-4 sm:px-6 py-2 sm:py-3 text-xs sm:text-sm font-medium rounded-md lg:rounded-none focus:outline-none ${
              activeTab === tab.id
                ? 'bg-white text-blue-600 border-b-2 border-blue-600'
                : 'bg-gray-100 text-gray-500 hover:bg-gray-200'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Content */}
      <div className="bg-white p-2 sm:p-6 rounded-b-lg border border-gray-300">
        {tabContent[activeTab]}
      </div>
    </div>
    </div>
  );
};

export default AdminProfileManagement;