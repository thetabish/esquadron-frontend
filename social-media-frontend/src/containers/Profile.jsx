import React from 'react'
import './Profile.css'
import ProfileLeft from '../components/ProfileLeft'
import MainProfileCard from '../components/MainProfileCard'
import PostSide from '../components/PostSide'
import Navbar from '../components/Navbar'
import FollowersCard from '../components/FollowersCard'

const Profile = () => {
  return (
    <>
    <div className="bg-black">
        <Navbar />
    </div>
    <div className='Profile'>
        <ProfileLeft/>
        <div className="items-center">
            <div className=''><MainProfileCard/></div>
            <PostSide/>
        </div>
        <FollowersCard/>
    </div>
    </>
  )
}

export default Profile