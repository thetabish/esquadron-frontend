import React from 'react'
import ReactDOM from 'react-dom/client'
import LandingPage from './components/LandingPage';
import Register from './containers/Register'
import SignIn from './containers/SignIn'
import Feed from './containers/Feed'
import Adminfeed from './containers/Adminfeed'
import Profile from './containers/Profile'
import SearchPage from './components/SearchPage';
import NotFoundPage from './containers/NotFoundPage'
import TermsAndConditions from './containers/TermsAndConditions'
import ForgotPassword from './containers/ForgotPassword';

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';


const App = () => {
  return (
     <>
        <Routes>
           <Route path="/" element={<LandingPage />} />
           <Route path="/signin" element={<SignIn />} />
           <Route path="/forgot" element={<ForgotPassword />} />
           <Route path="/signup" element={<Register />} />
           <Route path="/feed" element={<Feed />} />
           <Route path="/adminfeed" element={<Adminfeed />} />
           <Route path="/profile/:viewedProfileId" element={<Profile />} />
           <Route path="/search" element={<SearchPage/>} />
           <Route path="/tnc" element={<TermsAndConditions />} />
           <Route path="*" element={<NotFoundPage />} />

        </Routes>
     </>
  );
 };
 
 export default App;
