import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // Import useNavigate

const Index = () => {
  const [registerData, setRegisterData] = useState({
    fullname: '',
    email: '',
    password: '',
  });


  const [loginData, setLoginData] = useState({
    email: '',
    password: '',
  });

  const [registerErrorMessage, setRegisterErrorMessage] = useState('');
  const [loginErrorMessage, setLoginErrorMessage] = useState('');

  const navigate = useNavigate(); // Initialize useNavigate hook for redirection

  // Handle registration form data changes
  const handleRegisterInputChange = (e) => {
    const { name, value } = e.target;
    setRegisterData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Handle login form data changes
  const handleLoginInputChange = (e) => {
    const { name, value } = e.target;
    setLoginData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Handle registration form submission
  const handleRegisterSubmit = async (e) => {
    e.preventDefault();
    
    try {
      const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/users/register`, registerData);
      console.log('Registration successful:');
      setRegisterErrorMessage(`${response.data}`); // Set success message or handle as per response
    } catch (error) {
      console.error('Registration error:', error);
      setRegisterErrorMessage('Registration failed. Please try again.');
    }
  };

  // Handle login form submission
  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    
    try {
      const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/users/login`, loginData);
      console.log('Login successful:');
      setLoginErrorMessage(''); // Clear any error messages
      
      // Redirect to the /shop route after successful login
      navigate('/shop'); // Use navigate to redirect to /shop
    } catch (error) {
      console.error('Login error:', error);
      setLoginErrorMessage('Login failed. Please try again.');
    }
  };

  return (
    <div className="flex flex-col lg:flex-row items-center justify-center min-h-screen px-5 lg:px-20 bg-gray-100">
      {/* Registration Section */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-5">
        <div className="w-full max-w-md bg-white shadow-lg rounded-lg p-8">
          <h3 className="text-3xl font-bold mb-4 text-center text-blue-500">
            Welcome to <span className="font-semibold">Scatch</span>
          </h3>
          <h4 className="text-lg text-gray-600 mb-6 text-center">Create your account</h4>
          <form onSubmit={handleRegisterSubmit} autoComplete="off" className="space-y-4">
            <input
              className="bg-gray-100 block w-full px-4 py-3 border rounded-lg border-gray-300 text-lg focus:ring focus:ring-blue-200"
              type="text"
              placeholder="Full Name"
              name="fullname"
              value={registerData.fullname}
              onChange={handleRegisterInputChange}
            />
            <input
              className="bg-gray-100 block w-full px-4 py-3 border rounded-lg border-gray-300 text-lg focus:ring focus:ring-blue-200"
              type="email"
              placeholder="Email"
              name="email"
              value={registerData.email}
              onChange={handleRegisterInputChange}
            />
            <input
              className="bg-gray-100 block w-full px-4 py-3 border rounded-lg border-gray-300 text-lg focus:ring focus:ring-blue-200"
              type="password"
              placeholder="Password"
              name="password"
              value={registerData.password}
              onChange={handleRegisterInputChange}
            />
            {registerErrorMessage && (
              <div className="text-red-500 text-center">{registerErrorMessage}</div>
            )}
            <input
              className="w-full bg-blue-500 text-white py-3 rounded-lg text-lg font-medium hover:bg-blue-600 cursor-pointer"
              type="submit"
              value="Create My Account"
            />
          </form>
        </div>
      </div>

      {/* Login Section */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-5">
        <div className="w-full max-w-md bg-white shadow-lg rounded-lg p-8">
          <h4 className="text-2xl font-bold mb-6 text-center text-gray-700">Login to Your Account</h4>
          <form onSubmit={handleLoginSubmit} autoComplete="off" className="space-y-4">
            <input
              className="bg-gray-100 block w-full px-4 py-3 border rounded-lg border-gray-300 text-lg focus:ring focus:ring-blue-200"
              type="email"
              placeholder="Email"
              name="email"
              value={loginData.email}
              onChange={handleLoginInputChange}
            />
            <input
              className="bg-gray-100 block w-full px-4 py-3 border rounded-lg border-gray-300 text-lg focus:ring focus:ring-blue-200"
              type="password"
              placeholder="Password"
              name="password"
              value={loginData.password}
              onChange={handleLoginInputChange}
            />
            {loginErrorMessage && (
              <div className="text-red-500 text-center">{loginErrorMessage}</div>
            )}
            <input
              className="w-full bg-blue-500 text-white py-3 rounded-lg text-lg font-medium hover:bg-blue-600 cursor-pointer"
              type="submit"
              value="Login"
            />
          </form>
        </div>
      </div>
    </div>
  );
};

export default Index;
