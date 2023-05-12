import React from 'react'
import Navbar from './components/Navbar'
import Login from './components/Login'
import SignUp from './components/SignUp'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

const App = () => {
  return (
    <div className='bg-primary'>
      <Navbar/>
      <div className='flex justify-center bg-slate-300'>
        <Login/>
      </div>
    </div>
  )
}

export default App

