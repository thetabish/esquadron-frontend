import React from 'react'
import ProfileCard from './ProfileCard'

const Leftbar = (props) => {
  const userData = props.userData;
  return (
   <div className="flex flex-col gap-4 items-center overflow-auto">
       <ProfileCard userData={userData} />
   </div>
  )
}

export default Leftbar