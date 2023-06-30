import React from 'react'
import Titlebar from '../components/Titlebar'
import Forgot from '../components/Forgot'

const ForgotPassword = () => {
    return (
        <div className='bg-primary'>
          <Titlebar/>
          <div className='flex justify-center bg-slate-300'>
            <Forgot/>
          </div>
        </div>
      )
}

export default ForgotPassword