import React from 'react'
import ReactDOM from 'react-dom/client'
import LandingPage from './components/LandingPage';
import Register from './containers/Register'
import SignIn from './containers/SignIn'
import Feed from './components/Feed'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';


const App = () => {
  return (
     <>
        <Routes>
           <Route path="/" element={<LandingPage />} />
           <Route path="/signin" element={<SignIn />} />
           <Route path="/signup" element={<Register />} />
           <Route path="/feed" element={<Feed />} />
        </Routes>
     </>
  );
 };
 
 export default App;
