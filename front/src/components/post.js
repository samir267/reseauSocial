import { useState, useEffect } from "react";
import SinglePost from "./SinglePost";
import { getUserPosts,getCommentsByPostId,getPosts } from "../api/postApi/api";
import { format } from 'timeago.js';  // Assurez-vous que cela est en haut de votre fichier

function Post({ theme }) {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const id = localStorage.getItem("id");


  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const userPosts = await getPosts();
        console.log("Posts:", userPosts);
        setPosts(userPosts);
      } catch (error) {
        console.error("Erreur lors du chargement des posts :", error);
        setError("Error fetching posts.");
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, [id]); // The dependency ensures fetching is done correctly when 'id' changes

  if (loading) {
    return <p>Chargement des posts...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div className="w-full lg:w-4/5 my-2 lg:px-3 flex items-center justify-center flex-col-reverse">
   {posts.map((post) => (
  <SinglePost
    theme={theme}
    key={post.id}
    id={post.id}
    userID={post.user?.id}
    photoURL={post.user?.profilePhotoUrl}
    useEmail={post.user?.email}
    displayName={post.user?.username}
    disc={post.text}
    imageURL={post.image}
    createdAt={format(new Date(post.createdAt))}  // Formatage de la date ici
  />
))}


    </div>
  );
}

export default Post;
