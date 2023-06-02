import React from 'react'
import './Profile.css'
import ProfileLeft from '../components/ProfileLeft'
import MainProfileCard from '../components/MainProfileCard'
import PostSide from '../components/PostSide'
import Navbar from '../components/Navbar'
import FollowersCard from '../components/FollowersCard'
import { useLocation } from 'react-router-dom';

const Profile = () => {
  const userData = JSON.parse(localStorage.getItem('userData'));
  return (
    <>
    <div className="bg-black">
        <Navbar/>
    </div>
    <div className='Profile'>
        <ProfileLeft/>
        <div className="items-center">
            <div className=''><MainProfileCard userData={userData}/></div>
            <PostSide/>
        </div>
        <FollowersCard/>
    </div>
    </>
  )
}

export default Profile