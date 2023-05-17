import React from 'react'
import Navbar from '../components/Navbar'
import SignUp from '../components/SignUp'

const Register = () => {
    return (
        <div className='bg-primary'>
          <Navbar/>
          <div className='flex justify-center bg-slate-300'>
            <SignUp/>
          </div>
        </div>
      )
}


export default Register