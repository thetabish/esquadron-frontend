import React from 'react'
import {UilScenery, UilPlayCircle} from "@iconscout/react-unicons"

import { Followers } from "../Data/FollowersData";

const Rightbar = () => {
  // Select the first two entries from the FollowersData array
  const firstTwoFollowers = Followers.slice(0, 2);

  return (
    <div className="FollowersCard w-90% h-min flex flex-col gap-3 bg-slate-200 p-4 rounded-lg w-90% shadow-md mt-3 mr-3 py-5 font-poppins">
      <div className="flex justify-between items-center cursor-pointer">
        <div className="text-lg font-bold">Suggestions</div>
      </div>

      {firstTwoFollowers.map((follower, id) => {
        return (
          <div className="follower flex justify-between items-center" key={id}>
            <div className="flex gap-2">
              <img src={follower.img} alt="" className="followerImage w-12 h-12 rounded-full" />
              <div className="name flex flex-col items-start justify-center">
                <span className="font-bold">{follower.name}</span>
                <span>@{follower.username}</span>
              </div>
            </div>
            <button
              type="button"
              className="text-white bg-gradient-to-r from-purple-500 via-purple-600 to-purple-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-purple-300 dark:focus:ring-purple-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2"
            >
              Follow
            </button>
          </div>
        );
      })}
    </div>
  );
};

export default Rightbar;