import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { addDepartment, fetchCollege, fetchDepartment } from '../../store/features/adminSlice'

const AddDepartment = () => {
    const [department, setDepartment] = useState([])
    const [college, setCollege] = useState([])
    const dispatch = useDispatch()
    const [data, setData] = useState({
         college_id:"",
         department_name: "",
         head_of_department: ""
    })

    async function getCollege() {
        try {
            const res = await dispatch(fetchCollege());
            if (res.payload.data) {
                console.log("Fetched data:", res.payload.data.data); // Log fetched data
                setCollege(res.payload.data.data); // Directly update state with fetched data
            } else {
                console.warn("No data found in response.");
            }
        } catch (error) {
            console.error("Error fetching colleges:", error);
        }
    }

    async function getDepartment() {
        try {
          const res = await dispatch(fetchDepartment());
          if (res.payload.data.data) {
            setDepartment(res.payload.data.data);
          }
        } catch (error) {
          console.error("Error:", error);
        }
      }
    

    function handleInput(e){
        const {name, value} = e.target
        setData({
            ...data,
            [name]: value
        })
    }

    async function onSubmit(e) {
        e.preventDefault();
        try {
            console.log(data)
            await dispatch(addDepartment(data))
            getDepartment()
        } catch (error) {
            console.error("Error occurred while submitting the form:", error);
            toast.error("An error occurred. Please try again later.");
        }
    }
    useEffect(() => {
        getCollege();
        getDepartment()
    }, []);
    
  return (
    <div>
        <div className='max-w-2xl mx-auto bg-sky-50 p-8 rounded-md mt-10 mb-20 shadow-md'>
        <h1 className='text-2xl font-semibold text-center'>Add Department</h1>
        <form className='space-y-3' onSubmit={onSubmit}>
        <div className="mb-4">
    <label
        htmlFor="college_id"
        className="text-sm font-semibold text-gray-700 block mb-2"
    >
        Select College
    </label>
    <select
        name="college_id"
        id="college_id"
        value={data.college_id}
        onChange={handleInput}
        className="px-4 py-2 w-full border border-gray-300 rounded-lg shadow-sm bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
    >
        <option value="" disabled>
            Choose college
        </option>
        {college.map((c, index) => (
            <option key={index} value={c._id}>
                {c.college_name}
            </option>
        ))}
    </select>
</div>

            <div>
                <label htmlFor='department_name' className='block text-sm mt-4 font-medium text-gray-700'>Department Name</label>
                <input 
                    type="text" 
                    id='department_name'
                    name='department_name'
                    value={data.department_name}
                    onChange={handleInput}
                    placeholder='Enter department name'
                    className='px-4 py-2 border  border-gray-300 rounded-md w-full mt-1 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500'
                />
            </div>

            <div>
                <label htmlFor='head_of_department' className='block text-sm font-medium text-gray-700'>Head of department</label>
                <input 
                    type="text" 
                    id='head_of_department'
                    name='head_of_department'
                    value={data.head_of_department}
                    onChange={handleInput}
                    placeholder='Enter head of department'
                    className='px-4 py-2 border  border-gray-300 rounded-md w-full mt-1 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500'
                />
            </div>

            <div className="text-center">
                <button
                    type="submit"
                    className="w-full bg-blue-600 mt-1 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                >
                    Add Department
                </button>
            </div>
        </form>
    </div>

    <div className="border-t-2 border-gray-200 pt-6">
                <h2 className="text-2xl font-semibold mb-4 text-center">Department List</h2>
                {department.length > 0 ? (
                    <table className="min-w-full border border-gray-200 bg-white shadow-md rounded-md">
                        <thead className="bg-gray-100 border-b">
                            <tr>
                                <th className="py-3 px-4 text-left font-medium text-gray-700">#</th>
                                <th className="py-3 px-4 text-left font-medium text-gray-700">Department Name</th>
                                <th className="py-3 px-4 text-left font-medium text-gray-700">Head of Department</th>
                            </tr>
                        </thead>
                        <tbody>
                            {department.map((d, index) => (
                                <tr key={d._id} className="border-b hover:bg-gray-50">
                                    <td className="py-3 px-4">{index + 1}</td>
                                    <td className="py-3 px-4">{d.department_name}</td>
                                    <td className="py-3 px-4">{d.head_of_department}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                ) : (
                    <p className="text-center text-gray-500 mt-6">No departments available.</p>
                )}
            </div>
    </div>
  )
}

export default AddDepartment

