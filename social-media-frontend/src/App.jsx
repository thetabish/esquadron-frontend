import React from 'react'
import ReactDOM from 'react-dom/client'
import LandingPage from './components/LandingPage';
import Register from './containers/Register'
import SignIn from './containers/SignIn'
import Feed from './containers/Feed'
import Profile from './containers/Profile'
import SearchPage from './components/SearchPage';
import NotFoundPage from './containers/NotFoundPage'
import TermsAndConditions from './containers/TermsAndConditions'

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';


const App = () => {
  return (
     <>
        <Routes>
           <Route path="/" element={<LandingPage />} />
   h        <Route path="/signin" element={<SignIn />} />
           <Route path="/signup" element={<Register />} />
           <Route path="/feed" element={<Feed />} />
           <Route path="/profile/:viewedProfileId" element={<Profile />} />
           <Route path="/search" element={<SearchPage/>} />
           <Route path="/tnc" element={<TermsAndConditions />} />
           <Route path="*" element={<NotFoundPage />} />

        </Routes>
     </>
  );
 };
 
 export default App;
