import React, { useState, useEffect, useRef } from 'react';
import {verificationCodeApi,resendCodeApi} from '../api/userApi/api';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const OTPForm = () => {
  const navigate = useNavigate();

  const [otp, setOtp] = useState(new Array(4).fill(''));
  const [isValid, setIsValid] = useState(new Array(4).fill(null)); // Track validity of each input
  const inputRefs = useRef([]);

  // Handle input change
  const handleInputChange = (e, index) => {
    const value = e.target.value;
    const newOtp = [...otp];
    const newIsValid = [...isValid];

    if (/^[0-9]{1}$/.test(value)) {
      newOtp[index] = value;
      newIsValid[index] = true; // Valid input
      setOtp(newOtp);
      setIsValid(newIsValid);

      if (index < inputRefs.current.length - 1) {
        inputRefs.current[index + 1].focus();
      }
    } else {
      newIsValid[index] = false; // Invalid input (not a digit)
      setIsValid(newIsValid);
    }
  };

  // Handle backspace or delete
  const handleKeyDown = (e, index) => {
    if (e.key === 'Backspace' || e.key === 'Delete') {
      const newOtp = [...otp];
      newOtp[index] = '';
      setOtp(newOtp);
      if (index > 0) {
        inputRefs.current[index - 1].focus();
      }
    }
  };

  // Handle paste event
  const handlePaste = (e) => {
    const text = e.clipboardData.getData('text');
    if (/^\d{4}$/.test(text)) {
      const digits = text.split('');
      setOtp(digits);
      inputRefs.current[3].focus(); // Focus last input after pasting
    }
  };

  // Handle focus (select all text on focus)
  const handleFocus = (e) => e.target.select();
  const email = localStorage.getItem('email');

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    const otpValue = otp.join('');
    console.log('OTP submitted:', otpValue);
    console.log('Email retrieved from local storage:', email);

    verificationCodeApi(email, otpValue).then((response) => {
        if (response.status === 201) {
          toast.success("activation successfully !");
          setTimeout(() => {
            navigate("/home");
          }, 2000);

        } else {
            console.error('OTP verification failed:', response.data);
        }
    }).catch((error) => {
        console.error('Error during OTP verification:', error);
    });
};


const onHandleReset = () => {
  resendCodeApi(email).then((response) => {
    if (response && response.ok) {
      toast.success("Code resent successfully, verify your email!");
    } else {
      toast.error("Failed to resend code. Please try again.");
    }
  }).catch((error) => {
    console.error('Error in resend code:', error);
    toast.error("An error occurred. Please try again.");
  });
};

  

  // Check if OTP is valid
  const isFormValid = otp.every((digit) => /^[0-9]$/.test(digit));

  return (
    <main className="relative min-h-screen flex flex-col justify-center bg-slate-50 overflow-hidden">
      <div className="w-full max-w-6xl mx-auto px-4 md:px-6 py-24">
        <div className="flex justify-center">
          <div className="max-w-md mx-auto text-center bg-white px-4 sm:px-8 py-10 rounded-xl shadow">
            <header className="mb-8">
              <h1 className="text-2xl font-bold mb-1">Code Verification</h1>
              <p className="text-[15px] text-slate-500">
                Enter the 4-digit verification code that was sent to your email.
              </p>
            </header>
            <form onSubmit={handleSubmit}>
              <div className="flex items-center justify-center gap-3" onPaste={handlePaste}>
                {otp.map((digit, index) => (
                  <input
                    key={index}
                    type="text"
                    className={`w-16 h-14 text-center text-2xl font-extrabold bg-slate-100 border ${
                      isValid[index] === null
                        ? 'border-transparent'
                        : isValid[index]
                        ? 'border-green-500'
                        : 'border-red-500'
                    } rounded p-4 outline-none focus:bg-white focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100`}
                    maxLength="1"
                    value={digit}
                    onChange={(e) => handleInputChange(e, index)}
                    onKeyDown={(e) => handleKeyDown(e, index)}
                    onFocus={handleFocus}
                    ref={(el) => (inputRefs.current[index] = el)}
                  />
                ))}
              </div>
              <div className="max-w-[260px] mx-auto mt-4">
                <button
                  type="submit"
                  className="w-full inline-flex justify-center whitespace-nowrap rounded-lg bg-indigo-500 px-3.5 py-2.5 text-sm font-medium text-white shadow-sm shadow-indigo-950/10 hover:bg-indigo-600 focus:outline-none focus:ring focus:ring-indigo-300 transition-colors duration-150"
                  disabled={!isFormValid} // Disable button if form is not valid
                >
                  Verify Account
                </button>
              </div>
            </form>
            <div className="text-sm text-slate-500 mt-4">
              Didn't receive code?{' '}
              <a className="font-medium text-indigo-500 hover:text-indigo-600" href="#0"
              onClick={onHandleReset}
              >
                Resend
              </a>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default OTPForm;
