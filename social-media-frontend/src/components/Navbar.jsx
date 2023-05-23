import React, { useState } from "react";
import { SearchOutlined } from "@mui/icons-material";

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div>
      <nav className="flex items-center justify-between py-10 h-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 bg-black">
       <div className="flex items-center gap-10">
        <div className="logo text-white">Meowtopia</div>
       </div>
       <div className="flex flex-wrap items-center justify-between gap-10 border bg-white border-gray-200 rounded-full p-1">
            <SearchOutlined/>
            <div className="border-none w-52">
            <input type="text" placeholder="Search" />
            </div>
        </div>
       <div className="hidden md:block">
       <div className="ml-10 flex items-baseline space-x-4 gap-10 font-poppins text-white">
            <a href="#">Home</a>
            <a href="#">Profile</a>
       </div>
       </div>
       <div className="-mr-2 flex md:hidden">
              <button
                onClick={() => setIsOpen(!isOpen)}
                type="button"
                className="inline-flex items-center justify-center p-2 rounded-md text-black hover:text-black hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white"
                aria-controls="mobile-menu"
                aria-expanded="false"
              >
                <span className="sr-only">Open main menu</span>
                {!isOpen ? (
                  <svg
                    className="block h-6 w-6"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M4 6h16M4 12h16M4 18h16"
                    />
                  </svg>
                ) : (
                  <svg
                    className="block h-6 w-6"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                )}
              </button>
              </div>
      </nav>
    </div>
  );
}

export default Navbar;