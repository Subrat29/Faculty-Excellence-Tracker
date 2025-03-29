import React, { useState } from 'react';
import { FaArrowLeft, FaArrowRight, FaCheck } from 'react-icons/fa';
import ResearchPublicationsForm from './Appraisal/ResearchPublication';
import AppraisalByHodAndDiretor from './Appraisal/AppraisalByHodandFaculty';
import BenchmarkForm from './Appraisal/StudentPerformanceinUniversityExam';
import { useSelector } from 'react-redux';
import axiosInstance from '../../services/admin';

const AppraisalForm = () => {
  const facultyId = useSelector((state) => state.auth.user._id);
  const [formStep, setFormStep] = useState(0);
  const [formData, setFormData] = useState({
    facultyName: '',
    academicYear: '',
    benchmarkForm: { subjects: [] },
    researchForm: {},
    appraisalForm: {},
  });

  const [scores, setScores] = useState({
    A: { total: 0, activities: [0, 0, 0, 0, 0, 0, 0] },
    B: { total: 0, activities: [0, 0, 0, 0, 0] },
    C: { total: 0, activities: [0, 0, 0, 0, 0, 0] },
    D: { total: 0, activities: [0, 0, 0, 0] },
    E: { total: 0, activities: [0, 0, 0, 0] },
  });

  // Function to handle score change and update total score for each section
  const handleScoreChange = (section, index, score) => {
    const newScores = { ...scores };
    newScores[section].activities[index] = parseInt(score, 10) || 0;

    // Calculate the total score for the section
    const sectionTotal = newScores[section].activities.reduce(
      (acc, curr) => acc + curr,
      0
    );
    newScores[section].total = sectionTotal;

    setScores(newScores);
  };

  const [isSubmitting, setIsSubmitting] = useState(false);

  const nextStep = () => {
    if (isValid()) {
      setFormStep((prev) => prev + 1);
    }
  };

  const prevStep = () => setFormStep((prev) => prev - 1);

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

  // Check if all required fields are filled
  const isValid = () => {
    if (formStep === 0) {
      return true; // Assuming form is valid for this step
    }
    if (formStep === 1) {
      // Add logic for ResearchPublication form validation
      return true; // Assuming form is valid for this step
    }
    if (formStep === 2) {
      // Validate BenchmarkForm subjects
      return formData.benchmarkForm.subjects.every(
        (subject) => subject.presentData && subject.rawScore
      );
    }
    return true;
  };

  const handleSubmit = async () => {
    const sectionData = [
      {
        heading: 'Teaching Excellence and Student Engagement',
        totalScore: scores.A.total,
      },
      {
        heading: 'Research Impact and Innovation',
        totalScore: scores.B.total,
      },
      {
        heading: 'Leadership and Administrative Work',
        totalScore: scores.C.total,
      },
      {
        heading: 'Skill Development and Training',
        totalScore: scores.D.total,
      },
      {
        heading: 'Community Service and Extra Activities',
        totalScore: scores.E.total,
      },
    ];

    const appbyHODsectionData = [
      {
        heading: 'Performance Assessment',
        totalScore: sectionA.total,
      },
      {
        heading: 'Personal Attributes',
        totalScore: sectionB.total,
      },
      {
        heading: 'Appraisal By HOD & Director',
        totalScore: sectionA.total + sectionB.total,
      },
    ];

    const payload = {
      facultyName: data.facultyName,
      academicYear: data.academicYear,
      performanceData: data.subjects,
    };

    setIsSubmitting(true);
    try {
      console.log('Section Data', sectionData);
      console.log('Appraisal By HOD Section Data', appbyHODsectionData);
      console.log('Payload', payload);

      const dataToSubmit = [
        facultyId,
        {
          sectionData, // Add section data
          appbyHODsectionData, // Add appraisal by HOD section data
          payload,
        }, // Add payload data
      ];

      console.log('Data to submit', dataToSubmit);

      // Send the data to the backend (example with fetch)
      const response = await axiosInstance.post(
        `/v1/faculty/appraisal/analysis`,
        dataToSubmit
      );

      if (response.status === 200) {
        console.log('Data submitted successfully');
      }
    } catch (error) {
      console.error('Submit failed:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const steps = [
    {
      title: 'Research & Publications',
      content: (
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
                  <td
                    colSpan="6"
                    className="border border-gray-300 font-bold p-2"
                  >
                    A. Teaching Excellence and Student Engagement
                  </td>
                </tr>
                {[
                  {
                    activity: 'Quality of preparedness for teaching',
                    marks: 25,
                  },
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
                    <td className="border border-gray-300 p-2">
                      {item.activity}
                    </td>
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
                  <td
                    colSpan="6"
                    className="border border-gray-300 font-bold p-2"
                  >
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
                    <td className="border border-gray-300 p-2">
                      {item.activity}
                    </td>
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
                  <td
                    colSpan="6"
                    className="border border-gray-300 font-bold p-2"
                  >
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
                  {
                    activity: 'Assistance in the admission process',
                    marks: 10,
                  },
                  { activity: 'Development of institutional MIS', marks: 10 },
                  {
                    activity: 'Organizing staff development activities',
                    marks: 10,
                  },
                ].map((item, index) => (
                  <tr key={index}>
                    <td className="border border-gray-300 p-2">{index + 1}</td>
                    <td className="border border-gray-300 p-2">
                      {item.activity}
                    </td>
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
                  <td
                    colSpan="6"
                    className="border border-gray-300 font-bold p-2"
                  >
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
                    <td className="border border-gray-300 p-2">
                      {item.activity}
                    </td>
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
                  <td
                    colSpan="6"
                    className="border border-gray-300 font-bold p-2"
                  >
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
                    <td className="border border-gray-300 p-2">
                      {item.activity}
                    </td>
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
              </tbody>
            </table>
          </form>
        </div>
      ),
    },
    {
      title: 'APPRAISAL BY HOD & Director',
      content: (
        <div className="p-8 bg-gray-200">
          <h4 className="text-xl font-bold mb-6 text-center">
            APPRAISAL BY HOD & Director
          </h4>
          <div className="bg-white p-6 rounded shadow-md">
            <form className="space-y-6" onSubmit={handleSubmit}>
              {/* Academic Year and Faculty Details */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block mb-1 font-medium">
                    Academic Year:
                  </label>
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
                <input
                  type="date"
                  className="w-full px-4 py-2 border rounded-md"
                />
              </div>

              {/* Evaluation Parameters */}
              {/* Section A: Performance Assessment */}
              <div>
                <h2 className="text-lg font-semibold">
                  A. Performance Assessment
                </h2>
                <table className="w-full border-collapse border border-gray-400 mt-4">
                  <thead>
                    <tr className="bg-gray-200">
                      <th className="border border-gray-400 px-4 py-2">
                        S. No.
                      </th>
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
                <h2 className="text-lg font-semibold">
                  B. Personal Attributes
                </h2>
                <table className="w-full border-collapse border border-gray-400 mt-4">
                  <thead>
                    <tr className="bg-gray-200">
                      <th className="border border-gray-400 px-4 py-2">
                        S. No.
                      </th>
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
            </form>
          </div>
        </div>
      ),
    },
    {
      title: 'Student Performance in University Exams',
      content: (
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
                    <td className="border border-gray-300 p-2">
                      {rowIndex + 1}
                    </td>
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
                    <td className="border text-center border-gray-300 p-2">
                      0.40
                    </td>
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
          </form>
        </div>
      ),
    },
  ];

  const progressPercentage = Math.round(((formStep + 1) / steps.length) * 100);

  return (
    <div className="p-6 bg-white shadow rounded">
      <h2 className="text-2xl font-bold mb-4">
        Self-Appraisal Form Submission
      </h2>

      {/* Progress Bar */}
      <div className="w-full bg-gray-200 rounded-full mb-6">
        <div
          className="bg-blue-500 text-xs font-medium text-blue-100 text-center p-1 leading-none rounded-full"
          style={{ width: `${progressPercentage}%` }}
        >
          {progressPercentage}%
        </div>
      </div>

      {/* Step Titles */}
      <div className="mb-6">
        <div className="flex justify-between items-center">
          {steps.map((step, index) => (
            <div
              key={index}
              className={`p-2 border-b-4 cursor-pointer transition-all duration-300 ${
                formStep === index
                  ? 'border-blue-500 text-blue-500'
                  : 'border-gray-300 text-gray-500'
              }`}
              onClick={() => setFormStep(index)}
            >
              {step.title}
            </div>
          ))}
        </div>
      </div>

      {/* Form Content */}
      <form>
        <div className="transition-all duration-300">
          {steps[formStep].content}
        </div>

        <div className="flex justify-between mt-4">
          {/* Previous Button */}
          <button
            type="button"
            className={`p-2 rounded flex items-center space-x-2 ${
              formStep === 0
                ? 'bg-gray-400 cursor-not-allowed'
                : 'bg-blue-500 text-white hover:bg-blue-600 transition-all'
            }`}
            onClick={prevStep}
            disabled={formStep === 0}
          >
            <FaArrowLeft />
            <span>Previous</span>
          </button>

          {/* Next/Submit Button */}
          <button
            type="button"
            className={`p-2 rounded flex items-center space-x-2 ${
              isSubmitting || !isValid()
                ? 'bg-gray-400 cursor-not-allowed'
                : formStep === steps.length - 1
                ? 'bg-green-500 hover:bg-green-600'
                : 'bg-blue-500 hover:bg-blue-600'
            } text-white transition-all`}
            onClick={formStep === steps.length - 1 ? handleSubmit : nextStep}
            disabled={isSubmitting || !isValid()}
          >
            {isSubmitting ? (
              <span>Loading...</span>
            ) : formStep === steps.length - 1 ? (
              <>
                <FaCheck />
                <span>Submit</span>
              </>
            ) : (
              <>
                <span>Next</span>
                <FaArrowRight />
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AppraisalForm;
