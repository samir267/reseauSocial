import React, { useState } from 'react';
import { Link } from 'react-router-dom'; // Make sure to import Link
import { forgetPasswordApi } from '../api/userApi/api.js'; // Import the new API function
import { ToastContainer, toast } from 'react-toastify';

const ForgetPassEmail = () => {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false); // State to manage loading

  // Handle input change for email
  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); // Set loading to true when submitting
    try {
      await forgetPasswordApi(email);
      toast.success('Password reset email sent successfully!'); // Show success toast
    } catch (error) {
      alert(error.message); // Show error toast
    } finally {
      setLoading(false); // Set loading to false after the request
    }
  };

  return (
    <main className="relative min-h-screen flex flex-col justify-center bg-slate-50 overflow-hidden">
      <div className="w-full max-w-6xl mx-auto px-4 md:px-6 py-24">
        <div className="flex justify-center">
          <div className="max-w-md mx-auto text-center bg-white px-4 sm:px-8 py-10 rounded-xl shadow">
            <header className="mb-8">
              <h1 className="text-2xl font-bold mb-1">Forgot Password</h1>
              <p className="text-[15px] text-slate-500">
                Enter your email address to receive a password reset link.
              </p>
            </header>
            <form onSubmit={handleSubmit}>
              <div className="mb-6">
                <input
                  type="email"
                  className="w-full px-4 py-2 text-base bg-slate-100 border border-slate-300 rounded-md outline-none focus:bg-white focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100"
                  placeholder="Enter your email address"
                  value={email}
                  onChange={handleEmailChange}
                  required
                />
              </div>
              <div className="max-w-[260px] mx-auto">
                <button
                  type="submit"
                  disabled={loading} // Disable button when loading
                  className={`w-full inline-flex justify-center whitespace-nowrap rounded-lg 
                    ${loading ? 'bg-gray-400' : 'bg-indigo-500 hover:bg-indigo-600'} 
                    px-3.5 py-2.5 text-sm font-medium text-white shadow-sm 
                    shadow-indigo-950/10 transition-colors duration-150`}
                >
                  {loading ? 'Loading...' : 'Send Reset Link'} {/* Show loading text */}
                </button>
              </div>
            </form>
            <div className="text-sm text-slate-500 mt-4">
              Remembered your password?{' '}
              <Link to="/login" className="font-medium text-indigo-500 hover:text-indigo-600">
                Login
              </Link>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default ForgetPassEmail;
