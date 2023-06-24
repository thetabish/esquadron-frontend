import React, { useState, useEffect } from 'react';
import Post from './Post.jsx';
import NoPost from './NoPost.jsx';

const Posts = () => {
  const [posts, setPosts] = useState([]);
  const userData = JSON.parse(localStorage.getItem("userData"));
  const currentUserId = userData.id;

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      const response = await fetch(`http://127.0.0.1:5000/get-posts/${currentUserId}`);
      if (response.ok) {
        const data = await response.json();
        setPosts(data.posts);
      } else {
        throw new Error('Request failed with status ' + response.status);
      }
    } catch (error) {
      console.error('Error fetching posts:', error);
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

export default Posts;
