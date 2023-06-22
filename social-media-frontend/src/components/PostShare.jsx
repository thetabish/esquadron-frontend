import React, { useState, useRef, useEffect } from "react";
import { UilScenery, UilPostcard, UilTimes } from "@iconscout/react-unicons";
import Profile from "../assets/profileImg.jpg"


const PostShare = () => {
  const userData = JSON.parse(localStorage.getItem("userData"));
  const [image, setImage] = useState(null);
  const [file, setFile] = useState(null);
  const [text, setText] = useState("");
  const imageRef = useRef();
  const viewedProfileId = userData.id;
  const onImageChange = (event) => {
    if (event.target.files && event.target.files[0]) {
      let img = event.target.files[0];
      setFile(img);
      setImage({
        image: URL.createObjectURL(img),
      });
    }
  };

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



  const handleSubmit = async () => {
    const formData = new FormData();
    formData.append("userId", userData.id);
    formData.append("image", file);
    formData.append("text", text);

    try {
      await fetch("http://127.0.0.1:5000/posts", {
        method: "POST",
        body: formData,
      });
      // Handle successful response or show a success message
      setText("");
      setImage(null);
      setFile(null);
    } catch (error) {
      console.error("Error fetching post data:", error);
    }
  };

  return (
    <>
      <div className="PostShare flex gap-4 bg-slate-100 p-4 rounded-2xl shadow-md w-full font-poppins">
      {profilePictureUrl ? (
                <img
                    src={profilePictureUrl}
                    alt=""
                    className="w-12 h-12 rounded-full object-cover"
                />
                ) : (
                <img
                    src={Profile}
                    alt=""
                    className="w-12 h-12 rounded-full object-cover"
                />
                )}

        <div className="flex flex-col w-5/6 gap-4">
          <input
            type="text"
            placeholder="What's happening?"
            className="bg-slate-300 rounded-xl p-3 text-base text-black outline-none"
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
          <div className="postOptions flex justify-around">
            <div
              className="option p-1 flex items-center justify-center text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-full text-sm px-5 py-2.5 text-center mr-2 mb-2"
              onClick={() => imageRef.current.click()}
            >
              <UilScenery />
              Photo
            </div>
            <button
              type="submit"
              className="p-1 flex items-center justify-center text-white bg-gradient-to-r from-pink-400 via-pink-500 to-pink-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-pink-300 dark:focus:ring-pink-800 font-medium rounded-full text-sm px-5 py-2.5 text-center mr-2 mb-2"
              onClick={handleSubmit}
            >
              <UilPostcard />
              Post
            </button>
            <div className="hidden">
              <input
                type="file"
                name="myImage"
                ref={imageRef}
                onChange={onImageChange}
              />
            </div>
          </div>
          {image && (
            <div className="previewImage">
              <UilTimes onClick={() => setImage(null)} />
              <img src={image.image} alt="" />
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default PostShare;
