import React, { useState } from 'react';
import { Line } from 'react-chartjs-2';
import { FaChartLine, FaBuilding } from 'react-icons/fa';

const PerformanceChart = () => {
  const [viewType, setViewType] = useState('yearly'); // State to handle view type (Yearly or Department Comparison)

  // Sample data for faculty performance over time
  const data = {
    labels: ['2019', '2020', '2021', '2022', '2023'], // Years
    datasets: [
      {
        label: 'Research',
        data: [75, 85, 90, 88, 92],
        borderColor: '#4CAF50',
        backgroundColor: 'rgba(76, 175, 80, 0.2)',
        fill: true,
        tension: 0.4,
      },
      {
        label: 'Teaching',
        data: [80, 78, 85, 82, 90],
        borderColor: '#2196F3',
        backgroundColor: 'rgba(33, 150, 243, 0.2)',
        fill: true,
        tension: 0.4,
      },
      {
        label: 'Service',
        data: [60, 65, 70, 75, 80],
        borderColor: '#FF9800',
        backgroundColor: 'rgba(255, 152, 0, 0.2)',
        fill: true,
        tension: 0.4,
      },
      {
        label: 'Collaboration',
        data: [70, 75, 72, 80, 85],
        borderColor: '#9C27B0',
        backgroundColor: 'rgba(156, 39, 176, 0.2)',
        fill: true,
        tension: 0.4,
      },
      {
        label: 'Engagement',
        data: [60, 62, 65, 68, 70],
        borderColor: '#FFC107',
        backgroundColor: 'rgba(255, 193, 7, 0.2)',
        fill: true,
        tension: 0.4,
      },
    ],
  };

  const options = {
    scales: {
      y: {
        beginAtZero: true,
        max: 100,
        ticks: {
          callback: (value) => `${value}%`, // Add % to the y-axis ticks
        },
      },
    },
    plugins: {
      legend: {
        display: true,
        position: 'top',
        labels: {
          font: {
            size: 14,
            family: 'Arial, sans-serif',
          },
        },
      },
      tooltip: {
        callbacks: {
          label: function (context) {
            return `${context.dataset.label}: ${context.raw}%`;
          },
        },
      },
    },
    animation: {
      duration: 1000,
      easing: 'easeInOutQuad',
    },
    responsive: true,
    maintainAspectRatio: false, // Allows the chart to resize based on the container
  };

  // Table Data (represents the same performance over time in a tabular format)
  const tableData = [
    { year: '2019', research: 75, teaching: 80, service: 60, collaboration: 70, engagement: 60 },
    { year: '2020', research: 85, teaching: 78, service: 65, collaboration: 75, engagement: 62 },
    { year: '2021', research: 90, teaching: 85, service: 70, collaboration: 72, engagement: 65 },
    { year: '2022', research: 88, teaching: 82, service: 75, collaboration: 80, engagement: 68 },
    { year: '2023', research: 92, teaching: 90, service: 80, collaboration: 85, engagement: 70 },
  ];

  return (
    <div className="bg-gradient-to-b from-blue-50 to-white p-8 rounded-lg shadow-lg">
      <h2 className="text-3xl font-extrabold text-gray-800 mb-6">Faculty Performance Over Time</h2>

      {/* Performance Line Chart */}
      <div className="mb-6" style={{ height: '400px' }}>
        <Line data={data} options={options} />
      </div>

      {/* Action Buttons */}
      <div className="flex justify-between items-center mb-8">
        <button
          onClick={() => setViewType('yearly')}
          className={`bg-blue-500 text-white p-3 rounded-lg shadow-md flex items-center space-x-2 hover:bg-blue-600 transition-all ${
            viewType === 'yearly' ? 'ring-2 ring-blue-300' : ''
          }`}
        >
          <FaChartLine className="mr-2" />
          <span>Yearly Overview</span>
        </button>
        <button
          onClick={() => setViewType('department')}
          className={`bg-blue-500 text-white p-3 rounded-lg shadow-md flex items-center space-x-2 hover:bg-blue-600 transition-all ${
            viewType === 'department' ? 'ring-2 ring-blue-300' : ''
          }`}
        >
          <FaBuilding className="mr-2" />
          <span>Department Comparison</span>
        </button>
      </div>

      {/* Table for Detailed Analysis */}
      <div className="overflow-x-auto mb-6">
        <table className="min-w-full table-auto border-collapse border border-gray-300">
          <thead className="bg-gray-100">
            <tr>
              <th className="border border-gray-300 p-4 text-left font-semibold">Year</th>
              <th className="border border-gray-300 p-4 text-left font-semibold">Research</th>
              <th className="border border-gray-300 p-4 text-left font-semibold">Teaching</th>
              <th className="border border-gray-300 p-4 text-left font-semibold">Service</th>
              <th className="border border-gray-300 p-4 text-left font-semibold">Collaboration</th>
              <th className="border border-gray-300 p-4 text-left font-semibold">Engagement</th>
            </tr>
          </thead>
          <tbody>
            {tableData.map((row, index) => (
              <tr key={index} className={index % 2 === 0 ? 'bg-gray-50' : 'bg-white'}>
                <td className="border border-gray-300 p-4">{row.year}</td>
                <td className="border border-gray-300 p-4">{row.research}%</td>
                <td className="border border-gray-300 p-4">{row.teaching}%</td>
                <td className="border border-gray-300 p-4">{row.service}%</td>
                <td className="border border-gray-300 p-4">{row.collaboration}%</td>
                <td className="border border-gray-300 p-4">{row.engagement}%</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PerformanceChart;
