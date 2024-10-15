import { HiHome } from "react-icons/hi";
import { GoBell } from "react-icons/go";
import { MdAccountCircle } from "react-icons/md";
import { BiHelpCircle } from "react-icons/bi";
import { FaAngleDown, FaPowerOff } from "react-icons/fa";
import { FiSettings } from "react-icons/fi";
import { AiOutlineMessage, AiOutlineHeart } from "react-icons/ai";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { BiAdjust } from "react-icons/bi";

function Header({ toggleTheme, theme, user }) {
  const [showMenu, setShowMenu] = useState(false);
  const [scroll, setScroll] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll); // Cleanup event listener
    };
  }, []);

  const handleScroll = () => {
    const offset = window.scrollY;
    setScroll(offset > 45);
  };

  return (
    <div
      className={`${
        scroll
          ? theme === "dark"
            ? "lg:container lg:mx-auto w-full flex items-center justify-around py-5 sticky top-0 z-50 bg-gray-800 rounded-lg border-b-2 border-gray-700" // Dark background when scrolling
            : "lg:container lg:mx-auto w-full flex items-center justify-around py-5 sticky top-0 z-50 bg-white rounded-lg border-b-2 border-gray-700" // Light background when scrolling
          : theme === "dark"
          ? "lg:container lg:mx-auto w-full flex items-center justify-around py-5 sticky top-0 z-50 border-b-2 border-gray-700"
          : "lg:container lg:mx-auto w-full flex items-center justify-around py-5 sticky top-0 z-50 border-b-2 border-gray-700"
      } h-16`} // Set fixed height here
    >
      {/* Logo and Search input */}
      <span className="w-auto lg:w-2/6 flex items-center justify-center relative">
        <span
          className={`lg:w-12 lg:h-10 w-7 h-7 ${
            theme === "dark" ? "bg-white" : "bg-black" // Change background based on the theme
          } rounded-3xl shadow-md mx-2 lg:mx-5 cursor-pointer flex items-center justify-center`}
          onClick={() => navigate("/")}
        >
          <span
  className={`lg:w-10 lg:h-10 w-6 h-6 rounded-full flex items-center justify-center ${
    theme === "dark" ? "bg-black" : "bg-white"
  } cursor-pointer`}
>
  <img
    src="../images/logo.PNG"
    alt="Logo"
    className="lg:w-5 lg:h-5 w-3 h-3"
  />
</span>
        </span>
        <span className="lg:mx-5 lg:flex hidden w-full">
          <input
            type="text"
            className={`hidden lg:flex w-11/12 sm:w-full md:w-1/2 h-8 outline-none border-2 text-sm shadow-2xl rounded-md ${
              theme === "dark"
                ? "bg-white-800 text-white border-white-600 placeholder-white-400" // Dark mode styles
                : "bg-white-200 text-white-800 border-white-300 placeholder-white-600" // Light mode styles
            }`}
            placeholder="Search"
          />
        </span>
        <span
          className={`absolute left-8 top-0 lg:block hidden w-1 h-6 ${
            theme === "dark" ? "bg-white" : "bg-black" // Change background color for line based on the theme
          } -rotate-45 cursor-pointer`}
          onClick={() => navigate("/")}
        ></span>
      </span>

      {/* Menu buttons */}
      <span className="w-auto lg:w-2/6 flex items-center justify-center">
        <HiHome
          className={`cursor-pointer text-lg mx-3 lg:mx-7 ${
            theme === "dark" ? "text-white" : "text-white-800"
          }`}
          onClick={() => navigate("/")}
        />
        <AiOutlineMessage
          className={`cursor-pointer text-lg mx-3 lg:mx-7 ${
            theme === "dark" ? "text-white" : "text-gray-800"
          }`}
        />
        <GoBell
          className={`cursor-pointer text-lg mx-3 lg:mx-7 ${
            theme === "dark" ? "text-white" : "text-gray-800"
          }`}
        />
        <AiOutlineHeart
          className={`cursor-pointer text-lg mx-3 lg:mx-7 ${
            theme === "dark" ? "text-white" : "text-gray-800"
          }`}
        />
      </span>

      {/* User menu */}
      <span className="w-auto md:w-2/6 flex items-center justify-start md:justify-end cursor-pointer p-1 relative z-50">
        {/* Theme toggle button */}

        <span onClick={() => setShowMenu(!showMenu)}>
          <img
            src="data:image/jpeg;base64,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" // Default image if user.url is not provided
            alt="userPic"
            className="w-9 h-5/6 object-cover rounded-lg"
          />
        </span>

        {/* Dropdown menu */}
        {showMenu && (
          <div className="absolute w-full md:w-32 h-48 shadow-xl top-11 right-11 md:-right-5 flex items-center justify-center flex-col">
            <li
              className="w-36 h-1/4 bg-white shadow flex items-center justify-start list-none px-1 text-gray-800 text-xs font-bold hover:bg-gray-200 transition-all duration-300" // Change background color for menu items
              onClick={() => {
                navigate(`/userProfile/${user.id}`); // Assuming user has an id property
                setShowMenu(false);
              }}
            >
              <MdAccountCircle fontSize={16} className="mx-2" />
              Account
            </li>
            <li
              className="w-36 h-1/4 bg-white shadow flex items-center justify-start list-none px-1 text-gray-800 text-xs font-bold hover:bg-gray-200 transition-all duration-300"
              onClick={() => setShowMenu(false)}
            >
              <BiHelpCircle fontSize={16} className="mx-2" />
              Help
            </li>
            <li
              className="w-36 h-1/4 bg-white shadow flex items-center justify-start list-none px-1 text-gray-800 text-xs font-bold hover:bg-gray-200 transition-all duration-300"
              onClick={() => setShowMenu(false)}
            >
              <FiSettings fontSize={16} className="mx-2 " />
              Setting
            </li>
            <li
              className="w-36 h-1/4 bg-white shadow flex items-center justify-start list-none px-1 text-gray-800 text-xs font-bold hover:bg-gray-200 transition-all duration-300"
              onClick={toggleTheme} 
            >
              <BiAdjust className="mx-2" /> Change Mode
            </li>
            <li
              className="w-36 h-1/4 bg-white shadow flex items-center justify-start list-none px-1 text-gray-800 text-xs font-bold hover:bg-gray-200 transition-all duration-300"
              onClick={() => {
                // Log out functionality
                console.log("User logged out");
                setShowMenu(false);
              }}
            >
              <FaPowerOff fontSize={16} className="mx-2" />
              Log Out
            </li>
          </div>
        )}
      </span>
    </div>
  );
}

export default Header;
