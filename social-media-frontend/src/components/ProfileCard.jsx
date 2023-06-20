import React, { useRef, useState, useEffect } from "react";
import Cover from '../assets/cover.jpg';
import Profile from "../assets/profileImg.jpg";
import { Link } from 'react-router-dom';

const ProfileCard = (props) => {
    const ProfilePage = true;
    //const { email, country, date_of_birth, city, user_name} = props.userData;
    
    const userData = JSON.parse(localStorage.getItem('userData'));
    const viewedProfileId = userData.id;
    const profileUrl = `/profile/${viewedProfileId}`;
    useEffect(() => {
        // Fetch the profile picture URL from the backend
        fetch(`http://127.0.0.1:5000/profile-picture/${viewedProfileId}`)
          .then(response => response.blob())
          .then(blob => {
              if(blob.type != "text/html"){
                const url = URL.createObjectURL(blob);
                setProfilePictureUrl(url);  
              }
              
          })
          .catch(error => {
            console.error('Error:', error);
            // Set a default profile picture URL or handle the error as needed
          });
      }, [viewedProfileId]);

      const [profilePictureUrl, setProfilePictureUrl] = useState(null);
      const imageRef = useRef();
    return (
        <div className="ProfileCard bg-slate-200 rounded-xl flex flex-col relative gap-4 ml-4 mt-3 shadow-md font-poppins">
            <div className="ProfileImages relative flex flex-col items-center justify-center">
                <img src={Cover} alt="" className="w-full" />
                {profilePictureUrl ? (
                <img
                    src={profilePictureUrl}
                    alt=""
                    className="w-40 h-40 rounded-full absolute bottom-[-3rem] shadow-lg shadow-indigo-500/50"
                />
                ) : (
                <img
                    src={Profile}
                    alt=""
                    className="w-40 h-40 rounded-full absolute bottom-[-3rem] shadow-lg shadow-indigo-500/50"
                />
                )}
            </div>
            <div className="ProfileName flex flex-col items-center mt-12 gap-2">
                {/* <span className="font-bold">{user_name}</span>
                <span>Email: {email}</span>
                <span>Country: {country}</span>
                <span>DOB: {date_of_birth}</span>
                <span>City: {city}</span> */}

                <span className="font-bold">{userData.user_name}</span>
                <span>Email: {userData.email}</span>
                <span>Country: {userData.country}</span>
                <span>DOB: {userData.date_of_birth}</span>
                <span>City: {userData.city}</span>
            </div>
            <hr className="w-4/5 flex flex-col items-center justify-center self-center border border-slate-500" />
                <span className="font-bold text-orange-500 self-center mb-4 cursor-pointer">
                <Link to={{ pathname: profileUrl}}>Profile</Link>
                </span>
        </div>
    );
};

export default ProfileCard;