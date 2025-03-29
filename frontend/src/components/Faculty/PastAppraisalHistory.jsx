import React, { useState, useMemo } from 'react';
import { useTable, useSortBy, useGlobalFilter } from 'react-table';
import { FaSearch } from 'react-icons/fa';

// GlobalFilter component for search functionality
const GlobalFilter = ({ filter, setFilter }) => {
  return (
    <div className="mb-4 flex items-center">
      <FaSearch className="text-gray-400 mr-2" />
      <input
        value={filter || ""}
        onChange={(e) => setFilter(e.target.value)}
        placeholder="Search appraisals..."
        className="w-full p-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-300"
      />
    </div>
  );
};

const PastAppraisalHistory = () => {
  const data = useMemo(
    () => [
      {
        submissionDate: '10-Sep-2023',
        score: 82,
        aiSuggestion: 'Not Ready for Promotion – Improvement needed in teaching evaluations and leadership roles.',
        adminReview: 'Needs to improve teaching methods. Encouraged to take leadership roles in departmental projects.',
        finalAction: 'Promotion Denied. Attend teaching workshops.',
        pdfLink: '#',
      },
      {
        submissionDate: '15-Mar-2024',
        score: 88,
        aiSuggestion: 'Promotion Ready – Good overall performance. Slight improvement required in grant applications.',
        adminReview: 'Good progress in teaching. Apply for more research grants to strengthen research portfolio.',
        finalAction: 'Promotion Denied. Work on grant applications.',
        pdfLink: '#',
      },
      {
        submissionDate: '20-Oct-2024',
        score: 92,
        aiSuggestion: 'Promotion Ready – Excellent performance. Keep up the good work.',
        adminReview: 'Excellent teaching evaluations. Keep up the good work.',
        finalAction: 'Promotion Approved.',
        pdfLink: '#',
      },
    ],
    []
  );

  const columns = useMemo(
    () => [
      {
        Header: 'Submission Date',
        accessor: 'submissionDate', // accessor is the key in the data
      },
      {
        Header: 'AI Performance Score',
        accessor: 'score',
        Cell: ({ value }) => (
          <span
            className={`px-3 py-1 rounded-full font-bold text-white ${
              value >= 90 ? 'bg-green-500' : value >= 80 ? 'bg-yellow-500' : 'bg-red-500'
            }`}
          >
            {value}
          </span>
        ),
      },
      {
        Header: 'AI Suggestion',
        accessor: 'aiSuggestion',
      },
      {
        Header: 'Admin Review',
        accessor: 'adminReview',
      },
      {
        Header: 'Final Action by Admin',
        accessor: 'finalAction',
      },
      {
        Header: 'Download PDF',
        accessor: 'pdfLink',
        Cell: ({ cell: { value } }) => (
          <a
            href={value}
            className="text-blue-600 font-semibold hover:underline hover:text-blue-700 transition"
          >
            Download PDF
          </a>
        ),
      },
    ],
    []
  );

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
    state,
    setGlobalFilter,
  } = useTable(
    {
      columns,
      data,
      initialState: { sortBy: [{ id: 'submissionDate', desc: true }] }, // Sort by date by default
    },
    useGlobalFilter, // For search
    useSortBy // For sorting
  );

  const { globalFilter } = state;

  return (
    <div className="min-h-screen">
      <div className="max-w-7xl mx-auto bg-white rounded-lg shadow-lg p-6">
        <h2 className="text-3xl font-bold text-blue-600 mb-6">Past Appraisal History</h2>

        {/* Search bar */}
        <GlobalFilter filter={globalFilter} setFilter={setGlobalFilter} />

        {/* Table */}
        <table {...getTableProps()} className="min-w-full table-auto border-collapse border border-gray-300 rounded-lg shadow">
          <thead>
            {headerGroups.map(headerGroup => (
              <tr {...headerGroup.getHeaderGroupProps()} className="bg-gray-100">
                {headerGroup.headers.map(column => (
                  <th
                    {...column.getHeaderProps(column.getSortByToggleProps())}
                    className="border p-4 text-left font-semibold cursor-pointer text-gray-700"
                  >
                    {column.render('Header')}
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
                <tr {...row.getRowProps()} className="hover:bg-gray-50 transition duration-150">
                  {row.cells.map(cell => (
                    <td {...cell.getCellProps()} className="border p-4 text-gray-700">
                      {cell.render('Cell')}
                    </td>
                  ))}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PastAppraisalHistory;
