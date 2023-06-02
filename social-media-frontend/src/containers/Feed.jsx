import React from 'react'
import Leftbar from '../components/Leftbar'
import PostSide from '../components/PostSide'
import Navbar from '../components/Navbar'
import Rightbar from '../components/Rightbar'
import './Feed.css'

const Feed = () => {
  return (
    <>
    <div className="bg-black">
    <Navbar />
  </div>
    <div className="Feed">
        <Leftbar/>
        <PostSide/>
        <Rightbar/>
    </div>
    </>
  );
};

export default Feed;