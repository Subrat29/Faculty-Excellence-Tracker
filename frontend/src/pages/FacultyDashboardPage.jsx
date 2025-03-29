import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from '../components/Faculty/Navbar';
import Sidebar from '../components/Faculty/Sidebar';
import FacultyDashboard from '../components/Faculty/FacultyDashboard';
import ProfileManagement from '../components/Faculty/ProfileManagement';
import PerformanceChart from '../components/Faculty/PerformanceChart';
import PastAppraisalHistory from '../components/Faculty/PastAppraisalHistory';
import DetailedAnalysis from '../components/Faculty/DetailedAnalysis';
import FacultyLeaderboard from '../components/Faculty/FacultyLeaderboard';
import CareerPath from '../components/Faculty/CareerPath';
import CollaborationTools from '../components/Faculty/CollaborationTools';
import Incentive from '../components/Faculty/Incentive';
import IntegrationTools from '../components/Faculty/IntegrationTools';
import Appraisal from '../components/Faculty/Appraisal';

const FacultyDashboardPage = () => {

  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1">
        <Navbar />
        <div className="p-4">
          <Routes>
            <Route path="/" element={<FacultyDashboard />} />
            <Route path="/profile" element={<ProfileManagement />} />
            <Route path="/appraisal-form" element={<Appraisal/>} />
            <Route path="/performance" element={<PerformanceChart />} />
            <Route path="/past-appraisals" element={<PastAppraisalHistory />} />
            <Route path="/detailed-analysis" element={<DetailedAnalysis />} />
            <Route path="/leaderboard" element={<FacultyLeaderboard />} />
            <Route path="/career-path" element={<CareerPath />} />
            <Route path="/collaboration-tools" element={<CollaborationTools />} />
            <Route path="/incentives" element={<Incentive />} />
            <Route path="/integration" element={<IntegrationTools />} />
          </Routes>
        </div>
      </div>
    </div>
  );
};

export default FacultyDashboardPage;