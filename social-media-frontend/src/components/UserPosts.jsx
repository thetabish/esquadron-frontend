import React, { useState, useEffect } from "react";
import Post from "./Post.jsx";
import NoPost from "./NoPost.jsx";

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
      {posts.length > 0 ? (
        posts.map((post, id) => (
          <Post data={post} id={id} key={id} />
        ))
      ) : (
        <NoPost />
      )}
    </div>
  );
};

export default UserPosts;
