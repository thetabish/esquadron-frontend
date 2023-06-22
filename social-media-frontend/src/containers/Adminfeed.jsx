import React from 'react'
import Adminctrl from '../components/Adminctrl'
import Navadmin from '../components/Navadmin'
import { useLocation } from 'react-router-dom';
import './Feed.css'

const Adminfeed = () => {
  
  const location = useLocation();
  const userData = location.state?.userData;
  localStorage.setItem('userData', JSON.stringify(userData));
  return (
    <>
    <div className="bg-black">
    <Navadmin/>
    </div>
    <div className="Adminfeed">
        <Adminctrl userData={userData}/>
    </div>
    </>
  );
};

export default Adminfeed;