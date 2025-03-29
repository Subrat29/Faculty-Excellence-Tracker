import React, { useState } from 'react';

const ResearchPublicationsForm = () => {
  // State to store scores for each section and the total score

  return (
    <div className="p-8 bg-gray-200">
      <h4 className="text-xl font-bold mb-8 text-center">
        Contribution to Research & Consultancy
      </h4>

      <form className="bg-white p-8 rounded-lg" onSubmit={handleSubmit}>
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div>
            <label className="block mb-1 font-medium">
              Name of the faculty Member:
            </label>
            <input
              type="text"
              placeholder="Enter the faculty name"
              className="w-full p-2 border rounded-md"
            />
          </div>
          <div>
            <label className="block mb-1 font-medium">Academic Year:</label>
            <input
              type="text"
              placeholder="Enter Academic Year"
              className="w-full p-2 border rounded-md"
            />
          </div>
        </div>

        <table className="table-auto w-full border-collapse border border-gray-300 text-sm">
          <thead>
            <tr className="bg-gray-200">
              <th className="border border-gray-300 p-2">S. No.</th>
              <th className="border border-gray-300 p-2">Activities</th>
              <th className="border border-gray-300 p-2">
                To be filled by faculty
              </th>
              <th className="border border-gray-300 p-2">Max. Marks</th>
            </tr>
          </thead>
          <tbody>
            {/* Section A: Teaching Excellence and Student Engagement */}
            <tr className="bg-gray-100">
              <td colSpan="6" className="border border-gray-300 font-bold p-2">
                A. Teaching Excellence and Student Engagement
              </td>
            </tr>
            {[
              { activity: 'Quality of preparedness for teaching', marks: 25 },
              { activity: 'Effective syllabus coverage', marks: 25 },
              { activity: 'Preparation and use of lab manuals', marks: 10 },
              {
                activity: 'Student guidance and fostering creativity',
                marks: 10,
              },
              {
                activity: 'Development and use of online resources',
                marks: 10,
              },
              { activity: 'Troubleshooting/technical help', marks: 10 },
              { activity: 'Others (subjective)', marks: 10 },
            ].map((item, index) => (
              <tr key={index}>
                <td className="border border-gray-300 p-2">{index + 1}</td>
                <td className="border border-gray-300 p-2">{item.activity}</td>
                <td className="border border-gray-300 p-2">
                  <input
                    type="number"
                    placeholder="Enter score"
                    className="w-full border border-gray-300 rounded p-1"
                    onChange={(e) =>
                      handleScoreChange('A', index, e.target.value)
                    }
                  />
                </td>
                <td className="border border-gray-300 p-2">{item.marks}</td>
              </tr>
            ))}
            <tr>
              <td
                colSpan="3"
                className="border border-gray-300 text-right p-2 font-bold"
              >
                Total Score:
              </td>
              <td className="border border-gray-300 p-2">
                <input
                  type="text"
                  value={scores.A.total}
                  disabled
                  className="w-full border border-gray-300 p-1 rounded bg-gray-100"
                />
              </td>
            </tr>

            {/* Section B: Research Impact and Innovation */}
            <tr className="bg-gray-100">
              <td colSpan="6" className="border border-gray-300 font-bold p-2">
                B. Research Impact and Innovation
              </td>
            </tr>
            {[
              {
                activity:
                  'Publication in referred journals with impact factor ≥ 2',
                marks: 30,
              },
              {
                activity: 'Research project submitted with sanction',
                marks: 20,
              },
              { activity: 'Technology transfer/patents filed', marks: 10 },
              { activity: 'Ph.D. guidance: Ongoing', marks: 15 },
              { activity: 'Ph.D. guidance: Completed', marks: 25 },
            ].map((item, index) => (
              <tr key={index}>
                <td className="border border-gray-300 p-2">{index + 1}</td>
                <td className="border border-gray-300 p-2">{item.activity}</td>
                <td className="border border-gray-300 p-2">
                  <input
                    type="number"
                    placeholder="Enter score"
                    className="w-full border border-gray-300 rounded p-1"
                    onChange={(e) =>
                      handleScoreChange('B', index, e.target.value)
                    }
                  />
                </td>
                <td className="border border-gray-300 p-2">{item.marks}</td>
              </tr>
            ))}
            <tr>
              <td
                colSpan="3"
                className="border border-gray-300 text-right p-2 font-bold"
              >
                Total Score:
              </td>
              <td className="border border-gray-300 p-2">
                <input
                  type="text"
                  value={scores.B.total}
                  disabled
                  className="w-full border border-gray-300 p-1 rounded bg-gray-100"
                />
              </td>
            </tr>

            {/* Section C: Leadership and Administrative Work */}
            <tr className="bg-gray-100">
              <td colSpan="6" className="border border-gray-300 font-bold p-2">
                C. Leadership and Administrative Work
              </td>
            </tr>
            {[
              {
                activity: 'Leadership roles (HOD, Dean, Coordinator)',
                marks: 30,
              },
              {
                activity: 'Organizing departmental or institutional events',
                marks: 25,
              },
              {
                activity:
                  'Policy planning, monitoring, and evaluation activities',
                marks: 15,
              },
              { activity: 'Assistance in the admission process', marks: 10 },
              { activity: 'Development of institutional MIS', marks: 10 },
              {
                activity: 'Organizing staff development activities',
                marks: 10,
              },
            ].map((item, index) => (
              <tr key={index}>
                <td className="border border-gray-300 p-2">{index + 1}</td>
                <td className="border border-gray-300 p-2">{item.activity}</td>
                <td className="border border-gray-300 p-2">
                  <input
                    type="number"
                    placeholder="Enter score"
                    className="w-full border border-gray-300 rounded p-1"
                    onChange={(e) =>
                      handleScoreChange('C', index, e.target.value)
                    }
                  />
                </td>
                <td className="border border-gray-300 p-2">{item.marks}</td>
              </tr>
            ))}
            <tr>
              <td
                colSpan="3"
                className="border border-gray-300 text-right p-2 font-bold"
              >
                Total Score:
              </td>
              <td className="border border-gray-300 p-2">
                <input
                  type="text"
                  value={scores.C.total}
                  disabled
                  className="w-full border border-gray-300 p-1 rounded bg-gray-100"
                />
              </td>
            </tr>

            {/* Section D: Skill Development and Training */}
            <tr className="bg-gray-100">
              <td colSpan="6" className="border border-gray-300 font-bold p-2">
                D. Skill Development and Training
              </td>
            </tr>
            {[
              { activity: 'Participation in FDPs or workshops', marks: 30 },
              { activity: 'Attending conferences', marks: 20 },
              { activity: 'Organizing workshops', marks: 20 },
              { activity: 'Pursuing higher qualifications', marks: 30 },
            ].map((item, index) => (
              <tr key={index}>
                <td className="border border-gray-300 p-2">{index + 1}</td>
                <td className="border border-gray-300 p-2">{item.activity}</td>
                <td className="border border-gray-300 p-2">
                  <input
                    type="number"
                    placeholder="Enter score"
                    className="w-full border border-gray-300 rounded p-1"
                    onChange={(e) =>
                      handleScoreChange('D', index, e.target.value)
                    }
                  />
                </td>
                <td className="border border-gray-300 p-2">{item.marks}</td>
              </tr>
            ))}
            <tr>
              <td
                colSpan="3"
                className="border border-gray-300 text-right p-2 font-bold"
              >
                Total Score:
              </td>
              <td className="border border-gray-300 p-2">
                <input
                  type="text"
                  value={scores.D.total}
                  disabled
                  className="w-full border border-gray-300 p-1 rounded bg-gray-100"
                />
              </td>
            </tr>

            {/* Section E: Community Service and Extra Activities */}
            <tr className="bg-gray-100">
              <td colSpan="6" className="border border-gray-300 font-bold p-2">
                E. Community Service and Extra Activities
              </td>
            </tr>
            {[
              {
                activity: 'Participation in community services (NSS, NCC)',
                marks: 30,
              },
              { activity: 'Providing R&D support to industry', marks: 25 },
              { activity: 'Promotion of entrepreneurship', marks: 25 },
              {
                activity:
                  'Providing technical support in socially relevant areas',
                marks: 20,
              },
            ].map((item, index) => (
              <tr key={index}>
                <td className="border border-gray-300 p-2">{index + 1}</td>
                <td className="border border-gray-300 p-2">{item.activity}</td>
                <td className="border border-gray-300 p-2">
                  <input
                    type="number"
                    placeholder="Enter score"
                    className="w-full border border-gray-300 rounded p-1"
                    onChange={(e) =>
                      handleScoreChange('E', index, e.target.value)
                    }
                  />
                </td>
                <td className="border border-gray-300 p-2">{item.marks}</td>
              </tr>
            ))}
            <tr>
              <td
                colSpan="3"
                className="border border-gray-300 text-right p-2 font-bold"
              >
                Total Score:
              </td>
              <td className="border border-gray-300 p-2">
                <input
                  type="text"
                  value={scores.E.total}
                  disabled
                  className="w-full border border-gray-300 p-1 rounded bg-gray-100"
                />
              </td>
            </tr>

            {/* Submit Button */}
            <tr>
              <td colSpan="6" className="text-center">
                <button
                  type="submit"
                  className="bg-blue-500 text-white p-2 rounded"
                >
                  Submit
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </form>
    </div>
  );
};

export default ResearchPublicationsForm;
