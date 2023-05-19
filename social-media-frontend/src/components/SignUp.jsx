// SignUpPage.jsx

import React from 'react';
import { Link } from 'react-router-dom';

function SignUpPage() {
    return (
      <div className="my-10 relative flex flex-col justify-center min-h-screen">
      <div className="w-96 p-9 m-auto bg-white rounded-md shadow-xl shadow-slate-600/40 lg:max-w-xl">
          <h1 className="text-3xl font-semibold text-center text-purple-700 uppercase">
              Sign Up
          </h1>
          <form className="mt-6">
              <div className="mb-2">
                  <label
                      for="email"
                      className="block text-sm font-semibold text-gray-800"
                  >
                      Email
                  </label>
                  <input
                      type="email"
                      className="block w-full px-4 py-2 mt-2 text-purple-700 bg-white border rounded-md focus:border-purple-400 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40"
                  />
              </div>
              <div className="mb-2">
                  <label
                      for="password"
                      className="block text-sm font-semibold text-gray-800"
                  >
                      Password
                  </label>
                  <input
                      type="password"
                      className="block w-full px-4 py-2 mt-2 text-purple-700 bg-white border rounded-md focus:border-purple-400 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40"
                  />
              </div>

              <div className="mb-2">
                  <label
                      for="email"
                      className="block text-sm font-semibold text-gray-800"
                  >
                      Date of Birth
                  </label>
                  <input
                      type="date"
                      className="block w-full px-4 py-2 mt-2 text-purple-700 bg-white border rounded-md focus:border-purple-400 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40"
                  />
              </div>
              <div className="mb-2">
                  <label
                      for="email"
                      className="block text-sm font-semibold text-gray-800"
                  >
                      Country
                  </label>
                  <input
                      type="email"
                      className="block w-full px-4 py-2 mt-2 text-purple-700 bg-white border rounded-md focus:border-purple-400 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40"
                  />
              </div>
              <div className="mb-2">
                  <label
                      for="email"
                      className="block text-sm font-semibold text-gray-800"
                  >
                      City
                  </label>
                  <input
                      type="email"
                      className="block w-full px-4 py-2 mt-2 text-purple-700 bg-white border rounded-md focus:border-purple-400 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40"
                  />
              </div>
              <div className='text-xs'>
              By signing up, you agree to the&nbsp; 
              <a
                  href="#"
                  className=" text-purple-600 hover:underline"
              >
                  Terms and conditions
              </a>
              </div>
              <div className="mt-6">
                  <button className="w-full px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-purple-700 rounded-md hover:bg-purple-600 focus:outline-none focus:bg-purple-600">
                      SIGN UP
                  </button>
              </div>
              <div className="mt-6">
                  <div className='flex text-xs justify-center'>
              Already have an account? &nbsp;
              <a
                  href="#"
                  className=" text-purple-600 hover:underline"
              >
                  <Link to = "/">Sign in</Link>
              </a>
              </div>
              </div>
          </form>
          
      </div>
  </div>
    );
  }

export default SignUpPage;