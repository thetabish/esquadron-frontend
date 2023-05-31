import React from 'react';
import PostShare from './PostShare';
import Posts from './Posts';

const PostSide = () => {
  return (
    <div className='flex flex-col gap-4 h-screen overflow-auto items-center'>
      <PostShare />
      <Posts />
    </div>
  );
};

export default PostSide;