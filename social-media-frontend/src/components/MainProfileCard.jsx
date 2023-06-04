import React, { useRef, useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Cover from "../assets/cover.jpg";
import Profile from "../assets/profileImg.jpg";
import { saveAs } from 'file-saver';

const MainProfileCard = () => {
  const { viewedProfileId } = useParams();
  const fileInputRef = useRef(null);
  const userData = JSON.parse(localStorage.getItem('userData'));
  const isCurrentUser = userData.id == viewedProfileId;

  const handleEditProfilePicture = (event) => {
    const file = event.target.files[0]; // Get the selected file from the file input
  
    // Check if a file is selected
    if (file) {
      const formData = new FormData();
      formData.append('file', file);
      formData.append('user_id', userData.id); // Pass the user ID to the backend
  
      fetch('http://127.0.0.1:5000/upload-profile-picture', {
        method: 'POST',
        body: formData,
      })
        .then((response) => response.text())
        .then((imageName) => {
          console.log(imageName); // Handle the response from the backend
  
          // Construct the full URL for the profile picture
          const profilePictureURL = `http://127.0.0.1:5000/profile-picture/${imageName}`;
  
          // Update the profile picture URL in the userData object
          const updatedUserData = { ...userData, profilePicture: imageName };
          localStorage.setItem('userData', JSON.stringify(updatedUserData));
  
          // Update the profile picture URL in the UI
          setProfilePictureUrl(profilePictureURL);
        })
        .catch((error) => {
          console.error('Error:', error);
        });
    }
  };
  
  const [profilePictureUrl, setProfilePictureUrl] = useState(null);
  const imageRef = useRef();

  useEffect(() => {
    // Fetch the profile picture URL from the backend
    fetch(`http://127.0.0.1:5000/profile-picture/${userData.profilePicture}`)
    .then(response => response.blob()) // Convert response to blob
    .then(blob => {
      // Create object URL from the blob
      const url = URL.createObjectURL(blob);
      setProfilePictureUrl(url);
    })
    .catch(error => {
      console.error('Error:', error);
        // Set a default profile picture URL or handle the error as needed
      });
  }, [userData.profilePicture]);

  const onImageChange = (event) => {
    if (event.target.files && event.target.files[0]) {
      let img = event.target.files[0];
      setProfilePictureUrl(URL.createObjectURL(img));
    }
  };

  return (
    <div className="MainProfileCard bg-slate-200 rounded-xl flex flex-col relative gap-4 mb-5 mt-3 shadow-md font-poppins">
      <div className="ProfileImages relative flex flex-col items-center justify-center">
        <div className="w-full h-1/2 overflow-hidden">
          <img src={Cover} alt="" className="w-full h-80 object-cover" />
        </div>
        <img
          src={profilePictureUrl || Profile} // Use the profile picture URL or a default image
          alt=""
          className="w-40 h-40 rounded-full absolute bottom-[-3rem] shadow-lg shadow-indigo-500/50"
        />
      </div>
      <div className="ProfileName flex flex-col items-center justify-center mt-12 gap-2">
        <span className="font-bold text-xl">{userData.user_name}</span>
      </div>
      <hr className="w-4/5 flex flex-col items-center justify-center self-center border border-slate-500" />
      <div className="flex flex-row gap-10 items-center self-center">
        <div className="follow flex flex-col gap-1 items-center justify-center">
          <span className="font-bold">6</span>
          <span>Following</span>
        </div>
        <div className="follow flex flex-col gap-1 items-center justify-center">
          <span className="font-bold">1</span>
          <span>Followers</span>
        </div>
        <div className="follow flex flex-col gap-1 items-center justify-center">
          <span className="font-bold">3</span>
          <span>Posts</span>
        </div>
      </div>
      <hr className="w-4/5 flex flex-col items-center justify-center self-center border border-slate-500" />
      <div className="postOptions flex justify-around">
        <div
          className="option p-1 flex items-center justify-center text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-full text-sm px-5 py-2.5 text-center mr-2 mb-2"
          onClick={() => imageRef.current.click()}
        >
          {isCurrentUser ? "Edit" : "Follow"}
        </div>
        <div className="hidden">
          <input
            type="file"
            name="myImage"
            ref={imageRef}
            onChange={handleEditProfilePicture}
          />
        </div>
      </div>
    </div>
  );
};

export default MainProfileCard;
