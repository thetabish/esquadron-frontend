import React from "react";
import Cover from '../assets/cover.jpg';
import Profile from "../assets/profileImg.jpg";
import { Link } from 'react-router-dom';

const ProfileCard = () => {
    const ProfilePage = true;
    return (
        <div className="ProfileCard bg-slate-200 rounded-xl flex flex-col relative gap-4 ml-4 mt-3 shadow-md font-poppins">
            <div className="ProfileImages relative flex flex-col items-center justify-center">
                <img src={Cover} alt="" className="w-full" />
                <img
                    src={Profile}
                    alt=""
                    className="w-20 h-20 rounded-full absolute bottom-[-3rem] shadow-lg shadow-indigo-500/50"
                />
            </div>
            <div className="ProfileName flex flex-col items-center mt-12 gap-2">
                <span className="font-bold">Avatar Aang</span>
                <span>Senior Airbender</span>
            </div>
            <hr className="w-4/5 flex flex-col items-center justify-center self-center border border-slate-500" />
                <span className="self-center text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-full text-sm px-5 py-2.5 text-center mr-2 mb-2">
                <Link to = "/profile">Profile</Link>
                </span>
        </div>
    );
};

export default ProfileCard;