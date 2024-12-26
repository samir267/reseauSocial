import React, { useState, useEffect } from "react";
import { getLikesByPostId, removeLike, newPost, getCommentsByPostId, createComment } from "../api/postApi/api";
import { BsThreeDotsVertical } from "react-icons/bs";
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";
import { IoIosSend } from "react-icons/io";
import { FaRegCommentDots } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { format } from "timeago.js";
import { toast } from "react-toastify";

const PostContainer = styled.div`
  background: ${({ theme }) => theme.body};
  color: ${({ theme }) => theme.text};
  transition: all 0.4s ease;
  padding: 20px;
  border-radius: 10px;
`;

const Modal = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: ${({ theme }) => theme.body};
  color: ${({ theme }) => theme.text};
  width: 90%;
  max-width: 600px;
  border-radius: 10px;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.2);
  padding: 20px;
  z-index: 1000;
`;

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  z-index: 999;
`;

function SinglePost({ userID, photoURL, displayName, theme, id, disc, imageURL, createdAt }) {
  const navigate = useNavigate();
  const [isLiked, setIsLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(0);
  const [commentCount, setCommentCount] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [comments, setComments] = useState([]);
  const [commentContent, setCommentContent] = useState(""); // État pour gérer le contenu du commentaire
  const [error, setError] = useState("");

  const userId = localStorage.getItem("id");

  const toggleLike = async () => {
    try {
      if (isLiked) {
        setLikeCount(likeCount - 1); 
        setIsLiked(false);
        await removeLike(userId, id);
      } else {
        setLikeCount(likeCount + 1); 
        await newPost(id, userId);
        setIsLiked(true);
      }
    } catch (error) {
      console.error("Erreur lors du changement de like :", error);
    }
  };
  

  const fetchComments = async () => {
    try {
      const commentsData = await getCommentsByPostId(id);
      setCommentCount(commentsData.length);
      console.log("CommentsCount:", commentCount);
      setComments(commentsData); // Stockez les commentaires dans l'état
    } catch (error) {
      console.error("Error fetching comments:", error);
    }
  };

  const handleCreateComment = async () => {
    if (!commentContent.trim()) {
      setError("Comment cannot be empty!");
      return;
    }
    try {
      setCommentCount(commentCount + 1);
      const newComment = await createComment(commentContent, parseInt(userId), parseInt(id));
      setComments((prev) => [...prev, newComment]); // Ajout du nouveau commentaire à la liste existante
      toast.success("Comment added successfully!");
      setCommentContent(""); // Réinitialiser le champ du commentaire
      setError(""); // Réinitialiser les erreurs
    } catch (error) {
      setError("Failed to add comment. Please try again.");
      console.error("Error creating comment:", error);
    }
  };
  

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Récupération des likes
        const likes = await getLikesByPostId(id);
        const userHasLiked = likes.some((like) => like.userId === parseInt(userId));
        setIsLiked(userHasLiked);
        setLikeCount(likes.length);
  
        // Récupération des commentaires
        const commentsData = await getCommentsByPostId(id);
        setCommentCount(commentsData.length); // Met à jour le nombre de commentaires
        setComments(commentsData); // Charge les commentaires
      } catch (error) {
        console.error("Erreur lors de la récupération des données :", error);
      }
    };
  
    fetchData();
  }, [id, userId]); // Le fetch se fait uniquement au montage ou si `id` ou `userId` changent
  

  const handleOpenModal = async () => {
    await fetchComments(); // Chargez les commentaires lorsque le modal est ouvert
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <PostContainer>
      <div className="w-full lg:px-4 py-2 my-3 rounded-3xl flex items-center justify-center flex-col">
        {/* Header */}
        <span className="w-full flex items-center justify-center my-2">
          <span className="w-1/12 flex items-center justify-center">
            <img
              src={photoURL || " https://images.freeimages.com/fic/images/icons/2526/bloggers/256/admin.png"}
              alt="userPic"
              className="lg:w-10 lg:h-10 w-8 h-8 rounded-2xl object-cover border-2 bg-gray-500 border-gray-500 cursor-pointer"
              onClick={() => navigate(`/userProfile/${userID}`)}
            />
          </span>

          <span className="w-3/4 flex items-start justify-center flex-col">
            <h3
              className="mx-2 text-xs lg:text-sm cursor-pointer font-semibold"
              onClick={() => navigate(`/userProfile/${userID}`)}
            >
              {displayName}
            </h3>
            <span className="mx-2 text-xs flex items-center justify-center">
              <p>{createdAt}</p>
            </span>
          </span>
          <span className="w-1/12 flex items-center justify-center">
            <BsThreeDotsVertical fontSize={22} className="cursor-pointer my-2 rotate-90" />
          </span>
        </span>

        {/* Post Content */}
        <span className="w-full px-5 my-2 font-light tracking-wider break-words whitespace-normal">
          {disc}
        </span>

        {imageURL && (
          <span className="w-full object-cover px-5 my-4">
            <img src={imageURL || "https://images.freeimages.com/fic/images/icons/2526/bloggers/256/admin.png"} alt="post" className="w-full h-72 object-cover rounded-2xl" />
          </span>
        )}

        {/* Post Actions */}
        {/* Post Actions */}
<span className="w-full flex items-center justify-start px-5 my-1 border-b border-gray-700 py-3">
  {/* Like Icon and Count */}
  <div onClick={toggleLike} className="cursor-pointer mx-2 flex items-center" aria-label="Toggle like">
    {isLiked ? (
      <AiFillHeart fontSize={19} className="text-red-500" />
    ) : (
      <AiOutlineHeart fontSize={19} className="text-gray-500" />
    )}
<span className="text-sm text-gray-400 ml-1">{likeCount}</span>  </div>

  {/* Comment Icon and Count */}
  <div className="cursor-pointer mx-2 flex items-center" onClick={handleOpenModal}>
    <FaRegCommentDots fontSize={19} className="text-gray-500" />
    <span className="text-sm text-gray-400 ml-1">{commentCount}</span>  </div>
</span>


        {/* Comment Input */}
        <span className="w-full px-1 py-2 flex items-center justify-center">
          <img
            src={photoURL || "https://images.freeimages.com/fic/images/icons/2526/bloggers/256/admin.png"}
            alt="userPic"
            className="lg:w-10 lg:h-10 w-8 h-8 rounded-2xl object-cover border-2 border-gray-500 cursor-pointer"
          />
          <input
            type="text"
            placeholder="Write your comment"
            value={commentContent}
            onChange={(e) => setCommentContent(e.target.value)}
            className="w-5/6 mx-4 outline-none bg-black/20 h-9 rounded-lg text-sm px-3 placeholder:text-gray-600"
          />
          <IoIosSend fontSize={22} className="cursor-pointer text-blue-500" onClick={handleCreateComment} />
        </span>
      </div>

      {/* Comments Modal */}
     
      {isModalOpen && (
  <>
    <Overlay onClick={handleCloseModal} />
    <Modal className="max-h-[500px] max-w-[600px] overflow-y-auto p-6 bg-white rounded-lg shadow-lg">
      <h2>Commentaires</h2>
      {comments.map((comment) => (
        <div key={comment.id} className="my-4 flex items-center">
          <img
            src={comment.user.profilePhotoUrl || "https://images.freeimages.com/fic/images/icons/2526/bloggers/256/admin.png"}
            alt={comment.user.username}
            className="w-10 h-10 rounded-full mr-3"
          />
          <div>
            <h4 className="font-semibold">{comment.user.username}</h4>
            <p>{comment.content}</p>
            <span className="text-gray-500 text-xs">{format(new Date(comment.createdAt))}</span>
          </div>
        </div>
      ))}
      <button onClick={handleCloseModal} className="mt-4 bg-gray-500 text-white p-2 rounded">
        Fermer
      </button>
    </Modal>
  </>
)}

    </PostContainer>
  );
}

export default SinglePost;
