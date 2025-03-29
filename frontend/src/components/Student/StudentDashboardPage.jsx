import React from "react";
import StudentHeader from "../Admin/AdminHeader";
import { Route, Routes } from "react-router-dom";
import StudentDashboardContent from "../Student/StudentDashboardContent";
import Profile from "./Profile";
import FeedbackForm from "./FeedbackForm";
import StudentSidebar from "./StudentSidebar"

const StudentDashboardPage = () => {
  return (
    <div className="flex">
      <StudentSidebar />
      <div className="flex-1">
        <StudentHeader />
        <div className="p-4">
          <Routes>
            <Route path="/" element={<StudentDashboardContent />} />
            {<Route path="profile" element={<Profile />} />}
            {<Route path="feedback-Form" element={<FeedbackForm />} />}
          </Routes>
        </div>
      </div>
    </div>
  );
};

export default StudentDashboardPage;
