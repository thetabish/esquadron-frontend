import React from 'react'
import Titlebar from '../components/Titlebar'
import Login from '../components/Login'

const SignIn = () => {
    return (
        <div className='bg-primary'>
          <Titlebar/>
          <div className='flex justify-center bg-slate-300'>
            <Login/>
          </div>
        </div>
      )
}

export default SignIn