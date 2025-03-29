import React from 'react';
import { Routes, Route, Link } from 'react-router-dom'; // Import necessary components
import Register from '../components/Auth/Register'; // Your Register component

const RegisterPage = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2">
      <div className="hidden md:block">
        <img
          src="/facultyimage2.jpeg"
          alt="student"
          className="object-cover w-full h-screen"
        />
      </div>
      <div>
        <Routes>
          <Route path="/" element={<Register role="student" />} />
          <Route path=":role" element={<Register />} />
        </Routes>
      </div>
    </div>
  );
};

export default RegisterPage;
