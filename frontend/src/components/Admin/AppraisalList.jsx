import React, { useMemo, useState } from 'react';
import { useTable, useSortBy } from 'react-table';
import { FaDownload, FaCheck, FaTimes } from 'react-icons/fa';
import { FcFeedback } from 'react-icons/fc';
import toast from 'react-hot-toast';

const AppraisalList = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [currentReview, setCurrentReview] = useState('');
  const [currentEmployee, setCurrentEmployee] = useState(null);
  const [appraisalList, setAppraisalList] = useState(() => [
    {
      id: 'EMP001',
      employeeCode: 'EMP001', 
      facultyName: 'Dr. Kaini Mahemei',
      department: 'Computer Science',
      performanceScore: 95,
      recommendation: 'Approved for promotion',
      submissionDate: '2024-09-01',
      status: 'Reviewed',
      pdfLink: '/public/Research_Publications_of_Physics Kaini Mahemei.pdf',
      adminReview: '',
      finalAction: '',
    },
    {
      id: 'EMP002',
      employeeCode: 'EMP002',
      facultyName: 'Dr. Jane Smith', 
      department: 'Mathematics',
      performanceScore: 85,
      recommendation: 'Needs improvement in Research',
      submissionDate: '2024-09-05',
      status: 'Pending',
      pdfLink: '/public/Research_Publications_of_Physics Kaini Mahemei.pdf',
      adminReview: '',
      finalAction: '',
    },
    {
      id: 'EMP003', 
      employeeCode: 'EMP003',
      facultyName: 'Dr. Alice Johnson',
      department: 'Physics',
      performanceScore: 75,
      recommendation: 'Needs improvement in Teaching',
      submissionDate: '2024-09-10',
      status: 'Pending',
      pdfLink: '/public/Research_Publications_of_Physics Kaini Mahemei.pdf',
      adminReview: '',
      finalAction: '',
    },
  ]);

  const handleApproval = (employee) => {
    if (!employee?.id) {
      toast.error('Invalid employee data');
      return;
    }

    if (window.confirm(`Are you sure you want to approve the appraisal for ${employee.facultyName}?`)) {
      try {
        setAppraisalList(prevList => 
          prevList.filter(item => item.id !== employee.id)
        );
        
        toast.success(`The appraisal for ${employee.facultyName} has been approved.`);
      } catch (error) {
        console.error('Error approving appraisal:', error);
        toast.error('Failed to approve appraisal. Please try again.');
      }
    }
  };

  const handleRejection = (employee) => {
    if (!employee?.id) {
      toast.error('Invalid employee data');
      return;
    }

    if (!currentReview?.trim()) {
      toast.error('Please provide feedback before rejecting the appraisal.');
      return;
    }

    if (currentReview.length > 100) {
      toast.error('Feedback must not exceed 100 characters.');
      return;
    }

    try {
      setAppraisalList(prevList => 
        prevList.filter(item => item.id !== employee.id)
      );
      
      toast.success(`The appraisal for ${employee.facultyName} has been rejected with feedback.`);
      closeModal();
    } catch (error) {
      console.error('Error rejecting appraisal:', error);
      toast.error('Failed to reject appraisal. Please try again.');
    }
  };

  const openModal = (employee) => {
    if (!employee?.id) {
      toast.error('Invalid employee data');
      return;
    }
    setCurrentEmployee(employee);
    setCurrentReview(employee.adminReview || '');
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setCurrentEmployee(null);
    setCurrentReview('');
  };

  const columns = useMemo(
    () => [
      {
        Header: 'Employee Code',
        accessor: 'employeeCode',
        mobile: true,
      },
      {
        Header: 'Faculty Name',
        accessor: 'facultyName',
        mobile: true,
      },
      {
        Header: 'Department',
        accessor: 'department', 
        mobile: true,
      },
      {
        Header: 'Appraisal Score',
        accessor: 'performanceScore',
        mobile: false,
      },
      {
        Header: 'Promotion Recommendation',
        accessor: 'recommendation',
        mobile: false,
      },
      {
        Header: 'Submission Date',
        accessor: 'submissionDate',
        mobile: false,
      },
      {
        Header: 'Status',
        accessor: 'status',
        Cell: ({ value }) => (
          <span
            className={`px-2 py-1 rounded-full text-sm font-bold ${
              value === 'Pending'
                ? 'bg-yellow-100 text-yellow-800'
                : 'bg-green-100 text-green-800'
            }`}
          >
            {value}
          </span>
        ),
        mobile: true,
      },
      {
        Header: 'PDF',
        accessor: 'pdfLink',
        Cell: ({ value }) => (
          <a 
            href={value} 
            target="_blank" 
            rel="noopener noreferrer"
            className="inline-block"
          >
            <button className="bg-blue-500 text-white px-2 py-1 rounded hover:bg-blue-600 flex items-center space-x-1 transition-all duration-200">
              <FaDownload className="mr-1" />
              <span>Download</span>
            </button>
          </a>
        ),
        mobile: true,
      },
      {
        Header: 'Admin Feedback',
        accessor: 'adminFeedback',
        Cell: ({ row }) => (
          <button
            onClick={() => openModal(row.original)}
            className="bg-blue-500 text-white px-2 py-1 rounded hover:bg-blue-600 flex items-center space-x-1 transition-all duration-200"
          >
            <FcFeedback className="h-6 w-6 mr-1" />
            <span>Feedback</span>
          </button>
        ),
        mobile: true,
      },
      {
        Header: 'Actions',
        Cell: ({ row }) => (
          <div className="flex items-center space-x-2">
            <button
              onClick={() => handleApproval(row.original)}
              className="bg-green-500 text-white px-2 py-1 rounded hover:bg-green-600 flex items-center space-x-1 transition-all duration-200"
              aria-label={`Approve ${row.original.facultyName}'s appraisal`}
            >
              <FaCheck className="mr-1" />
              Approve
            </button>
            <button
              onClick={() => openModal(row.original)}
              className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600 flex items-center space-x-1 transition-all duration-200"
              aria-label={`Reject ${row.original.facultyName}'s appraisal`}
            >
              <FaTimes className="mr-1" />
              Reject
            </button>
          </div>
        ),
      },
    ],
    []
  );

  const handleFinalAction = (employeeCode, action) => {
    if (!employeeCode || !action) {
      toast.error('Invalid action parameters');
      return;
    }
    alert(`Employee ${employeeCode} has been ${action}.`);
  };

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable(
      {
        columns,
        data: appraisalList,
        initialState: {
          hiddenColumns:
            window.innerWidth < 768
              ? columns
                  .filter((col) => col.mobile === false)
                  .map((col) => col.accessor)
              : [],
        },
      },
      useSortBy
    );

  return (
    <div className="p-4 sm:p-6 bg-gradient-to-b from-blue-100 to-blue-200 min-h-screen">
      <h2 className="text-2xl mt-12 md:mt-0 sm:text-3xl font-bold mb-4 text-center text-blue-600">
        Faculty Appraisals
      </h2>
      <div className="bg-white shadow-xl rounded-lg overflow-hidden p-4 sm:p-6">
        <div className="overflow-scroll">
          <table
            {...getTableProps()}
            className="w-full bg-white rounded-lg shadow-lg"
          >
            <thead className="bg-blue-500 text-white">
              {headerGroups.map((headerGroup) => (
                <tr
                  {...headerGroup.getHeaderGroupProps()}
                  key={headerGroup.getHeaderGroupProps().key}
                >
                  {headerGroup.headers.map((column) => (
                    <th
                      {...column.getHeaderProps(column.getSortByToggleProps())}
                      key={column.getHeaderProps().key}
                      className="text-left px-2 sm:px-4 py-2 sm:py-3 text-sm sm:text-lg font-semibold tracking-wider"
                    >
                      {column.render('Header')}
                      <span>
                        {column.isSorted
                          ? column.isSortedDesc
                            ? ' 🔽'
                            : ' 🔼'
                          : ''}
                      </span>
                    </th>
                  ))}
                </tr>
              ))}
            </thead>
            <tbody {...getTableBodyProps()}>
              {rows.map((row) => {
                prepareRow(row);
                return (
                  <tr
                    {...row.getRowProps()}
                    key={row.original.id}
                    className="border-b hover:bg-gray-50 transition duration-150"
                  >
                    {row.cells.map((cell) => (
                      <td
                        {...cell.getCellProps()}
                        key={cell.getCellProps().key}
                        className="px-2 sm:px-4 py-2 sm:py-3 text-gray-700 text-xs sm:text-base"
                      >
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

      {modalOpen && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-75 flex items-center justify-center p-4 z-50">
          <div className="bg-white p-4 sm:p-6 rounded-lg shadow-lg w-full sm:w-2/3 md:w-1/2 lg:w-1/3">
            <h3 className="text-lg sm:text-xl font-bold mb-4">
              Rejection Feedback for {currentEmployee?.facultyName}
            </h3>
            <div className="mb-2">
              <span className="text-sm text-gray-500">
                {currentReview.length}/100 characters
              </span>
            </div>
            <textarea
              value={currentReview}
              onChange={(e) => setCurrentReview(e.target.value)}
              maxLength={100}
              className="w-full h-24 sm:h-32 border rounded p-2 mb-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="Enter feedback (required, max 100 characters)"
              aria-label="Rejection feedback"
            />
            <div className="flex justify-end mt-4 space-x-2">
              <button
                onClick={closeModal}
                className="bg-gray-500 text-white px-3 sm:px-4 py-2 rounded hover:bg-gray-600 transition-all duration-200"
              >
                Cancel
              </button>
              <button
                onClick={() => handleRejection(currentEmployee)}
                className="bg-red-500 text-white px-3 sm:px-4 py-2 rounded hover:bg-red-600 transition-all duration-200"
              >
                Reject
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AppraisalList;
