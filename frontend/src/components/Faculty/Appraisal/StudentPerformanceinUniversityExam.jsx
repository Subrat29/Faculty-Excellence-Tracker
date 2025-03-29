import React, { useState } from 'react';

const BenchmarkForm = () => {
  // Initial data structure to hold dynamic subjects
  const [data, setData] = useState({
    facultyName: '',
    academicYear: '',
    subjects: [
      { name: 'Subject 1', presentData: '', rawScore: '', weightedScore: '' },
    ],
  });

  const weight = 0.4; // Weight for each row

  // Benchmarking logic to determine raw score based on the difference
  const getRawScore = (presentData, benchmark) => {
    const diff = presentData - benchmark;

    if (diff > 5) return 5;
    if (diff > 4.5) return 5;
    if (diff > 4) return 5;
    if (diff > 3) return 4;
    if (diff > 1) return 4;
    if (diff > 0) return 3;
    return 3;
  };

  // Handle input change for a specific subject
  const handleChange = (index, field, value) => {
    const newSubjects = [...data.subjects];
    newSubjects[index][field] = value;

    // Recalculate raw score and weighted score if presentData is changed
    if (field === 'presentData') {
      const benchmark = 40; // Default benchmark value
      const rawScore = getRawScore(Number(value), benchmark);
      const weightedScore = rawScore * weight;

      newSubjects[index].rawScore = rawScore;
      newSubjects[index].weightedScore = weightedScore;
    }

    setData({ ...data, subjects: newSubjects });
  };

  // Add a new subject
  const addSubject = () => {
    setData({
      ...data,
      subjects: [
        ...data.subjects,
        {
          name: `Subject ${data.subjects.length + 1}`,
          presentData: '',
          rawScore: '',
          weightedScore: '',
        },
      ],
    });
  };

  // Handle form submission to send data to the backend
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Send the data to the backend (example with fetch)
    const response = await fetch('/api/submit', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        header: 'Student Performance in University Exam',
        data: payload,
      }),
    });

    const result = await response.json();
    console.log(result);
  };

  return (
    <div className="p-8 bg-gray-200">
      <h4 className="text-xl font-bold mb-8 text-center">
        ACADEMIC PERFORMANCE
      </h4>

      <form className="bg-white p-8 rounded-lg" onSubmit={handleSubmit}>
        {/* Header Section */}
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div>
            <label className="block mb-1 font-medium">
              Name of the faculty Member:
            </label>
            <input
              type="text"
              placeholder="Enter the faculty name"
              className="w-full px-2 py-2 border rounded-md"
              value={data.facultyName}
              onChange={(e) =>
                setData({ ...data, facultyName: e.target.value })
              }
            />
          </div>
          <div>
            <label className="block mb-1 font-medium">Academic Year:</label>
            <input
              type="text"
              placeholder="Enter Academic Year"
              className="w-full px-2 py-2 border rounded-md"
              value={data.academicYear}
              onChange={(e) =>
                setData({ ...data, academicYear: e.target.value })
              }
            />
          </div>
        </div>

        <table className="table-auto w-full border-collapse border border-gray-300 text-sm">
          <thead>
            <tr className="bg-gray-200">
              <th className="border border-gray-300 p-2">S. No.</th>
              <th className="border border-gray-300 p-2">
                Performance Parameters
              </th>
              <th className="border border-gray-300 p-2">BenchMark</th>
              <th className="border border-gray-300 p-2">Present Data</th>
              <th className="border border-gray-300 p-2">
                Raw Score on 5 Point scale
              </th>
              <th className="border border-gray-300 p-2">Weight</th>
              <th className="border border-gray-300 p-2">Weighted Score</th>
            </tr>
          </thead>
          <tbody>
            {[
              'Clear Pass Percentage',
              'Avg. Marks in theory Paper',
              'Number of students securing more than 75% marks',
            ].map((param, rowIndex) => (
              <tr key={rowIndex}>
                <td className="border border-gray-300 p-2">{rowIndex + 1}</td>
                <td className="border border-gray-300 p-2">{param}</td>
                <td className="border border-gray-300 p-2">
                  {data.subjects.map((subject, index) => (
                    <input
                      key={`benchmark-${index}`}
                      type="text"
                      placeholder={subject.name}
                      className="w-full border p-2 mb-1"
                      defaultValue={40} // Default benchmark value
                      readOnly
                    />
                  ))}
                </td>
                <td className="border border-gray-300 p-2">
                  {data.subjects.map((subject, index) => (
                    <input
                      key={`presentData-${index}`}
                      type="text"
                      placeholder={subject.name}
                      className="w-full border p-2 mb-1"
                      value={subject.presentData}
                      onChange={(e) =>
                        handleChange(index, 'presentData', e.target.value)
                      }
                    />
                  ))}
                </td>
                <td className="border border-gray-300 p-2">
                  {data.subjects.map((subject, index) => (
                    <input
                      key={`rawScore-${index}`}
                      type="text"
                      placeholder={subject.name}
                      className="w-full border p-2 mb-1"
                      value={subject.rawScore || ''}
                      readOnly
                    />
                  ))}
                </td>
                <td className="border text-center border-gray-300 p-2">0.40</td>
                <td className="border border-gray-300 p-2">
                  {data.subjects.map((subject, index) => (
                    <input
                      key={`weightedScore-${index}`}
                      type="text"
                      placeholder={subject.name}
                      className="w-full border p-2 mb-1"
                      value={subject.weightedScore || ''}
                      readOnly
                    />
                  ))}
                </td>
              </tr>
            ))}
            <tr>
              <td colSpan={5}></td>
              <td className="border p-3">Total</td>
              <td className="border p-3">
                <input type="text" className="border p-2" readOnly />
              </td>
            </tr>
            <tr>
              <td colSpan={4}></td>
              <td colSpan={2} className="border text-center">
                Total out of 100
              </td>
              <td className="border p-3">
                <input type="text" className="border p-2" readOnly />
              </td>
            </tr>
          </tbody>
        </table>

        {/* Add Subject Button */}
        <div className="text-center mt-4">
          <button
            type="button"
            onClick={addSubject}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            Add Subject
          </button>
        </div>

        {/* Submit Button */}
        <div className="text-center mt-4">
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default BenchmarkForm;
