import React from 'react';
import { Link } from 'react-router-dom';
import {
  HomeIcon,
  DocumentSearchIcon,
  UserIcon,
  ChartBarIcon,
  GiftIcon,
  DocumentIcon,
} from '@heroicons/react/outline';

import { FaTrophy } from 'react-icons/fa';

export default function Sidebar() {
  return (
    <div className="bg-gray-800 text-white p-6 min-h-screen h-full sticky top-0">
      <div className="text-2xl font-bold mb-6 border-b border-gray-700 pb-2">
        Faculty Dashboard
      </div>
      <ul className="flex-1 space-y-4">
        <li>
          <Link to="/faculty-dashboard" className="flex items-center p-3 rounded hover:bg-gray-700 transition duration-200">
            <HomeIcon className="w-6 h-6 mr-3" />
            Dashboard
          </Link>
        </li>

        <li>
          <Link to="/faculty-dashboard/profile" className="flex items-center p-3 rounded hover:bg-gray-700 transition duration-200">
            <UserIcon className="w-6 h-6 mr-3" />
            Profile Management
          </Link>
        </li>
        <li>
          <Link to="/faculty-dashboard/appraisal-form" className="flex items-center p-3 rounded hover:bg-gray-700 transition duration-200">
            <DocumentSearchIcon className="w-6 h-6 mr-3" />
            Appraisal
          </Link>
        </li>
        <li>
          <Link to="/faculty-dashboard/detailed-analysis" className="flex items-center p-3 rounded hover:bg-gray-700 transition duration-200">
            <DocumentIcon className="w-6 h-6 mr-3" />
            Detailed Analysis
          </Link>
        </li>
        <li>
          <Link to="/faculty-dashboard/performance" className="flex items-center p-3 rounded hover:bg-gray-700 transition duration-200">
            <ChartBarIcon className="w-6 h-6 mr-3" />
            Performance Chart
          </Link>
        </li>
        <li>
          <Link to="/faculty-dashboard/leaderboard" className="flex items-center p-3 rounded hover:bg-gray-700 transition duration-200">
            <FaTrophy className="w-6 h-6 mr-3" />
            Leaderboard
          </Link>
        </li>
        <li>
          <Link to="/faculty-dashboard/incentives" className="flex items-center p-3 rounded hover:bg-gray-700 transition duration-200">
            <GiftIcon className="w-6 h-6 mr-3" />
            Incentives
          </Link>
        </li>
        {/* <li>
          <Link to="/faculty-dashboard/integration" className="flex items-center p-3 rounded hover:bg-gray-700 transition duration-200">
            <PuzzleIcon className="w-6 h-6 mr-3" />
            Integration Tools
          </Link>
        </li> */}
        {/* <li>
          <Link to="/faculty-dashboard/collaboration-tools" className="flex items-center p-3 rounded hover:bg-gray-700 transition duration-200">
            <UsersIcon className="w-6 h-6 mr-3" />
            Collaboration Hub
          </Link>
        </li> */}
        {/* <li>
          <Link to="/faculty-dashboard/career-path" className="flex items-center p-3 rounded hover:bg-gray-700 transition duration-200">
            <BriefcaseIcon className="w-6 h-6 mr-3" />
            Career Path
          </Link>
        </li> */}
      </ul>
    </div>
  );
}