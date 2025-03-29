import React, { useState } from 'react';
import AppraisalForm from './AppraisalForm';
import PastAppraisalHistory from './PastAppraisalHistory';

const Appraisal = () => {
    const [activeTab, setActiveTab] = useState("tab1");
    const tabs = [
        { id: "tab1", label: "Appraisal Form" },
        { id: "tab2", label: "Past Appraisal History" },
    ];

    const tableContent = {
        tab1: <AppraisalForm />,
        tab2: <PastAppraisalHistory />,
    };

    return (
        <div className=" bg-gray-100">
            {/* Tabs Section */}
            <div className="flex justify-center space-x-4 bg-white shadow p-4">
                {tabs.map((tab) => (
                    <button
                        key={tab.id}
                        className={`px-4 py-2 font-semibold rounded-lg transition duration-200 ${
                            activeTab === tab.id
                                ? 'bg-blue-500 text-white shadow-lg'
                                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                        }`}
                        onClick={() => setActiveTab(tab.id)}
                    >
                        {tab.label}
                    </button>
                ))}
            </div>

            {/* Content Section */}
            <div className="p-6">{tableContent[activeTab]}</div>
        </div>
    );
};

export default Appraisal; 
