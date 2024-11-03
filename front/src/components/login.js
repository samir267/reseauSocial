import React, { useState, useEffect } from 'react';
import { loginApi } from '../api/userApi/api';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Link, useNavigate } from "react-router-dom";
import { EyeIcon, EyeOffIcon } from '@heroicons/react/outline';
import { jwtDecode } from "jwt-decode";

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await loginApi(email, password);
      console.log('Login response:', response);

      if (response.status === 200) {
        const decodedToken = jwtDecode(response.data.access_token);
        console.log('Decoded token:', decodedToken);
        
        if (!decodedToken.isVerified) {
          toast.error('You must verify your email');
          navigate('/otp');
        } else {
          toast.success('Login successful!');
          localStorage.setItem('access_token', response.data.access_token);
          setIsLoggedIn(true);
        }
      } else {
        toast.error('Invalid credentials, please try again.');
      }
    } catch (err) {
      console.error('Login failed:', err);
      toast.error('Invalid credentials, please try again.');
    }
  };

  useEffect(() => {
    if (isLoggedIn) {
      navigate('/home'); // Redirect to home after successful login
    }
  }, [isLoggedIn, navigate]);

  const togglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };

  const handleFacebookLogin = () => {
    window.location.href = "http://localhost:3000/auth/facebook/callback";
  };

  // Redirect to Google authentication
  const handleGoogleLogin = () => {
    window.location.href = "http://localhost:3000/auth/google/callback";
  };

  return (
    <div className="flex lg:flex-row flex-col w-full h-screen">
      {/* Form Section */}
      <div className="lg:w-1/2 w-full h-full bg-black flex items-center justify-center py-3">
        <form className="w-full bg-black flex items-center justify-center flex-col" onSubmit={handleSubmit}>
          <div className="flex items-center justify-center flex-col w-full lg:p-4 p-1">
            <span className="w-full text-white text-center font-bold text-xl md:text-4xl my-2">
              Login
            </span>
            <input
              type="email"
              placeholder="Email"
              className="my-3 lg:w-4/5 w-11/12 h-10 rounded-md bg-gray-800 px-4 text-white outline-yellow-600"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <div className="relative w-11/12 lg:w-4/5 my-3">
              <input
                type={isPasswordVisible ? 'text' : 'password'}
                placeholder="Password"
                className="h-10 rounded-md bg-gray-800 text-white px-4 outline-yellow-600 w-full"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
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
            <input
              type="submit"
              className="my-3 lg:w-4/5 w-11/12 h-10 cursor-pointer font-bold bg-yellow-200 rounded-md"
              value={"Login"}
            />
            <span className="lg:w-4/5 w-11/12 lg:flex items-center justify-end text-sm text-gray-400">
              Don't have an account?{" "}
              <Link to="/register" className="mx-2 text-gray-200">Sign up</Link>
            </span>
            <span className="lg:w-4/5 w-11/12 lg:flex items-center justify-end text-sm text-gray-400">
              <Link to="/forgot-password" className="text-gray-200 hover:underline">Forgot Password?</Link>
            </span>
          </div>
          <span className="text-white font-bold text-base md:text-4xl my-1">OR</span>
          {/* Inline registration buttons */}
          <div className="flex flex-col items-center mt-4">
            <span className="text-sm text-gray-400 mb-2">Or register with:</span>
            <div className="flex space-x-2">
              {/* Facebook Button */}
              <button
                type="button"
                className="mb-2 inline-block rounded bg-[#1877f2] px-6 py-2.5 text-xs font-medium uppercase leading-normal text-white shadow-md transition duration-150 ease-in-out hover:shadow-lg focus:shadow-lg focus:outline-none focus:ring-0 active:shadow-lg"
                onClick={handleFacebookLogin}
              >
                <span className="[&>svg]:h-4 [&>svg]:w-4">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 320 512">
                    <path d="M80 299.3V512H196V299.3h86.5l18-97.8H196V166.9c0-51.7 20.3-71.5 72.7-71.5c16.3 0 29.4 .4 37 1.2V7.9C291.4 4 256.4 0 236.2 0C129.3 0 80 50.5 80 159.4v42.1H14v97.8H80z" />
                  </svg>
                </span>
              </button>

              {/* Google Button */}
              <button
                type="button"
                className="mb-2 inline-block rounded bg-[#ea4335] px-6 py-2.5 text-xs font-medium uppercase leading-normal text-white shadow-md transition duration-150 ease-in-out hover:shadow-lg focus:shadow-lg focus:outline-none focus:ring-0 active:shadow-lg"
                onClick={handleGoogleLogin}
              >
                <span className="[&>svg]:h-4 [&>svg]:w-4">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 488 512">
                    <path d="M488 261.8C488 403.3 391.1 504 248 504 110.8 504 0 393.2 0 256S110.8 8 248 8c66.8 0 123 24.5 166.3 64.9l-67.5 64.9C258.5 52.6 94.3 116.6 94.3 256c0 86.5 69.1 156.6 153.7 156.6 98.2 0 135-70.4 140.8-106.9H248v-85.3h236.1c-.4 1.9-6.1 24.3-17.5 44.3-12.4 22.1-30.8 38.5-53.9 48.3C377.4 445.7 308 488 248 488c-146.2 0-248-101.1-248-232S101.8 24 248 24c79.8 0 133.4 46.2 134.3 46.9 1 .9-19.3 13.1-47.5 25.1L373.2 99c-49.1-30.6-106-49-125.5-49C109.5 49 40 118.4 40 256c0 91.1 60.7 164 157.4 164 35.4 0 72-5.6 107.6-20.7 35.5-15.1 68.5-35.8 92.6-55.4 24.1-19.6 40.7-41.5 48.7-68.1h-20.3z" />
                  </svg>
                </span>
              </button>
            </div>
          </div>
        </form>
      </div>

      {/* Image Section */}
      <div className="lg:w-1/2 w-full h-full flex items-center justify-center">
        <img
          src="/assets/r.jpeg" // Replace with your image path
          alt="Description of image"
          className="object-cover h-full w-full"
        />
      </div>

      <ToastContainer />
    </div>
  );
}

export default Login;
