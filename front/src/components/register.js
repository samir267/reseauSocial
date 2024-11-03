import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { registerApi } from "../api/userApi/api"; // Adjust import based on your API structure

function Register() {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [location, setLocation] = useState("");
  const [occupation, setOccupation] = useState("");
  const [error, setError] = useState(null);
  const [suggestions, setSuggestions] = useState([]);
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  // Submit form data to the registration API
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null); // Reset any previous errors

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
  
  const handleFacebookLogin = () => {
    window.location.href = "http://localhost:3000/auth/facebook/callback";
  };

  // Redirect to Google authentication
  const handleGoogleLogin = () => {
    window.location.href = "http://localhost:3000/auth/google/callback";
  };

  return (
    <div className="flex lg:flex-row flex-col lg:w-full lg:h-screen w-full h-auto bg-black">
      {/* Registration Form Section */}
      <div className="lg:w-1/2 w-full h-full flex items-center justify-center py-3">
        <form
          className="w-full bg-black flex items-center justify-center flex-col"
          onSubmit={handleSubmit}
        >
          <div className="flex items-center justify-center flex-col w-full lg:p-4 p-1">
            <span className="w-full text-white text-center font-bold text-xl md:text-4xl my-2">
              Sign Up
            </span>
            {error && <p className="text-red-500">{error}</p>} {/* Display error message */}

            <input
              type="text"
              placeholder="Username"
              className="my-3 lg:w-4/5 w-11/12 h-10 rounded-md bg-gray-800 px-4 text-white outline-yellow-600"
              onChange={(e) => setUsername(e.target.value)}
              value={username}
              required
            />

            {suggestions.length > 0 && (
              <div className="mt-2">
                <h2 className="text-gray-400">Suggestions:</h2>
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

            <input
              type="email"
              placeholder="Email"
              className="my-3 lg:w-4/5 w-11/12 h-10 rounded-md bg-gray-800 px-4 text-white outline-yellow-600"
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              required
            />

            <input
              type={isPasswordVisible ? "text" : "password"}
              placeholder="Password"
              className="my-3 lg:w-4/5 w-11/12 h-10 rounded-md bg-gray-800 text-white px-4 outline-yellow-600"
              onChange={(e) => setPassword(e.target.value)}
              value={password}
              required
            />

            <input
              type="text"
              placeholder="Location"
              className="my-3 lg:w-4/5 w-11/12 h-10 rounded-md bg-gray-800 px-4 text-white outline-yellow-600"
              onChange={(e) => setLocation(e.target.value)}
              value={location}
              required
            />

            <input
              type="text"
              placeholder="Occupation"
              className="my-3 lg:w-4/5 w-11/12 h-10 rounded-md bg-gray-800 px-4 text-white outline-yellow-600"
              onChange={(e) => setOccupation(e.target.value)}
              value={occupation}
              required
            />

            <input
              type="submit"
              className="my-3 lg:w-4/5 w-11/12 h-10 cursor-pointer font-bold bg-yellow-200 rounded-md"
              value={"Create Account"}
            />
            <span className="lg:w-4/5 w-11/12 lg:flex items-center justify-end text-sm text-gray-400">
              Have an account? 
              <Link to="/" className="mx-2 text-gray-200 hover:text-white transition duration-200">
                Login
              </Link>
            </span>

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
          </div>
        </form>
      </div>

      {/* Image Section */}
      <div className="lg:w-1/2 w-full h-full flex items-center justify-center">
  <img
    src="/assets/r.jpeg" // Correct path
    alt="Registration"
    className="object-cover w-full h-full"
  />
</div>

      <ToastContainer />
    </div>
  );
}

export default Register;
