import React, { useRef, useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Cover from "../assets/cover.jpg";
import Profile from "../assets/profileImg.jpg";
import { saveAs } from "file-saver";

const MainProfileCard = () => {
  const { viewedProfileId } = useParams();
  const fileInputRef = useRef(null);
  const [username, setUsername] = useState("");
  const userData = JSON.parse(localStorage.getItem("userData"));
  const isCurrentUser = userData.id == viewedProfileId;
  const [following, setFollowing] = useState([]);
  const [followers, setFollowers] = useState([]);
  const [postCount, setPostCount] = useState(0);
  const handleEditProfilePicture = (event) => {
    const file = event.target.files[0]; // Get the selected file from the file input

    // Check if a file is selected
    if (file) {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("user_id", userData.id); // Pass the user ID to the backend

      fetch("http://127.0.0.1:5000/upload-profile-picture", {
        method: "POST",
        body: formData,
      })
        .then((response) => response.text())
        .then((filename) => {
          console.log(filename); // Handle the response from the backend

          // Construct the full URL for the profile picture
          let i = userData.id;
          const profilePictureURL = `http://127.0.0.1:5000/update-profile-picture/${filename}/${i}`;

          // Fetch the image blob from the constructed URL
          return fetch(profilePictureURL);
        })
        .then((response) => response.blob())
        .then((blob) => {
          // Create object URL from the blob
          if (blob.type != "text/html") {
            const url = URL.createObjectURL(blob);
            setProfilePictureUrl(url);
          }

          // Update the profile picture URL in the userData object
          const updatedUserData = { ...userData, profilePicture: url };
          localStorage.setItem("userData", JSON.stringify(updatedUserData));

          // Update the profile picture URL in the UI
          setProfilePictureUrl(url);
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    }
  };

  const [profilePictureUrl, setProfilePictureUrl] = useState(null);
  const imageRef = useRef();

  useEffect(
    () => {

      // Fetch user data and set the username
    const fetchUserData = async () => {
      try {
        const response = await fetch(
          `http://127.0.0.1:5000/get-user-name/${viewedProfileId}`
        );
        const data = await response.json();
        const { user_name: username } = data; // Extract the username from the response
        console.log("Fetched username:", username);
        setUsername(username);
      } catch (error) {
        console.error("Error fetching user data:", error);
        setUsername("");
      }
    };

    fetchUserData();
      // Fetch the user's posts count
      const fetchPostCount = async () => {
        try {
          const userData = JSON.parse(localStorage.getItem("userData"));
          const currentUserId = userData.id;
          const response = await fetch(
            `http://127.0.0.1:5000/get-user-posts/${parseInt(
              viewedProfileId,
              10
            )}`
          );
          const data = await response.json();
          const { posts } = data;
          const count = posts.length; // Number of posts
          setPostCount(count);
        } catch (error) {
          console.error("Error fetching post count:", error);
        }
      };
      fetchPostCount();
      // Fetch the profile picture URL from the backend
      fetch(`http://127.0.0.1:5000/profile-picture/${viewedProfileId}`)
        .then((response) => response.blob())
        .then((blob) => {
          if (blob.type != "text/html") {
            const url = URL.createObjectURL(blob);
            setProfilePictureUrl(url);
          }
        })
        .catch((error) => {
          console.error("Error:", error);
          // Set a default profile picture URL or handle the error as needed
        });
      // Make the API call to get the list of friends for the current user
      fetch("http://127.0.0.1:5000/get-friends", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ user_id: viewedProfileId }),
      })
        .then((response) => response.json())
        .then((friendsData) => {
          const filteredFollowing = friendsData.filter(
            (friend) => friend.id !== parseInt(viewedProfileId)
          );
          setFollowing(filteredFollowing);
        })
        .catch((error) => {
          console.error("Error fetching friends:", error);
        });

      fetch("http://127.0.0.1:5000/get-followers", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ user_id: viewedProfileId }),
      })
        .then((response) => response.json())
        .then((friendsData) => {
          const filteredFollowers = friendsData.filter(
            (follower) => follower.id !== parseInt(viewedProfileId)
          );
          setFollowers(filteredFollowers);
        })
        .catch((error) => {
          console.error("Error fetching friends:", error);
        });
    },
    [viewedProfileId],
    [userData.id],
    [userData.id]
  );

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
      <div className="ProfileName flex flex-col items-center justify-center mt-12 gap-2">
      {username ? (
        <span className="font-bold text-xl">{username}</span>
      ) : (
        <span>Loading username...</span>
      )}
      </div>
      <hr className="w-4/5 flex flex-col items-center justify-center self-center border border-slate-500" />
      <div className="flex flex-row gap-10 items-center self-center">
        <div className="follow flex flex-col gap-1 items-center justify-center">
          <span className="font-bold">{following.length}</span>
          <span>Following</span>
        </div>
        <div className="follow flex flex-col gap-1 items-center justify-center">
          <span className="font-bold">{followers.length}</span>
          <span>Followers</span>
        </div>
        <div className="follow flex flex-col gap-1 items-center justify-center">
          <span className="font-bold">{postCount}</span>
          <span>Posts</span>
        </div>
      </div>
      <hr className="w-4/5 flex flex-col items-center justify-center self-center border border-slate-500" />
      <div className="postOptions flex justify-around">
      {isCurrentUser && (
  <div
    className="option p-1 flex items-center justify-center text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-full text-sm px-5 py-2.5 text-center mr-2 mb-2 cursor-pointer"
    onClick={() => imageRef.current.click()}
  >
    Edit Profile picture
  </div>
)}
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
