// SignUpPage.jsx

import React from 'react';
import { Form, Button } from 'react-bootstrap';

function SignUpPage() {
    return (
      <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
        <h1 className="text-4xl font-bold mb-8">Create an account</h1>
        <form className="flex flex-col space-y-4">
          <div className="flex flex-col">
            <label htmlFor="username" className="text-xl font-bold mb-2">Username:</label>
            <input type="text" id="username" name="username" className="border border-gray-500 rounded py-2 px-4" />
          </div>
          <div className="flex flex-col">
            <label htmlFor="email" className="text-xl font-bold mb-2">Email:</label>
            <input type="email" id="email" name="email" className="border border-gray-500 rounded py-2 px-4" />
          </div>
          <div className="flex flex-col">
            <label htmlFor="password" className="text-xl font-bold mb-2">Password:</label>
            <input type="password" id="password" name="password" className="border border-gray-500 rounded py-2 px-4" />
          </div>
          <button type="submit" className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded">
            Sign Up
          </button>
        </form>
      </div>
    );
  }

export default SignUpPage;