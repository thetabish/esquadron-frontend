import React from 'react'
import ReactDOM from 'react-dom/client'
import Register from './containers/Register'
import SignIn from './containers/SignIn'
import Feed from './containers/Feed'
import Profile from './containers/Profile'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';


const App = () => {
  return (
     <>
        <Routes>
           <Route path="/" element={<SignIn />} />
           <Route path="/signup" element={<Register />} />
           <Route path="/feed" element={<Feed />} />
           <Route path="/profile" element={<Profile />} />
        </Routes>
     </>
  );
 };
 
 export default App;
