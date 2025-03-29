import React from "react";
import AdminSidebar from "../components/Admin/AdminSidebar";
import AdminHeader from "../components/Admin/AdminHeader";
import { Route, Routes } from "react-router-dom";
import DashboardContent from "../components/Admin/DashboardContent";
import AppraisalList from "../components/Admin/AppraisalList";
import ReviewSubmissions from "../components/Admin/ReviewSubmissions";
import Stats from "../components/Admin/Stats";
import AdminProfileManagement from "../components/Admin/AdminProfileManagement";

const AdminDashboardPage = () => {
   return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <div className="bg-gray-800 text-white">
        <AdminSidebar />
      </div>

      {/* Main Content Area */}
      <div className="flex-1 overflow-hidden">
        <AdminHeader />

        {/* Routes */}
        <div className="p-4 overflow-x-auto">
          <Routes>
            <Route path="/" element={<DashboardContent />} />
            <Route path="appraisals" element={<AppraisalList />} />
            <Route path="review" element={<ReviewSubmissions />} />
            <Route path="faculty-stats" element={<Stats />} />
            <Route path="profile" element={<AdminProfileManagement />} />
          </Routes>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboardPage;
