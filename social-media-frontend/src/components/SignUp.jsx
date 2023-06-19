// SignUpPage.jsx

import React from "react";
import { Link, useNavigate } from "react-router-dom";
import Select from "react-select";
import { useState } from "react";

import logoImage from "../assets/logo.jpg";
import countryList from "../../public/assests/country.js";

function SignUpPage() {
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");
  const [password, setPassword] = useState("");
  const [userName, setuserName] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState("");
  const [country, setCountry] = useState(null);
  const [city, setCity] = useState("");
  const navigate  = useNavigate();


  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };
  const handleUserNameChange = (e) => {
    setuserName(e.target.value);
  };

  const handleDateOfBirthChange = (e) => {
    setDateOfBirth(e.target.value);
  };

  const handleCountryChange = (selectedOption) => {
    setCountry(selectedOption.value);
  };
  const placeholder = country ? country : 'Select';
  const handleCityChange = (e) => {
    setCity(e.target.value);
  };
  const validateEmail = () => {
    const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
    if (!email.match(emailRegex)) {
      setEmailError("Invalid email address");
    } else {
      setEmailError("");
    }
  };

  const validatePassword = () => {
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
    if (!password.match(passwordRegex)) {
      setPasswordError(
        "Password must contain at least 8 characters, including one letter and one number"
      );
    } else {
      setPasswordError("");
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Create a signup object with the form data
    const signupData = {
      email,
      password,
      userName,
      dateOfBirth,
      country,
      city,
    };

    // Send the signup data to the backend
    fetch("http://127.0.0.1:5000/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(signupData),
    })
      .then((response) => response.json())
      .then((data) => {
        // Handle the response from the backend
        console.log(data);
        navigate('/feed', { state: { userData: data }, replace: true });
        // Redirect to a success page or perform any other actions
      })
      .catch((error) => {
        console.error("Error:", error);
        // Handle errors
      });
  };

  const clist = countryList.map((country) => ({
    value: country,
    label: country,
  }));
  return (
    <div className="my-10 relative flex flex-col justify-center min-h-screen">
      <div className="w-96 p-9 m-auto bg-white rounded-md shadow-xl shadow-slate-600/40 lg:max-w-xl">
        <img
          src={logoImage}
          alt="Meowtopia Logo"
          className="w-25 h-25 mr-1 ml-4"
        />
        <h1 className="text-3xl font-semibold text-center text-purple-700 uppercase">
          Sign Up
        </h1>
        <form className="mt-6" onSubmit={handleSubmit}>
          <div className="mb-2">
            <label
              htmlFor="email"
              className="block text-sm font-semibold text-gray-800"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              className="block w-full px-4 py-2 mt-2 text-purple-700 bg-white border rounded-md focus:border-purple-400 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40"
              value={email}
              onChange={handleEmailChange}
              onBlur={validateEmail}
              required
              pattern="[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}"
            />
            {emailError && (
              <p className="text-red-500 text-xs mt-1">{emailError}</p>
            )}
          </div>
          <div className="mb-2">
            <label
              htmlFor="password"
              className="block text-sm font-semibold text-gray-800"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              className="block w-full px-4 py-2 mt-2 text-purple-700 bg-white border rounded-md focus:border-purple-400 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40"
              value={password}
              onChange={handlePasswordChange}
              onBlur={validatePassword}
              required
              pattern="(?=.*\d)(?=.*[a-zA-Z]).{8,}"
            />
            {passwordError && (
              <p className="text-red-500 text-xs mt-1">{passwordError}</p>
            )}
          </div>
          <div className="mb-2">
            <label
              htmlFor="password"
              className="block text-sm font-semibold text-gray-800"
            >
              User Name
            </label>
            <input
              type="userName"
              id="userName"
              className="block w-full px-4 py-2 mt-2 text-purple-700 bg-white border rounded-md focus:border-purple-400 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40"
              value={userName}
              onChange={handleUserNameChange}
              required
            />
          </div>

          <div className="mb-2">
            <label className="block text-sm font-semibold text-gray-800">
              Date of Birth
            </label>
            <input
              type="date"
              value={dateOfBirth}
              onChange={handleDateOfBirthChange}
              className="block w-full px-4 py-2 mt-2 text-purple-700 bg-white border rounded-md focus:border-purple-400 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40"
            />
          </div>
          <div className="mb-2">
            <label className="block text-sm font-semibold text-gray-800">
              Country
            </label>
            <Select
              id="country"
              value={country}
              onChange={handleCountryChange}
              options={clist}
              className="w-full mt-2"
              placeholder= {placeholder}
            />
          </div>
          <div className="mb-2">
            <label
              for="city"
              className="block text-sm font-semibold text-gray-800"
            >
              City
            </label>
            <input
              type="text"
              id="city"
              value={city}
              onChange={handleCityChange}
              className="block w-full px-4 py-2 mt-2 text-purple-700 bg-white border rounded-md focus:border-purple-400 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40"
            />
          </div>
          <div className="text-xs">
            By signing up, you agree to the&nbsp;
            <a href="#" className=" text-purple-600 hover:underline">
                  <Link to = "/tnc">Terms and conditions</Link>

            </a>
          </div>
          <div className="mt-6">
            <button
              type="submit"
              className="w-full px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-purple-700 rounded-md hover:bg-purple-600 focus:outline-none focus:bg-purple-600"
            >
              SIGN UP
            </button>
          </div>
          <div className="mt-6">
            <div className="flex text-xs justify-center">
              Already have an account? &nbsp;
              <a href="#" className=" text-purple-600 hover:underline">
                <Link to="/signin">Sign in</Link>
              </a>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default SignUpPage;
