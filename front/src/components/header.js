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
        {/* <span
          className={`lg:w-12 lg:h-10 w-7 h-7 ${
            theme === "dark" ? "bg-white" : "bg-black" // Change background based on the theme
          } rounded-3xl shadow-md mx-2 lg:mx-5 cursor-pointer flex items-center justify-center`}
          onClick={() => navigate("/")}
        > */}
          {/* <span
  className={`lg:w-10 lg:h-10 w-6 h-6 rounded-full flex items-center justify-center ${
    theme === "dark" ? "bg-black" : "bg-white"
  } cursor-pointer`}
>
  <img
    src="/assets/logo.png"
    alt="Logo"
    className="lg:w-5 lg:h-5 w-3 h-3"
  /> */}
{/* </span> */}
        {/* </span> */}
        {/* <span className="lg:mx-5 lg:flex hidden w-full">
          <input
            type="text"
            className={`hidden lg:flex w-11/12 sm:w-full md:w-1/2 h-8 outline-none border-2 text-sm shadow-2xl rounded-md ${
              theme === "dark"
                ? "bg-white-800 text-white border-white-600 placeholder-white-400" // Dark mode styles
                : "bg-white-200 text-white-800 border-white-300 placeholder-white-600" // Light mode styles
            }`}
            placeholder="Search"
          />
        </span> */}
        {/* <span
          className={`absolute left-8 top-0 lg:block hidden w-1 h-6 ${
            theme === "dark" ? "bg-white" : "bg-black" // Change background color for line based on the theme
          } -rotate-45 cursor-pointer`}
          onClick={() => navigate("/")}
        ></span> */}
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
            src="https://images.freeimages.com/fic/images/icons/2526/bloggers/256/admin.png"
            alt="userPic"
            className="w-9 h-5/6 object-cover rounded-lg"
          />
        </span>

        {/* Dropdown menu */}
        {showMenu && (
          <div className="absolute w-full md:w-32 h-48 shadow-xl top-11 right-11 md:-right-5 flex items-center justify-center flex-col">
            {/* <li
              className="w-36 h-1/4 bg-white shadow flex items-center justify-start list-none px-1 text-gray-800 text-xs font-bold hover:bg-gray-200 transition-all duration-300" // Change background color for menu items
              onClick={() => {
                navigate(`/userProfile/${user.id}`); // Assuming user has an id property
                setShowMenu(false);
              }}
            >
              <MdAccountCircle fontSize={16} className="mx-2" />
              Account
            </li> */}
            {/* <li
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
            </li> */}
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
                localStorage.clear()
                navigate('/')
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
