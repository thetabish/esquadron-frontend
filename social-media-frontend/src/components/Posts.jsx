import React, { useState, useEffect } from 'react';
import Post from './Post.jsx';
import NoPost from './NoPost.jsx';

const Posts = () => {
  const [posts, setPosts] = useState([]);
  const userData = JSON.parse(localStorage.getItem("userData"));
  const currentUserId = userData.id;
  const [blockedUsers, setBlockedUsers] = useState([]);

  useEffect(() => {
    fetchBlockedUsers();
  }, [userData.id]);

  const fetchBlockedUsers = () => {
    fetch('http://127.0.0.1:5000/get-blocked-users', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ user_id: userData.id }),
    })
      .then((response) => response.json())
      .then((blockedUsersData) => {
        const blockedUserIds = blockedUsersData.map((item) => item.id);
        fetch('http://127.0.0.1:5000/get-blocked-by-users', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ user_id: userData.id }),
        })
          .then((response) => response.json())
          .then((block2) => {
            const blocked = block2.map((item) => item.id);
            fetch('http://127.0.0.1:5000/blocked-users')
              .then((response) => response.json())
              .then((blockadmin) => {
                const blockedadmin = blockadmin.blocked_users;
                const final_block = [...blockedUserIds, ...blocked, ...blockedadmin];
  
                console.log(final_block);
                setBlockedUsers(final_block);
                fetchPosts(final_block);
              })
              .catch((error) => {
                setError(error.message);
              });
          })
          .catch((error) => {
            console.error('Error fetching blocked users:', error);
          });
      })
      .catch((error) => {
        console.error('Error fetching blocked users:', error);
      });
  };
  
  

  const fetchPosts = async (blockedUserIds) => {
    try {
      const response = await fetch(`http://127.0.0.1:5000/get-posts/${currentUserId}`);
      if (response.ok) {
        const data = await response.json();
        const filteredPosts = data.posts.filter((data) => {
          return !blockedUserIds.includes(data.user_id);
        });

        setPosts(filteredPosts);
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
