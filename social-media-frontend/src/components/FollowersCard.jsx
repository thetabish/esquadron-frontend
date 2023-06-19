import React, { useEffect, useState } from 'react';
import img1 from "../assets/Korra.jpg";
import img2 from "../assets/Sokka.jpg";
import img3 from "../assets/Zuko.jpg";
import img4 from "../assets/Katara.jpg";
const FollowersCard = () => {
  
  const [Followers, setSugg] = useState([]);
  useEffect(() => {
    fetch("http://127.0.0.1:5000/suggest")
      .then((response) => response.json())
      .then((data) => {
        let users = data;

        // Define the Followers array using the retrieved users
        const followers = [
          { name: users[1], img: img1 },
          { name: users[3], img: img2 },
          { name: users[5], img: img3 },
          { name: users[10], img: img4 },
        ];

        setSugg(followers);
      })
      .catch((error) => {
        console.error("Error fetching user data:", error);
      });
  }, []);
  
  return (
    <div className="FollowersCard w-90% h-min flex flex-col gap-3 bg-slate-200 p-4 rounded-lg w-90% shadow-md mt-3 mr-3 py-5 font-poppins">

      <div className="flex justify-between items-center cursor-pointer">
            <div className="text-lg font-bold">Followers</div>
            <div className="text-sm underline pr-2">See all</div>
        </div>

      {Followers.map((follower, id) => {
        return (
          <div className="follower flex justify-between items-center">
            <div className=" flex gap-2">
              <img src={follower.img} alt="" className="followerImage w-12 h-12 rounded-full" />
              <div className="name flex flex-col items-start justify-center">
                <span className="font-bold">{follower.name}</span>
              </div>
            </div>
            <button
              type="button"
              class="text-white bg-gradient-to-r from-purple-500 via-purple-600 to-purple-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-purple-300 dark:focus:ring-purple-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2"
            >
              Follow
            </button>
          </div>
        );
      })}
    </div>
  );
};

export default FollowersCard;
