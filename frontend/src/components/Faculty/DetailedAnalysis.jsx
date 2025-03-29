import React from 'react';
import {
  Chart as ChartJS,
  ArcElement,
  RadialLinearScale,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement
} from 'chart.js';
import { Pie, Radar, Bar } from 'react-chartjs-2';

// Registering all necessary components in ChartJS
ChartJS.register(
  ArcElement,
  RadialLinearScale,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement
);

const DetailedAnalysisWithCharts = () => {
  const performanceMetrics = [5, 78, 2, 1, 1, 2, 85];
  const labels = ['Research Publications', 'Teaching Evaluations', 'Conferences', 'Leadership Roles', 'Grants', 'Mentorship', 'Overall AI Score'];

  // Data for Bar Chart
  const barData = {
    labels,
    datasets: [
      {
        label: 'Performance Metrics',
        data: performanceMetrics,
        backgroundColor: '#4CAF50',
      },
    ],
  };

  // Data for Pie Chart
  const pieData = {
    labels: ['On Track', 'Below Benchmark', 'Low Participation', 'Potential Growth', 'Needs Improvement', 'Meeting Expectations'],
    datasets: [
      {
        data: [1, 1, 1, 1, 1, 2],
        backgroundColor: ['#4CAF50', '#FF9800', '#F44336', '#9C27B0', '#2196F3', '#FFC107'],
      },
    ],
  };

  // Data for Radar Chart
  const radarData = {
    labels,
    datasets: [
      {
        label: 'Faculty Performance Overview',
        data: performanceMetrics,
        backgroundColor: 'rgba(255, 99, 132, 0.2)',
        borderColor: 'rgba(255, 99, 132, 1)',
        borderWidth: 2,
        pointBackgroundColor: 'rgba(255, 99, 132, 1)',
      },
    ],
  };

  // Table Data
  const analysisData = [
    {
      metric: 'Research Publications',
      currentPerformance: '5 in the past year',
      aiAnalysis: 'On track',
      improvementAreas: 'None',
      suggestedActions: 'Continue publishing',
    },
    {
      metric: 'Teaching Evaluations',
      currentPerformance: '78% average',
      aiAnalysis: 'Below benchmark',
      improvementAreas: 'Teaching Methodology',
      suggestedActions: "Attend 'Effective Teaching Techniques' workshop",
    },
    {
      metric: 'Conference Participation',
      currentPerformance: '2 attended',
      aiAnalysis: 'Low participation',
      improvementAreas: 'More participation needed',
      suggestedActions: 'Participate in 1-2 conferences in the next 6 months',
    },
    {
      metric: 'Leadership Roles',
      currentPerformance: '1 project lead',
      aiAnalysis: 'Potential for growth',
      improvementAreas: 'Take more leadership roles',
      suggestedActions: "Enroll in 'Leadership in Academia' training",
    },
    {
      metric: 'Grant Applications',
      currentPerformance: '1 submitted, none awarded',
      aiAnalysis: 'Needs improvement',
      improvementAreas: 'Research grant writing',
      suggestedActions: 'Join Grant Writing Bootcamp',
    },
    {
      metric: 'Mentorship Given',
      currentPerformance: '2 mentees',
      aiAnalysis: 'Meeting expectations',
      improvementAreas: 'None',
      suggestedActions: 'Continue mentorship activities',
    },
    // {
    //   metric: 'Overall AI Score',
    //   currentPerformance: '85',
    //   aiAnalysis: 'Eligible for promotion',
    //   improvementAreas: '-',
    //   suggestedActions: 'Prepare for the next promotion cycle',
    // },
  ];

  const chartOptions = {
    maintainAspectRatio: true, // Ensures the chart maintains its aspect ratio
    responsive: true, // Enables responsiveness
    aspectRatio: 2, // Sets a smaller aspect ratio
  };

  return (
    <div className="bg-white p-8 rounded shadow-lg">
      <h2 className="text-3xl font-bold mb-6">Detailed Promotion Criteria Analysis</h2>

      {/* Detailed Analysis Table */}
      <div className="overflow-x-auto mb-10">
        <table className="min-w-full table-auto border-collapse border border-gray-200">
          <thead className="bg-yellow-300">
            <tr>
              <th className="border border-gray-300 p-3">Metric</th>
              <th className="border border-gray-300 p-3">Current Performance</th>
              <th className="border border-gray-300 p-3">Appraisal Analysis</th>
              {/* <th className="border border-gray-300 p-3">Improvement Areas</th> */}
              <th className="border border-gray-300 p-3">Suggested Actions</th>
            </tr>
          </thead>
          <tbody>
            {analysisData.map((item, index) => (
              <tr key={index} className={index % 2 === 0 ? 'bg-gray-100' : 'bg-white'}>
                <td className="border border-gray-300 p-3">{item.metric}</td>
                <td className="border border-gray-300 p-3">{item.currentPerformance}</td>
                <td className="border border-gray-300 p-3">{item.aiAnalysis}</td>
                {/* <td className="border border-gray-300 p-3">{item.improvementAreas}</td> */}
                <td className="border border-gray-300 p-3">{item.suggestedActions}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Bar Chart Section */}
      <div className="bg-gray-50 p-6 rounded-lg mb-8 shadow">
        <h3 className="text-xl font-semibold mb-4 text-center">Performance Metrics Overview (Bar Chart)</h3>
        <div className="max-w-lg mx-auto">
          <Bar data={barData} options={chartOptions} />
        </div>
      </div>

      {/* Pie Chart Section */}
      <div className="bg-gray-50 p-6 rounded-lg mb-8 shadow">
        <h3 className="text-xl font-semibold mb-4 text-center">Appraisal Analysis Breakdown (Pie Chart)</h3>
        <div className="max-w-lg mx-auto">
          <Pie data={pieData} options={chartOptions} />
        </div>
      </div>

      {/* Radar Chart Section */}
      <div className="bg-gray-50 p-6 rounded-lg shadow">
        <h3 className="text-xl font-semibold mb-4 text-center">Faculty Performance Overview (Radar Chart)</h3>
        <div className="max-w-lg mx-auto">
          <Radar data={radarData} options={chartOptions} />
        </div>
      </div>
    </div>
  );
};

export default DetailedAnalysisWithCharts;
