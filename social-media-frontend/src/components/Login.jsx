import React from 'react';
import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import logoImage from "../../public/assests/logo.jpg";
export default function Login() {
    const [email, setEmail] = useState("");
    const [emailError, setEmailError] = useState("");
    const [password, setPassword] = useState("");
    const [passwordError, setPasswordError] = useState("");  
    const [blockedUsers, setBlockedUsers] = useState([]);
    const [isBlocked, setIsBlocked] = useState(false);
    const [isInvalid, setIsInvalid] = useState(false);
    
    const navigate  = useNavigate();

    useEffect(() => {
      // Fetch blocked user data from the API
      fetch('http://127.0.0.1:5000/blocked-users')
        .then(response => response.json())
        .then(data => {
          const blockedUserIds = data.blocked_users;
          setBlockedUsers(blockedUserIds);
        })
        .catch(error => setError(error.message));
    }, []);

    const handleEmailChange = (e) => {
        setEmail(e.target.value);
      };
    
    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
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
        const signinData = {
          email,
          password,
        };
    
        // Send the signup data to the backend
        fetch("http://127.0.0.1:5000/signin", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(signinData),
        })
          .then((response) => response.json())
          .then((data) => {
            // Handle the response from the backend
            console.log(data);
            if(data.message == "Invalid email or password"){
              setIsInvalid(true);
            }
            else if(blockedUsers.includes(data.id )){
              setIsBlocked(true);
              setIsInvalid(false);
            }
            else{
              setIsBlocked(false);
              setIsInvalid(false);
              if(data.email == "admin@gmail.com"){
                navigate('/adminfeed', { state: { userData: data }, replace: true });
              }else{
                navigate('/feed', { state: { userData: data }, replace: true });
              }
            }
          })
          .catch((error) => {
            console.error("Error:", error);
            // Handle errors
          });
      };
    return (

        <div className="my-3 relative flex flex-col justify-center min-h-screen ">
            <div className="w-96 p-9 m-auto bg-white rounded-md shadow-xl shadow-slate-600/40 lg:max-w-xl">
            <img src={logoImage} alt="Meowtopia Logo" className="" />
                <h1 className="text-3xl font-semibold text-center text-purple-700 uppercase">
                    Sign in
                </h1>
                <form className="mt-6"  onSubmit={handleSubmit}>
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
          {isBlocked && (
  <p className="text-red-500 text-sm mt-1">User Blocked by Admin!</p>
)}
{isInvalid && (
  <p className="text-red-500 text-sm mt-1">Invalid email or password</p>
)}
                    {/* <a
                        href="#"
                        className="text-xs text-purple-600 hover:underline"
                    >
                        Forgot Password?
                    </a> */}
                    <div className="mt-6">
                        <button type="submit" className="w-full px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-purple-700 rounded-md hover:bg-purple-600 focus:outline-none focus:bg-purple-600">
                            LOGIN
                        </button>
                    </div>
                </form>

                <p className="mt-8 text-xs font-light text-center text-gray-700">
                    {" "}
                    Don't have an account?{" "}
                    <a href="/signup" className="font-medium text-purple-600 hover:underline">
                        <Link to = "/signup">Sign up</Link>
                    </a>
                </p>
            </div>
        </div>
    );
}