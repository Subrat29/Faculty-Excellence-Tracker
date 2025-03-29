// DashboardPage.js
import React from "react";

const DashboardPage = () => {
  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      {/* Welcome Banner */}
      <div className="p-6 bg-blue-500 text-white rounded-lg mb-6">
        <h1 className="text-3xl font-bold">Welcome, Student!</h1>
        <p className="text-lg mt-2">
          Here’s a quick overview of your student’s performance
        </p>
        <div className="flex mt-4 space-x-6">
          <div className="bg-white text-blue-500 p-4 rounded-lg shadow-lg">
            <h3 className="text-xl font-semibold">Total Courses</h3>
            <p className="text-2xl font-bold">4</p>
          </div>
          <div className="bg-white text-blue-500 p-4 rounded-lg shadow-lg">
            <h3 className="text-xl font-semibold">Top Performer</h3>
            <p className="text-2xl font-bold">Alex</p>
          </div>
          <div className="bg-white text-blue-500 p-4 rounded-lg shadow-lg">
            <h3 className="text-xl font-semibold">Upcomming Courses</h3>
            <p className="text-2xl font-bold">3</p>
          </div>
        </div>
      </div>

      {/* Activity Feed */}
      <div className="bg-white rounded-lg shadow p-6 mb-6">
        <h3 className="text-xl font-bold mb-4">Recent Faculty Activity</h3>
        <ul>
          <li className="mb-2">
            📄 Dr. Johnson published a paper on AI in Education.
          </li>
          <li className="mb-2">
            🏅 Dr. Smith was promoted to Senior Professor.
          </li>
          <li className="mb-2">
            📊 Department of Science achieved 90% conference participation.
          </li>
          <li className="mb-2">👥 Dr. Brown mentored 5 new PhD students.</li>
        </ul>
      </div>
    </div>
  );
};

export default DashboardPage;
