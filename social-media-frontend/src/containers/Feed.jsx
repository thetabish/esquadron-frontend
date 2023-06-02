import React from 'react'
import Leftbar from '../components/Leftbar'
import PostSide from '../components/PostSide'
import Navbar from '../components/Navbar'
import Rightbar from '../components/Rightbar'
import { useLocation } from 'react-router-dom';
import './Feed.css'

const Feed = () => {
  
  const location = useLocation();
  const userData = location.state?.userData;
  localStorage.setItem('userData', JSON.stringify(userData));
  return (
    <>
    <div className="bg-black">
    <Navbar/>
    </div>
    <div className="Feed">
        <Leftbar userData={userData}/>
        <PostSide/>
        <Rightbar/>
    </div>
    </>
  );
};

export default Feed;