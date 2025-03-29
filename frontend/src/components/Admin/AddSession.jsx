import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addSession } from '../../store/features/adminSlice';
import toast from 'react-hot-toast';

const AddSession = () => {
    const dispatch = useDispatch()

    const [data,setData] = useState({
        session_name : '',
        start_date:'',
        end_date:'',
    })

    function handleInput(e) {
        const {name, value} = e.target;
        setData({
            ...data,
            [name]: value
        })
    }

    async function onFormSubmit(e) {
        e.preventDefault();
    
        if (!data.session_name || !data.start_date || !data.end_date) {
            toast.error("All fields are required");
            return;
        }
        try {
            // Dispatch action to add session
           dispatch(addSession(data));
        } catch (error) {
            // Enhanced error handling for better feedback
            console.error("Error occurred while submitting the form:", error);
            toast.error("An error occurred. Please try again later.");
        }
    }
    
    return (
        <div className="max-w-lg mx-auto bg-sky-50 shadow-lg rounded-lg p-8 mb-20 mt-10">
        <h1 className="text-2xl font-semibold text-center text-gray-800 mb-6">Add Session</h1>
        <form onSubmit={onFormSubmit} action="" className="space-y-6">
            {/* Session Dropdown */}
            <div>
                <label htmlFor='session_name' className='block text-sm font-medium text-gray-700'>Session name</label>
                <input 
                    type="text" 
                    name='session_name'
                    id='session_name'
                    value={data.session_name}
                    onChange={handleInput}
                    placeholder='Enter session name'
                    className='px-4 border  border-gray-300 py-2 rounded-md w-full mt-1 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500'
                />
            </div>

            <div>
                <label htmlFor='start_date' className='block text-sm font-medium text-gray-700'>Starting Year</label>
                <input 
                    type="text" 
                    id='start_date'
                    name='start_date'
                    value={data.start_date}
                    onChange={handleInput}
                    placeholder='Enter starting year'
                    className='px-4 border  border-gray-300 py-2 rounded-md w-full mt-1 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500'
                />
            </div>

            <div>
                <label htmlFor='end_date' className='block text-sm font-medium text-gray-700'>Ending year</label>
                <input 
                    type="text" 
                    id='end_date'
                    name='end_date'
                    value={data.end_date}
                    onChange={handleInput}
                    placeholder='Enter ending year'
                    className='px-4 border  border-gray-300 py-2 rounded-md w-full mt-1 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500'
                />
            </div>

            {/* Submit Button */}
            <div className="text-center">
            <button
                type="submit"
                className="w-full bg-blue-600 hover:bg-blue-500 text-white rounded-md py-2 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
                Add Session
            </button>
            </div>
        </form>
        </div>
    );
};

export default AddSession;
