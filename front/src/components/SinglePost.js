import { BsThreeDotsVertical } from "react-icons/bs";
import { AiOutlineHeart } from "react-icons/ai";
import { IoIosSend } from "react-icons/io";
import { FaRegCommentDots } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import React, { useState } from 'react';
import { format } from 'timeago.js';
import styled from 'styled-components';
const PostContainer = styled.div`
  background: ${({ theme }) => theme.body};
  color: ${({ theme }) => theme.text};
  transition: all 0.4s ease;
  padding: 20px;
  border-radius: 10px;
`;
function SinglePost({ id, userID, photoURL, useEmail, displayName, disc, imageURL, theme }) {
  const navigate = useNavigate();
  const [showFullText, setShowFullText] = useState(false);

  const toggleText = () => {
    setShowFullText(prev => !prev);
  };

  const currDate = new Date().toLocaleString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: true,
  });

  return (
    <PostContainer>
    <div className={`w-full lg:px-4 py-2 my-3 rounded-3xl flex items-center justify-center flex-col `} key={id}>
      {/* Post Top Section */}
      <span className="w-full flex items-center justify-center my-2">
        <span className="w-1/12 flex items-center justify-center">
          <img
            src={photoURL}
            alt="userPic"
            className="lg:w-10 lg:h-10 w-8 h-8 rounded-2xl object-cover border-2 bg-gray-500 border-gray-500 cursor-pointer"
            onClick={() => navigate(`/userProfile/${userID}`)}
          />
        </span>
        <span className="w-3/4 flex items-start justify-center flex-col">
          <h3 className={`mx-2 text-xs lg:text-sm cursor-pointer font-semibold `} onClick={() => navigate(`/userProfile/${userID}`)}>
            {displayName}
          </h3>
          <span className="mx-2 text-xs flex items-center justify-center">
            <p className={``}>{format(currDate)}</p>
          </span>
        </span>
        <span className="w-1/12 flex items-center justify-center">
          <BsThreeDotsVertical fontSize={22} className={` cursor-pointer my-2 rotate-90`} />
        </span>
      </span>

      <span className={`w-full px-5 my-2 font-light tracking-wider break-words whitespace-normal `}>
        {showFullText || disc.length <= 45 ? disc : `${disc.slice(0, 45)}...`}
        {disc.length > 45 && (
          <button onClick={toggleText} className="text-blue-500 underline ml-2">
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
      <span className={`w-full flex items-center justify-start px-5 my-1 border-b border-gray-700 py-3 `}>
        <AiOutlineHeart fontSize={19} className="mx-2 cursor-pointer" />
        <FaRegCommentDots fontSize={19} className="mx-2 cursor-pointer" />
        <IoIosSend fontSize={19} className="mx-2 cursor-pointer" />
      </span>

      {/* Comments Part */}
      <span className="w-full px-1 py-2 flex items-center justify-center">
        <img
          src={photoURL}
          alt="userPic"
          className="lg:w-10 lg:h-10 w-8 h-8 rounded-2xl object-cover border-2 border-gray-500 cursor-pointer"
        />
        <input
          type="text"
          placeholder="Write your comment"
          className={`w-5/6 mx-4 outline-none bg-black/20 h-9 rounded-lg text-sm px-3 placeholder:text-gray-600 `}
        />
      </span>
    </div>
    </PostContainer>
  );
}

export default SinglePost;
