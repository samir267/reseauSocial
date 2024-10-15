/* eslint-disable react/prop-types */
import { BsThreeDotsVertical } from "react-icons/bs";
import { AiOutlineHeart } from "react-icons/ai";
import { IoIosSend } from "react-icons/io";
import { FaRegCommentDots } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import React,{useState} from 'react';
import { format } from 'timeago.js';

function SinglePost({ id, userID, photoURL, useEmail, displayName, disc, imageURL,theme }) {
  const navigate = useNavigate();
  const [showFullText, setShowFullText] = useState(false);

  const toggleText = () => {
    setShowFullText(!showFullText);
  };
  const currDate = new Date().toLocaleString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: true, // Use 12-hour format, change to false for 24-hour format
  });

  return (
    <div
      className={`${theme === "dark" ? "text-white" : "text-black"}  w-full lg:px-4 py-2 my-3 rounded-3xl flex items-center justify-center flex-col`}
      key={id}
    >
      {/* Post Top Section */}
      <span className="w-full flex items-center justify-center my-2">
        <span className="w-1/12 flex items-center justify-center">
          <img
            src={photoURL }
            alt="userPic"
            className="lg:w-10 lg:h-10 w-8 h-8 rounded-2xl object-cover border-2 bg-gray-500 border-gray-500 cursor-pointer"
            onClick={() => navigate(`/userProfile/${userID}`)}
          />
        </span>
        <span className={`  w-3/4 flex items-start justify-center flex-col`}>
         

        <h3
  className="mx-2 text-gray-200 text-xs lg:text-sm cursor-pointer font-semibold"
  onClick={() => navigate(`/userProfile/${userID}`)}
>
  {displayName}
</h3>
<span className="mx-2 text-xs text-white flex items-center justify-center">
<p>{format(currDate)}</p>
</span>

        </span>
        <span className="w-1/12 flex items-center justify-center">
          <BsThreeDotsVertical fontSize={22} className="text-white cursor-pointer my-2 rotate-90" />
        </span>
      </span>

      <span className="text-white text-[8px] lg:text-xs w-full px-5 my-2 font-light tracking-wider break-words whitespace-normal">
  {showFullText || disc.length <= 45
    ? disc
    : `${disc.slice(0, 45)}...`}

  {/* Show "Show more" only if text exceeds 45 characters */}
  {disc.length > 45 && (
    <button
      onClick={toggleText}
      className="text-blue-500 underline ml-2"
    >
      {showFullText ? "Show less" : "Show more"}
    </button>
  )}
</span>


      {/* Post Image Section */}
      <span className="w-full object-cover px-5 my-4">
        <img
          src={imageURL}
          alt="post"
          className="w-full h-72 object-cover rounded-2xl"
        />
      </span>

      {/* Like Comment Section */}
      <span className="w-full flex items-center justify-start text-white px-5 my-1 border-b border-gray-700 py-3">
        <AiOutlineHeart fontSize={19} className="mx-2 cursor-pointer" />
        <FaRegCommentDots fontSize={19} className="mx-2 cursor-pointer" />
        <IoIosSend fontSize={19} className="mx-2 cursor-pointer" />
      </span>

      {/* Comments Part */}
      <span className="w-full px-1 py-2 flex items-center justify-center">
        <img
          src={photoURL }
          alt="userPic"
          className="lg:w-10 lg:h-10 w-8 h-8 rounded-2xl object-cover border-2 border-gray-500 cursor-pointer"
        />
        <input
          type="text"
          placeholder="Write your comment"
          className="w-5/6 mx-4 text-gray-200 outline-none bg-black/20 h-9 rounded-lg text-sm px-3 placeholder:text-gray-600"
        />
      </span>
    </div>
  );
}

export default SinglePost;
