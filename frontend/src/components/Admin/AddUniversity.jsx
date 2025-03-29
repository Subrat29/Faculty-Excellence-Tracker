import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { addUniversity, fetchSession } from "../../store/features/adminSlice";

const AddUniversity = () => {
  const dispatch = useDispatch();
  const [selectedSession, setSelectedSession] = useState([]);
  const [data, setData] = useState({
    university_name: '',
    address: '',
    contact_number: '',
    website: '',
    email: '',
    established_year: '',
    session: '' // Ensure this matches with the value of the session select
  });

  function handleInput(e) {
    const { name, value } = e.target;
    setData({
      ...data,
      [name]: value
    });
  }

  async function getSession() {
    try {
      const res = await dispatch(fetchSession());
      if (res.payload?.data?.data) {
        setSelectedSession(res.payload.data.data);
      } else {
        console.error("No session data found in response.");
      }
    } catch (error) {
      console.error("Error fetching session data:", error);
    }
  }

  function onSubmit(e) {
    e.preventDefault();
    console.log(data);
    try {
      // Dispatch action to add university
      dispatch(addUniversity(data)); // Uncomment when ready to handle submission
    } catch (error) {
      console.error("Error occurred while submitting the form:", error);
      toast.error("An error occurred. Please try again later.");
    }
  }

  useEffect(() => {
    getSession();
  }, []);

  return (
    <div className="max-w-2xl mx-auto bg-sky-50 p-6 rounded-lg shadow-md">
      <h1 className="text-2xl font-semibold mb-6 text-gray-800 text-center">
        Add University
      </h1>
      <form onSubmit={onSubmit} className="space-y-4">

          {/* Session ID */}
          <div>
          <label htmlFor="session" className="text-sm block font-medium text-gray-700">
            Select Session
          </label>
          <select
            className="px-4 py-2 border w-full mt-1 border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            value={data.session} // Bind to the selected session
            id="session"
            name="session" // Corrected to match the state key
            onChange={handleInput}
          >
            <option value="" disabled>
              Select a session
            </option>
            {selectedSession.map((s, index) => (
              <option key={index} value={s._id}>
                {s.session_name}
              </option>
            ))}
          </select>
        </div>

        {/* University Name */}
        <div>
          <label htmlFor="university_name" className="block text-sm font-medium text-gray-700">
            University Name
          </label>
          <input
            type="text"
            id="university_name"
            name="university_name"
            value={data.university_name}
            onChange={handleInput}
            placeholder="Enter university name"
            className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        {/* Address */}
        <div>
          <label htmlFor="address" className="block text-sm font-medium text-gray-700">
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

        {/* Contact Number */}
        <div>
          <label htmlFor="contact_number" className="block text-sm font-medium text-gray-700">
            Contact Number
          </label>
          <input
            id="contact_number"
            name="contact_number"
            value={data.contact_number}
            onChange={handleInput}
            type="text"
            placeholder="Enter contact number"
            className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        {/* Email */}
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700">
            Email
          </label>
          <input
            id="email"
            name="email"
            value={data.email}
            onChange={handleInput}
            type="email"
            placeholder="Enter email"
            className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        {/* Website */}
        <div>
          <label htmlFor="website" className="block text-sm font-medium text-gray-700">
            Website
          </label>
          <input
            id="website"
            name="website"
            value={data.website}
            onChange={handleInput}
            type="text"
            placeholder="Enter website URL"
            className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        {/* Established Year */}
        <div>
          <label htmlFor="established_year" className="block text-sm font-medium text-gray-700">
            Established Year
          </label>
          <input
            id="established_year"
            name="established_year"
            value={data.established_year}
            onChange={handleInput}
            type="text"
            placeholder="e.g., 2024-2025"
            className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        {/* Submit Button */}
        <div className="text-center">
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            Add University
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddUniversity;
