import React from 'react'
import Titlebar from '../components/Titlebar'
import SignUp from '../components/SignUp'
import Navbar from '../components/Navbar'

const Register = () => {
    return (
        <div className='bg-primary'>
          <Titlebar/>
          <div className='flex justify-center bg-slate-300'>
            <SignUp/>
          </div>
        </div>
      )
}


export default Register