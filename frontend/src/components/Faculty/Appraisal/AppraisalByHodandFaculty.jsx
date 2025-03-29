import { useState } from 'react';

const AppraisalForm = () => {
  const [sectionA, setSectionA] = useState({
    scores: {
      teachingExcellence: '',
      researchImpact: '',
      leadershipWork: '',
      skillDevelopment: '',
      communityService: '',
    },
    total: 0,
  });

  const [sectionB, setSectionB] = useState({
    scores: {
      capacityToLead: '',
      amenability: '',
      perseverance: '',
      interpersonalRelations: '',
      integrity: '',
    },
    total: 0,
  });

  // Calculate total score for Section A
  const calculateTotalA = () => {
    const total = Object.values(sectionA.scores).reduce((sum, score) => {
      const parsedScore = parseInt(score) || 0; // Parse the score or set to 0 if not a number
      return sum + parsedScore;
    }, 0);
    setSectionA((prev) => ({ ...prev, total }));
  };

  // Calculate total score for Section B
  const calculateTotalB = () => {
    const total = Object.values(sectionB.scores).reduce((sum, score) => {
      const parsedScore = parseInt(score) || 0; // Parse the score or set to 0 if not a number
      return sum + parsedScore;
    }, 0);
    setSectionB((prev) => ({ ...prev, total }));
  };

  // Handle input change for Section A
  const handleInputChangeA = (e, param) => {
    const value = e.target.value;
    setSectionA((prev) => {
      const updatedScores = { ...prev.scores, [param]: value };
      return { ...prev, scores: updatedScores };
    });
    calculateTotalA();
  };

  // Handle input change for Section B
  const handleInputChangeB = (e, param) => {
    const value = e.target.value;
    setSectionB((prev) => {
      const updatedScores = { ...prev.scores, [param]: value };
      return { ...prev, scores: updatedScores };
    });
    calculateTotalB();
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Parse scores for submission
    const sectionData = [
      {
        heading: 'A. Performance Assessment',
        totalScore: sectionA.total,
      },
      {
        heading: 'B. Personal Attributes',
        totalScore: sectionB.total,
      },
      {
        heading: 'Appraisal By HOD & Director',
        totalScore: sectionA.total + sectionB.total,
      },
    ];

    try {
      const response = await fetch('YOUR_API_ENDPOINT', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(sectionData),
      });

      if (response.ok) {
        alert('Data submitted successfully!');
      } else {
        alert('Failed to submit data');
      }
    } catch (error) {
      console.error('Error during submission:', error);
    }
  };

  return (
    <div className="p-8 bg-gray-200">
      <h4 className="text-xl font-bold mb-6 text-center">
        APPRAISAL BY HOD & Director
      </h4>
      <div className="bg-white p-6 rounded shadow-md">
        <form className="space-y-6" onSubmit={handleSubmit}>
          {/* Academic Year and Faculty Details */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block mb-1 font-medium">Academic Year:</label>
              <input
                type="text"
                className="w-full px-4 py-2 border rounded-md"
                placeholder="Enter academic year"
              />
            </div>
            <div>
              <label className="block mb-1 font-medium">
                Name of the Faculty Member:
              </label>
              <input
                type="text"
                className="w-full px-4 py-2 border rounded-md"
                placeholder="Enter name"
              />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block mb-1 font-medium">Designation:</label>
              <input
                type="text"
                className="w-full px-4 py-2 border rounded-md"
                placeholder="Enter designation"
              />
            </div>
            <div>
              <label className="block mb-1 font-medium">Department:</label>
              <input
                type="text"
                className="w-full px-4 py-2 border rounded-md"
                placeholder="Enter department"
              />
            </div>
          </div>
          <div>
            <label className="block mb-1 font-medium">
              Date of Joining the Present Post:
            </label>
            <input type="date" className="w-full px-4 py-2 border rounded-md" />
          </div>

          {/* Evaluation Parameters */}
          {/* Section A: Performance Assessment */}
          <div>
            <h2 className="text-lg font-semibold">A. Performance Assessment</h2>
            <table className="w-full border-collapse border border-gray-400 mt-4">
              <thead>
                <tr className="bg-gray-200">
                  <th className="border border-gray-400 px-4 py-2">S. No.</th>
                  <th className="border border-gray-400 px-4 py-2">
                    Evaluation Parameter
                  </th>
                  <th className="border border-gray-400 px-4 py-2">
                    Filled By HOD
                  </th>
                  <th className="border border-gray-400 px-4 py-2">
                    Maximum Marks
                  </th>
                </tr>
              </thead>
              <tbody>
                {[
                  {
                    param: 'Teaching Excellence and Engagement',
                    weight: 10,
                    key: 'teachingExcellence',
                  },
                  {
                    param: 'Research Impact and Innovation',
                    weight: 20,
                    key: 'researchImpact',
                  },
                  {
                    param: 'Leadership and Administrative Work',
                    weight: 20,
                    key: 'leadershipWork',
                  },
                  {
                    param: 'Skill Development and Training',
                    weight: 20,
                    key: 'skillDevelopment',
                  },
                  {
                    param: 'Community Services and Activities',
                    weight: 20,
                    key: 'communityService',
                  },
                ].map(({ param, weight, key }, index) => (
                  <tr key={index}>
                    <td className="border border-gray-400 px-4 py-2 text-center">
                      {index + 1}
                    </td>
                    <td className="border border-gray-400 px-4 py-2">
                      {param}
                    </td>
                    <td className="border border-gray-400 px-4 py-2">
                      <input
                        type="number"
                        className="w-full px-2 py-1 border rounded-md"
                        placeholder="Enter score"
                        value={sectionA.scores[key]}
                        onChange={(e) => handleInputChangeA(e, key)}
                      />
                    </td>
                    <td className="border border-gray-400 px-4 py-2 text-center">
                      {weight}
                    </td>
                  </tr>
                ))}
                <tr>
                  <td colSpan={2}></td>
                  <td className="border text-center">Total out of 90</td>
                  <td className="border p-3">{sectionA.total}</td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* Section B: Personal Attributes */}
          <div>
            <h2 className="text-lg font-semibold">B. Personal Attributes</h2>
            <table className="w-full border-collapse border border-gray-400 mt-4">
              <thead>
                <tr className="bg-gray-200">
                  <th className="border border-gray-400 px-4 py-2">S. No.</th>
                  <th className="border border-gray-400 px-4 py-2">
                    Attributes
                  </th>
                  <th className="border border-gray-400 px-4 py-2">
                    Appraisal on 5 point scale
                  </th>
                  <th className="border border-gray-400 px-4 py-2">
                    Maximum Marks
                  </th>
                </tr>
              </thead>
              <tbody>
                {[
                  {
                    param: 'Capacity to Lead',
                    weight: 1,
                    key: 'capacityToLead',
                  },
                  {
                    param: 'Amenability to discipline',
                    weight: 2,
                    key: 'amenability',
                  },
                  {
                    param: 'Preserverence',
                    weight: 2,
                    key: 'perseverance',
                  },
                  {
                    param: 'Interpersonal Relations',
                    weight: 2,
                    key: 'interpersonalRelations',
                  },
                  {
                    param: 'Integrity',
                    weight: 3,
                    key: 'integrity',
                  },
                ].map(({ param, weight, key }, index) => (
                  <tr key={index}>
                    <td className="border border-gray-400 px-4 py-2 text-center">
                      {index + 1}
                    </td>
                    <td className="border border-gray-400 px-4 py-2">
                      {param}
                    </td>
                    <td className="border border-gray-400 px-4 py-2">
                      <input
                        type="number"
                        className="w-full px-2 py-1 border rounded-md"
                        placeholder="Enter score"
                        value={sectionB.scores[key]}
                        onChange={(e) => handleInputChangeB(e, key)}
                      />
                    </td>
                    <td className="border border-gray-400 px-4 py-2 text-center">
                      {weight}
                    </td>
                  </tr>
                ))}
                <tr>
                  <td colSpan={2}></td>
                  <td className="border text-center">Total out of 10</td>
                  <td className="border p-3">{sectionB.total}</td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* Submit Button */}
          <div className="flex justify-end">
            <button
              type="submit"
              className="px-6 py-2 bg-blue-600 text-white font-bold rounded-md hover:bg-blue-700"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AppraisalForm;
