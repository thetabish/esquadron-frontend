import React from 'react'
import ProfileCard from './ProfileCard'

const Leftbar = () => {
  return (
   <div className="flex flex-col gap-4 items-center overflow-auto">
       <ProfileCard/>
   </div>
  )
}

export default Leftbar