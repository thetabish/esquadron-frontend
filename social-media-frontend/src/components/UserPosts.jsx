import React, { useState, useEffect } from "react";
import Post from "./Post.jsx";

const UserPosts = () => {
  const [posts, setPosts] = useState([]);
  const userData = JSON.parse(localStorage.getItem("userData"));
  const currentUserId = userData.id
  useEffect(() => {
    fetchPosts();
    console.log(currentUserId)
  }, []);

  const fetchPosts = async () => {
    try {
      const response = await fetch(
        `http://127.0.0.1:5000/get-user-posts/${currentUserId}`
      );
      const data = await response.json();
      setPosts(data.posts);
    } catch (error) {
      console.error("Error fetching posts:", error);
    }
  };

  return (
    <div>
      {posts.map((post) => (
        <Post key={post.user_id} data={post} />
      ))}
    </div>
  );
};

export default UserPosts;
