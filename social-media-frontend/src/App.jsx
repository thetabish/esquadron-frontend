import React from 'react'
import ReactDOM from 'react-dom/client'
import Register from './containers/Register'
import SignIn from './containers/SignIn'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';


const App = () => {
  return (
     <>
        <Routes>
           <Route path="/" element={<SignIn />} />
           <Route path="/signup" element={<Register />} />
        </Routes>
     </>
  );
 };
 
 export default App;
