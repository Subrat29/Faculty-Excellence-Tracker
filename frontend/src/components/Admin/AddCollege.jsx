import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useTable } from "react-table"; // Import react-table
import { addCollege, fetchCollege, fetchUniversity } from "../../store/features/adminSlice";

const AddCollege = () => {
  const dispatch = useDispatch();

  const [university, setUniversity] = useState([]);
  const [college, setCollege] = useState([]);

  const [data, setData] = useState({
    university_id: "",
    college_name: "",
    address: "",
    contact_number: "",
    email: "",
    website: "",
    director_name: "",
  });

  async function getUniversity() {
    try {
      const res = await dispatch(fetchUniversity());
      if (res.payload.data.data) {
        setUniversity(res.payload.data.data);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  }

  async function getCollege() {
    try {
      const res = await dispatch(fetchCollege());
      if (res.payload.data.data) {
        setCollege(res.payload.data.data);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  }

  useEffect(() => {
    getUniversity();
    getCollege();
  }, []);

  function handleInput(e) {
    const { name, value } = e.target;
    setData({
      ...data,
      [name]: value,
    });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      await dispatch(addCollege(data));
      getCollege(); // Refresh college list after adding
    } catch (error) {
      console.error("Error occurred while submitting the form:", error);
    }
  }

  // Columns for react-table
  const columns = React.useMemo(
    () => [
      { Header: "College Name", accessor: "college_name" },
      { Header: "University", accessor: "university_id.university_name" }, // Assuming nested structure
      { Header: "Address", accessor: "address" },
      { Header: "Contact", accessor: "contact_number" },
      { Header: "Email", accessor: "email" },
      { Header: "Website", accessor: "website" },
      { Header: "Director", accessor: "director_name" },
    ],
    []
  );

  // Bind data to the table
  const tableInstance = useTable({ columns, data: college });

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
  } = tableInstance;

  return (
    <div>
      {/* Form Section */}
      <div className='max-w-2xl mx-auto bg-sky-50 p-6 shadow-md rounded-lg'>
        <h1 className='text-2xl font-semibold text-center'>Add College</h1>
        <form onSubmit={handleSubmit} className='space-y-4'>

        <div>
          <label htmlFor="university_id" className="text-sm block font-medium text-gray-700">
            Select University
          </label>
          <select
                className="px-4 py-2 border w-full mt-1 border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                value={data.university_id} // Bind to the selected university ID
                id="university_id"
                name="university_id" // Corrected to match the state key
                onChange={handleInput}
            >
                <option value="" disabled>
                    Select a university
                </option>
                {university.map((u, index) => (
                    <option key={index} value={u._id}> {/* Using _id here */}
                        {u.university_name}
                    </option>
                ))}
            </select>

        </div>

            <div>
                <label htmlFor='college_name' className='block text-sm font-medium text-gray-700'>College Name</label>
                <input 
                    type="text" 
                    id='college_name'
                    name='college_name'
                    value={data.college_name}
                    onChange={handleInput}
                    placeholder='Enter college name'
                    className='px-4 py-2 border  border-gray-300 rounded-md w-full mt-1 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500'
                />
            </div>
            
            <div>
                <label htmlFor='address' className="block text-sm font-medium text-gray-700">
                    Address
                </label>
                <textarea
                    id="address"
                    name="address"
                    value={data.address}
                    onChange={handleInput}
                    placeholder="Enter address"
                    className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    rows={3}
                ></textarea>
            </div>

            <div>
                <label htmlFor='contact_number' className='block text-sm font-medium text-gray-700'>Contact Number</label>
                <input 
                   id='contact_number'
                   name='contact_number'
                   value={data.contact_number}
                   onChange={handleInput}
                   type="text" 
                   placeholder='Enter the contact number'
                   className='px-4 py-2 border  border-gray-300 rounded-md w-full mt-1 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500'
                />
            </div>

            <div>
                <label htmlFor='email' className='text-sm font-medium text-gray-700 block'>Email</label>
                <input 
                   id='email'
                   name='email'
                   value={data.email}
                   onChange={handleInput}
                   type="text" 
                   placeholder='Enter email'
                   className='px-4 py-2 w-full border  border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-md mt-1 focus:border-blue-500' 
                />
            </div>

            <div>
                <label htmlFor='website' className='text-sm font-medium text-gray-700 block'>Website</label>
                <input 
                   id='website'
                   name='website'
                   value={data.website}
                   onChange={handleInput}
                   type="text" 
                   placeholder='Enter website'
                   className='px-4 py-2 w-full border  border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-md mt-1 focus:border-blue-500' 
                />
            </div>

            <div>
                <label htmlFor='director_name' className='text-sm font-medium text-gray-700 block'>Director name</label>
                <input 
                   id='director_name'
                   name='director_name'
                   value={data.director_name}
                   onChange={handleInput}
                   type="text" 
                   placeholder='Enter director name'
                   className='px-4 py-2 w-full border  border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-md mt-1 focus:border-blue-500' 
                />
            </div>

            <div className="text-center">
                <button
                    type="submit"
                    className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                >
                    Add College
                </button>
            </div>
        </form>
        </div>

      {/* Table Section */}
      <div className="mt-8">
        <h1 className="text-2xl font-semibold text-center">College List</h1>
        <div className="overflow-x-auto">
            <table
            {...getTableProps()}
            className="table-auto border-collapse w-full mt-4 bg-white shadow-md rounded-lg"
            >
            <thead>
                {headerGroups.map((headerGroup) => (
                <tr {...headerGroup.getHeaderGroupProps()} className="bg-gray-100">
                    {headerGroup.headers.map((column) => (
                    <th
                        {...column.getHeaderProps()}
                        className="px-4 py-2 border text-left font-medium"
                    >
                        {column.render("Header")}
                    </th>
                    ))}
                </tr>
                ))}
            </thead>
            <tbody {...getTableBodyProps()}>
              {rows.map((row) => {
                prepareRow(row);
                const { key: rowKey, ...rowProps } = row.getRowProps();
                return (
                  <tr key={rowKey} {...rowProps} className="border-b">
                    {row.cells.map((cell) => {
                      const { key: cellKey, ...cellProps } = cell.getCellProps();
                      return (
                        <td key={cellKey} {...cellProps} className="px-4 py-2 border text-sm">
                          {cell.render("Cell")}
                        </td>
                      );
                    })}
                  </tr>
                );
              })}
            </tbody>

            </table>
        </div>
      </div>
    </div>
  );
};

export default AddCollege;
