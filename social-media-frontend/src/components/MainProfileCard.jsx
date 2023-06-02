import React from "react";
import Cover from "../assets/cover.jpg";
import Profile from "../assets/profileImg.jpg";

const MainProfileCard = () => {
  const ProfilePage = true;
  const userData = JSON.parse(localStorage.getItem('userData'));
  return (
    <div className="MainProfileCard bg-slate-200 rounded-xl flex flex-col relative gap-4 mb-5 mt-3 shadow-md font-poppins">
      <div className="ProfileImages relative flex flex-col items-center justify-center">
        <div className="w-full h-1/2 overflow-hidden">
          <img src={Cover} alt="" className="w-full h-80 object-cover" />
        </div>
        <img
          src={Profile}
          alt=""
          className="w-40 h-40 rounded-full absolute bottom-[-3rem] shadow-lg shadow-indigo-500/50"
        />
      </div>
      <div className="ProfileName flex flex-col items-center justify-center mt-12 gap-2">
        <span className="font-bold text-xl">{userData.user_name}</span>
        <span>Senior Airbender</span>
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
      <button type="button" class="self-center text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-full text-sm px-5 py-2.5 text-center mr-2 mb-2">Follow</button>
    </div>
  );
};

export default MainProfileCard;
