import React, { useState, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import register from '../images/register.png'; // Adjust the image path
import { Link, useNavigate } from 'react-router-dom';
import { registerApi } from '../api/userApi/api';
import { EyeIcon, EyeOffIcon } from '@heroicons/react/outline';

function Register() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [location, setLocation] = useState('');
  const [occupation, setOccupation] = useState('');
  const [error, setError] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const navigate = useNavigate();
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
        const { status, data } = await registerApi(username, email, password, location, 'user', occupation);

        if (status === 200) {
            toast.success('Registration successful!');
            setTimeout(() => {
                navigate('/otp');
            }, 2000);
        }
    } catch (error) {
        console.error('Registration error:', error); // Log for debugging
        
        // Handle suggestions from the error
        if (error.suggestions && error.suggestions.length > 0) {
            setSuggestions(error.suggestions); // Set the suggestions in the state
            toast.error('Username already exists. Here are some suggestions:');
        } else {
            setError(error.message || 'Registration failed.');
            toast.error(error.message || 'Registration failed.');
        }
    }
};


  // Log suggestions whenever they change
  useEffect(() => {
    console.log('Updated suggestions state:', suggestions);
    console.log('Username suggestions count:', suggestions.length);
  }, [suggestions]); // Only log when suggestions change

  const togglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };

  const handleSuggestionClick = (suggestedUsername) => {
    setUsername(suggestedUsername);
    setSuggestions([]); // Clear suggestions after selection
  };

  return (
    <div className="bg-gray-100 flex justify-center items-center h-screen">
      {/* Left Part: Registration Form */}
      <div className="lg:p-36 md:p-52 sm:p-20 p-8 w-full lg:w-1/2 bg-white shadow-md rounded-md">
        <h1 className="text-2xl font-semibold mb-4 text-center">Register</h1>





        {error && <p className="text-red-500 mb-4">{error}</p>}
        <form onSubmit={handleSubmit}>
          {/* Username Input */}
          <div className="mb-4">
            <label htmlFor="username" className="block text-gray-600">Username</label>
            <input
              type="text"
              id="username"
              name="username"
              required
              className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500"
              autoComplete="off"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
{/* Displaying Username Suggestions */}
{suggestions.length > 0 && (
  <div className="mt-4">
    <h2 className="text-gray-600 mb-2">Suggestions:</h2>
    <div className="flex space-x-2">
      {suggestions.map((suggestedUsername, index) => (
        <div
          key={index}
          className="border border-gray-300 rounded-lg px-2 py-1 text-sm hover:bg-gray-200 cursor-pointer transition duration-200"
          onClick={() => handleSuggestionClick(suggestedUsername)}
        >
          {suggestedUsername}
        </div>
      ))}
    </div>
  </div>
)}

          {/* Email Input */}
          <div className="mb-4">
            <label htmlFor="email" className="block text-gray-600">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              required
              className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500"
              autoComplete="off"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          {/* Password Input */}
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

          {/* Location Input */}
          <div className="mb-4">
            <label htmlFor="location" className="block text-gray-600">Location</label>
            <input
              type="text"
              id="location"
              name="location"
              required
              className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500"
              autoComplete="off"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
            />
          </div>

          {/* Occupation Input */}
          <div className="mb-4">
            <label htmlFor="occupation" className="block text-gray-600">Occupation</label>
            <input
              type="text"
              id="occupation"
              name="occupation"
              required
              className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500"
              autoComplete="off"
              value={occupation}
              onChange={(e) => setOccupation(e.target.value)}
            />
          </div>

          {/* Register Button */}
          <button
            type="submit"
            className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition duration-200 w-full"
          >
            Register
          </button>
        </form>

        <p className="mt-4 text-center">
          Already have an account? <Link to="/login" className="text-blue-500">Login</Link>
        </p>
      </div>

      <ToastContainer />
      {/* Right Part: Registration Image */}
      <div className="hidden lg:block lg:w-1/2">
        <img src={register} alt="Register" className="w-full h-full object-cover" />
      </div>
    </div>
  );
}

export default Register;
