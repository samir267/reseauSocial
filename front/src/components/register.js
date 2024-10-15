import { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import register from "../images/register.png"; // Adjust the image path
import { Link, useNavigate } from "react-router-dom";
import { registerApi } from "../api/userApi/api"; // Adjust import based on your API structure
import { EyeIcon, EyeOffIcon } from "@heroicons/react/outline";

function Register() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [location, setLocation] = useState("");
  const [occupation, setOccupation] = useState("");
  const [error, setError] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const navigate = useNavigate();
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  // Submit form data to the registration API
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { status, data } = await registerApi(
        username,
        email,
        password,
        location,
        "user",
        occupation
      );

      if (status === 200) {
        toast.success("Registration successful!");
        setTimeout(() => {
          navigate("/otp");
        }, 2000);
      }
    } catch (error) {
      console.error("Registration error:", error);
      if (error.suggestions && error.suggestions.length > 0) {
        setSuggestions(error.suggestions);
        toast.error("Username already exists. Here are some suggestions:");
      } else {
        setError(error.message || "Registration failed.");
        toast.error(error.message || "Registration failed.");
      }
    }
  };

  useEffect(() => {
    console.log("Updated suggestions state:", suggestions);
  }, [suggestions]);

  // Toggle password visibility
  const togglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };

  // Set the suggested username
  const handleSuggestionClick = (suggestedUsername) => {
    setUsername(suggestedUsername);
    setSuggestions([]);
  };

  return (
    <div className="bg-gray-100 flex justify-center items-center h-screen">
      {/* Left Part: Registration Form */}
      <div className="lg:p-36 md:p-52 sm:p-20 p-8 w-full lg:w-1/2 bg-white shadow-md rounded-md">
        <h1 className="text-2xl font-semibold mb-4 text-center">Register</h1>

        {error && <p className="text-red-500 mb-4">{error}</p>}
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="username" className="block text-gray-600">
              Username
            </label>
            <input
              type="text"
              id="username"
              required
              className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>

          {suggestions.length > 0 && (
            <div className="mt-4">
              <h2 className="text-gray-600 mb-2">Suggestions:</h2>
              <div className="flex space-x-2">
                {suggestions.map((suggestedUsername, index) => (
                  <div
                    key={index}
                    className="border border-gray-300 rounded-lg px-2 py-1 text-sm hover:bg-gray-200 cursor-pointer"
                    onClick={() => handleSuggestionClick(suggestedUsername)}
                  >
                    {suggestedUsername}
                  </div>
                ))}
              </div>
            </div>
          )}

          <div className="mb-4">
            <label htmlFor="email" className="block text-gray-600">
              Email
            </label>
            <input
              type="email"
              id="email"
              required
              className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="mb-4">
            <label htmlFor="password" className="block text-gray-600">
              Password
            </label>
            <div className="relative">
              <input
                type={isPasswordVisible ? "text" : "password"}
                id="password"
                required
                className="w-full border border-gray-300 rounded-md py-2 px-3 pr-10 focus:outline-none focus:border-blue-500"
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

          <div className="mb-4">
            <label htmlFor="location" className="block text-gray-600">
              Location
            </label>
            <input
              type="text"
              id="location"
              required
              className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
            />
          </div>

          <div className="mb-4">
            <label htmlFor="occupation" className="block text-gray-600">
              Occupation
            </label>
            <input
              type="text"
              id="occupation"
              required
              className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500"
              value={occupation}
              onChange={(e) => setOccupation(e.target.value)}
            />
          </div>

          <button
            type="submit"
            className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 w-full"
          >
            Register
          </button>
        </form>

        <p className="mt-4 text-center">
          Already have an account?{" "}
          <Link to="/login" className="text-blue-500">
            Login
          </Link>
        </p>

        {/* Social Login Buttons */}
        <div className="mt-6">
          <p className="text-center text-gray-600">Or register with:</p>
          <div className="flex justify-center space-x-4 mt-4">
            <button
              className="bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition duration-200 w-full"
              onClick={() =>
                (window.location.href = "http://localhost:3000/auth/facebook/callback")
              }
            >
              Register with Facebook
            </button>
            <button
              className="bg-red-500 text-white py-2 px-4 rounded-md hover:bg-red-600 transition duration-200 w-full"
              onClick={() =>
                (window.location.href = "http://localhost:3000/auth/google/callback")
              }
            >
              Register with Google
            </button>
          </div>
        </div>
      </div>

      <ToastContainer />

      <div className="hidden lg:block lg:w-1/2">
        <img src={register} alt="Register" className="w-full h-full object-cover" />
      </div>
    </div>
  );
}

export default Register;
