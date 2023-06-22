import React from 'react';
import PostShare from './PostShare';
import UserPosts from './UserPosts';

const PostSide = () => {
  return (
    <div className='flex flex-col gap-4 overflow-auto items-center'>
      <PostShare />
      <UserPosts />
    </div>
  );
};

export default PostSide;