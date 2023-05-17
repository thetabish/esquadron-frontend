import React from 'react'
import Navbar from '../components/Navbar'
import Login from '../components/Login'

const SignIn = () => {
    return (
        <div className='bg-primary'>
          <Navbar/>
          <div className='flex justify-center bg-slate-300'>
            <Login/>
          </div>
        </div>
      )
}

export default SignIn