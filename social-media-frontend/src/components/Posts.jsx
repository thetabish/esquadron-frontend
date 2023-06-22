import React, { useState, useEffect } from 'react';
import Post from './Post.jsx'

const Posts = () => {
    const [posts, setPosts] = useState([]);

    useEffect(() => {
      fetchPosts();

      const interval = setInterval(fetchPosts, 5000);

      return () => clearInterval(interval);
    }, []);

    const fetchPosts = async () => {
      try {
        const response = await fetch('http://127.0.0.1:5000/get-posts');
        const data = await response.json();
        setPosts(data.posts);
      } catch (error) {
        console.error('Error fetching posts:', error);
      }
    };

    
    return (
      <div>
          {posts.map((post, id)=>{
              return <Post data={post} id={id}/>
          })}
      </div>
    )
  }

export default Posts