import React from "react";
import CTAButton from "./CTAButton";
import { Link } from 'react-router-dom';

const Titlebar = () => {
  return (
    <nav className=" flex text-center justify-center items-center h-24 max-w-[1240px] mx-auto px-4 text-white font-poppins">
      <div className="w-full text-3xl font-poppins">
        <Link to="/">Meowtopia.</Link>
      </div>
    </nav>
  );
};

export default Titlebar;
