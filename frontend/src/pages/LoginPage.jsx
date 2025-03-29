import React from 'react';
import Login from '../components/Auth/Login';

const LoginPage = () => {
  return (
    <div className="">
      <div className="grid grid-cols-1 md:grid-cols-2">
        <div className="hidden md:block">
          <img
            src="/facultyimage2.jpeg"
            alt="student"
            className="object-cover w-full h-screen"
          />
        </div>
        <div className=''>
          {/* <h2 className="text-lg font-bold">Hackathon Credentials</h2>
          <p>Faculty: subratyadav29@gmail.com, 111</p>
          <p>Admin: anujdummy02@gmail.com, subrat@12</p> */}
          <Login />
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
