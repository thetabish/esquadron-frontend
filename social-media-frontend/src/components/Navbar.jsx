import React from 'react'
import CTAButton from './CTAButton'

const Navbar = () => {
  return (
    <nav className=' flex justify-between items-center h-24 max-w-[1240px] mx-auto px-4 text-white font-poppins'>
        <div className='w-full text-3xl font-poppins'>Meowtopia.</div>
        <ul className='list-none sm:flex hidden justify-center items-center flex-1 whitespace-nowrap'>
            <li className='p-4'>About</li>
        </ul> 
    </nav>
  )
}

export default Navbar