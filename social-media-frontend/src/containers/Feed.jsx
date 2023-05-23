import React from 'react'
import Navbar from '../components/Navbar'
import Rightbar from '../components/Rightbar'

const Feed = () => {
    return (
        <div className='bg-white'>
          <div className="bg-black"> <Navbar/> </div>
          <div className='flex absolute top-24 right-1'>
            <Rightbar/>
          </div>
        </div>
      )
}

export default Feed