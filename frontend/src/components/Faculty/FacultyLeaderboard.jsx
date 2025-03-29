import React, { useMemo } from 'react';
import { useTable, useSortBy } from 'react-table';
import { Bar, Pie } from 'react-chartjs-2';

// Sample data for faculty leaderboard
const facultyData = [
  { name: 'Dr. Alice', rank: 1, profileScore: 95, points: 1200, badges: ['Star Faculty', 'Top Researcher'] },
  { name: 'Dr. Bob', rank: 2, profileScore: 90, points: 1100, badges: ['Top Educator'] },
  { name: 'Dr. Charlie', rank: 3, profileScore: 88, points: 1050, badges: ['Star Faculty'] },
  { name: 'Dr. Dana', rank: 4, profileScore: 85, points: 980, badges: ['Mentorship Guru'] },
  { name: 'Dr. Eva', rank: 5, profileScore: 82, points: 950, badges: ['Top Researcher'] },
];

// ChartJS configuration for bar and pie charts
import { Chart as ChartJS, ArcElement, CategoryScale, LinearScale, BarElement, Tooltip, Legend } from 'chart.js';
ChartJS.register(ArcElement, CategoryScale, LinearScale, BarElement, Tooltip, Legend);

const FacultyLeaderboard = () => {
  // Define table columns
  const columns = useMemo(
    () => [
      {
        Header: 'Rank',
        accessor: 'rank', // Accessor is the key in the data
      },
      {
        Header: 'Faculty Name',
        accessor: 'name',
      },
      {
        Header: 'Profile Score',
        accessor: 'profileScore',
      },
      {
        Header: 'Points',
        accessor: 'points',
      },
      {
        Header: 'Badges',
        accessor: 'badges',
        Cell: ({ value }) => value.join(', '), // Join badges as comma separated
      },
    ],
    []
  );

  const data = useMemo(() => facultyData, []);

  // Create a table instance with React Table and sorting
  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } = useTable(
    {
      columns,
      data,
    },
    useSortBy // Enables sorting on columns
  );

  // Bar Chart Data for Points
  const barChartData = {
    labels: facultyData.map(faculty => faculty.name),
    datasets: [
      {
        label: 'Points',
        data: facultyData.map(faculty => faculty.points),
        backgroundColor: ['#4CAF50', '#2196F3', '#FF9800', '#9C27B0', '#FFC107'],
      },
    ],
  };

  // Pie Chart Data for Badges distribution
  const badgeCount = facultyData.reduce((acc, faculty) => {
    faculty.badges.forEach(badge => {
      acc[badge] = (acc[badge] || 0) + 1;
    });
    return acc;
  }, {});

  const pieChartData = {
    labels: Object.keys(badgeCount),
    datasets: [
      {
        label: 'Badges Distribution',
        data: Object.values(badgeCount),
        backgroundColor: ['#4CAF50', '#2196F3', '#FF9800', '#9C27B0', '#FFC107'],
      },
    ],
  };

  return (
    <div className="bg-white p-6 rounded shadow">
      <h2 className="text-2xl font-bold mb-4">Faculty Leaderboard</h2>

      {/* Faculty Leaderboard Table */}
      <table {...getTableProps()} className="min-w-full border-collapse border border-gray-200 mb-6">
        <thead className="bg-gray-100">
          {headerGroups.map(headerGroup => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map(column => (
                <th
                  {...column.getHeaderProps(column.getSortByToggleProps())}
                  className="border border-gray-300 p-2 text-left cursor-pointer"
                >
                  {column.render('Header')}
                  {/* Add a sort indicator */}
                  <span>
                    {column.isSorted ? (column.isSortedDesc ? ' 🔽' : ' 🔼') : ''}
                  </span>
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {rows.map(row => {
            prepareRow(row);
            return (
              <tr {...row.getRowProps()} className="hover:bg-gray-100">
                {row.cells.map(cell => (
                  <td {...cell.getCellProps()} className="border border-gray-300 p-2">
                    {cell.render('Cell')}
                  </td>
                ))}
              </tr>
            );
          })}
        </tbody>
      </table>

      {/* Charts Section */}
      <div className="grid grid-cols-2 gap-6">
        {/* Bar Chart for Points */}
        <div className="bg-white p-4 rounded shadow">
          <h3 className="text-xl font-bold mb-2">Points Comparison</h3>
          <div style={{ height: '300px' }}>
            <Bar data={barChartData} options={{ responsive: true, maintainAspectRatio: false }} />
          </div>
        </div>

        {/* Pie Chart for Badges */}
        <div className="bg-white p-4 rounded shadow">
          <h3 className="text-xl font-bold mb-2">Badges Distribution</h3>
          <div style={{ height: '300px' }}>
            <Pie data={pieChartData} options={{ responsive: true, maintainAspectRatio: false }} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default FacultyLeaderboard;
