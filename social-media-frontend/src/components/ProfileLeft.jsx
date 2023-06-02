import React from 'react'
import ProfileInfo from './ProfileInfo'

const ProfileLeft = () => {
  const userData = JSON.parse(localStorage.getItem('userData'));
  return (
    <div>
        <ProfileInfo userData={userData}/>
    </div>
  )
}

export default ProfileLeft