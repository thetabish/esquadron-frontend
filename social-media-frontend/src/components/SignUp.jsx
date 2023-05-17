// SignUpPage.jsx

import React from 'react';
import { Form, Button } from 'react-bootstrap';
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
              <div className="my-4 flex items-center before:mt-0.5 before:flex-1 before:border-t before:border-neutral-300 after:mt-0.5 after:flex-1 after:border-t after:border-neutral-300">
                  <p className="mx-4 mb-0 text-center font-semibold text-gray-800">
                      OR
                  </p>
              </div>
              <div className="mt-6">
                  <button className="w-full mb-3 flex items-center justify-center px-4 py-2 text-center uppercase leading-normal tracking-wide text-white transition-colors duration-200 transform bg-blue-700 rounded-md hover:bg-blue-800 focus:outline-none focus:bg-purple-600">
                  <svg
          xmlns="http://www.w3.org/2000/svg"
          class="mr-2 h-3.5 w-3.5"
          fill="currentColor"
          viewBox="0 0 24 24">
          <path
          d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z" />
      </svg>
                      Continue with Facebook
                  </button>
              </div>
              <div className="mt-6">
                  <button className="w-full mb-3 flex items-center justify-center px-4 py-2 text-center uppercase leading-normal tracking-wide text-white transition-colors duration-200 transform bg-purple-700 rounded-md hover:bg-purple-600 focus:outline-none focus:bg-purple-600">
                  <svg xmlns="http://www.w3.org/2000/svg" class="mr-2 h-3.5 w-3.5"
          fill="currentColor" viewBox="0 0 488 512"><path d="M488 261.8C488 403.3 391.1 504 248 504 110.8 504 0 393.2 0 256S110.8 8 248 8c66.8 0 123 24.5 166.3 64.9l-67.5 64.9C258.5 52.6 94.3 116.6 94.3 256c0 86.5 69.1 156.6 153.7 156.6 98.2 0 135-70.4 140.8-106.9H248v-85.3h236.1c2.3 12.7 3.9 24.9 3.9 41.4z"/></svg>
                      Continue with Google
                  </button>
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