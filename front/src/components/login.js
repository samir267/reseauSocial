import React, { useState, useContext,createContext } from 'react';
import { loginApi } from '../api/userApi/api';
import '../App.css';
import '../index.css';
import login from '../images/login2.PNG';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Link } from 'react-router-dom';
import { EyeIcon, EyeOffIcon } from '@heroicons/react/outline';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await loginApi(email, password);
      console.log('Login response:', response);

      if (response.status === 200) {
        toast.success('Login successful!');
        //navigate('/home'); // Redirect to home after login

        console.log('Login successful:', response.data);
      } else {
        toast.error('Invalid credentials, please try again.');
      }
    } catch (err) {
      console.error('Login failed:', err);
      toast.error('An error occurred. Please try again.');
    }
  };

  const togglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };

  return (
    <div className={`bg-gray-100 flex justify-center items-center h-screen`}>
      <div className="w-1/2 h-screen hidden lg:block">
        <img
          src={login}
          alt="Login"
          className="object-cover w-full h-full"
        />
      </div>
      <div className="lg:p-40 h-screen md:p-52 sm:20 p-8 w-full lg:w-1/2 bg-white">
        <h1 className="text-2xl font-semibold mb-4">Login</h1>
        {error && <p className="text-red-500 mb-4">{error}</p>}
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="username" className="block text-gray-600">Username</label>
            <input
              type="text"
              id="username"
              name="email"
              required
              className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500"
              autoComplete="off"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <label htmlFor="password" className="block text-gray-600">Password</label>
            <div className="relative">
              <input
                type={isPasswordVisible ? 'text' : 'password'}
                id="password"
                name="password"
                required
                className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500 pr-10"
                autoComplete="off"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <button
                type="button"
                className="absolute inset-y-0 right-0 flex items-center pr-3"
                onClick={togglePasswordVisibility}
              >
                {isPasswordVisible ? (
                  <EyeOffIcon className="h-5 w-5 text-gray-500" />
                ) : (
                  <EyeIcon className="h-5 w-5 text-gray-500" />
                )}
              </button>
            </div>
          </div>
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-md py-2 px-4 w-full"
          >
            Login
          </button>
          <label className="block text-gray-600 mt-4 text-center">
            Have an account? <Link to="/register" className="text-blue-500">Register</Link>
          </label>
        </form>
      </div>
      <ToastContainer />
    </div>
  );
}

export default Login;
