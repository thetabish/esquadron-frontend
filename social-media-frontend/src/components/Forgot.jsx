import React from "react";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import logoImage from "../../public/assests/logo.jpg";
import { Dialog } from "@mui/material";

export default function Forgot() {
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");
  const [blockedUsers, setBlockedUsers] = useState([]);
  const [isBlocked, setIsBlocked] = useState(false);
  const [isInvalid, setIsInvalid] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);
  const [openPassDialog, setOpenPassDialog] = useState(false);
  const [answer, setAnswer] = useState('');
  const [question, setQuestion] = useState('');
  const [password, setPassword] = useState('');
  const [isEmailExists, setIsEmailExists] = useState(false);
  const [isAnswerCorrect, setIsAnswerCorrect] = useState(false);
  const [passwordError, setPasswordError] = useState("");
  const [answerError, setAnswerError] = useState("");
   // Store the captcha value

  const navigate = useNavigate();

  useEffect(() => {
    // Fetch blocked user data from the API
    fetch("http://127.0.0.1:5000/blocked-users")
      .then((response) => response.json())
      .then((data) => {
        const blockedUserIds = data.blocked_users;
        setBlockedUsers(blockedUserIds);
      })
      .catch((error) => setError(error.message));
  }, []);

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handleAnswerChange = (e) => {
    setAnswer(e.target.value);
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

  const handleForgotClick = (e) => {
    e.preventDefault();
    setOpenDialog(true); // Open the dialog box
  };

  const handleCloseDialog = () => {
    setOpenDialog(false); // Close the dialog box
  };

  const handleClosePassDialog = () => {
    setOpenPassDialog(false); // Close the dialog box
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Create a signup object with the form data
    const signinData = {
      email,
    };

    // Send the signup data to the backend
    fetch("http://127.0.0.1:5000/check-email", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(signinData),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.exists) {
            setIsEmailExists(true); // Set the state to indicate email exists
            setOpenDialog(true);
            setQuestion(data.question); // Open the dialog box
          } else {
            setIsEmailExists(false);
            setIsInvalid(true); // Set the state to indicate email does not exist
            // Handle the case when email does not exist
          }
        })
        .catch((error) => {
          console.error("Error:", error);
          // Handle errors
        });
  };
  const handleAnswerSubmit = (e) => {
    e.preventDefault();

    // Create an object with the email and answer
    const answerData = {
      email,
      answer,
    };

    // Send the answer data to the backend for validation
    fetch("http://127.0.0.1:5000/validate-answer", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(answerData),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.valid) {
          setIsAnswerCorrect(true);
          setOpenDialog(false);
          setOpenPassDialog(true);
          setAnswerError(false)
        } else {
            setAnswerError(true)
          // Handle the case when the answer is incorrect
        }
      })
      .catch((error) => {
        console.error("Error:", error);
        // Handle errors
      });
  };

  
  const handlePasswordSubmit = (e) => {
    e.preventDefault();
  
    // Create an object with the email and new password
    const passwordData = {
      email,
      password,
    };
  
    // Send the password data to the backend for updating
    fetch("http://127.0.0.1:5000/update-password", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(passwordData),
    })
      .then((response) => response.json())
      .then((data) => {
        // Handle the response and perform necessary actions
        if (data.success) {
            navigate("/signin");

          // Password updated successfully
          // Perform any additional actions or display a success message
        } else {
          // Password update failed
          // Handle the failure scenario
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
          Forgot Password?
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
          {isBlocked && (
            <p className="text-red-500 text-sm mt-1">User Blocked by Admin!</p>
          )}
          {isInvalid && (
            <p className="text-red-500 text-sm mt-1">
              Invalid email
            </p>
          )}
          <div className="mt-6">
            <button
              type="submit"
              className="w-full px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-purple-700 rounded-md hover:bg-purple-600 focus:outline-none focus:bg-purple-600"
            >
              SUBMIT
            </button>
          </div>
        </form>
      </div>
      <Dialog open={openDialog} onClose={handleCloseDialog}>
        <div class Name="p-4">
          {/* Content of the dialog box */}

          <div className="p-6 rounded-lg">
            <h1 className="text-3xl font-bold mb-4">Security Questions</h1>
            <div>
            <label
              for="answer"
              className="block text-sm font-semibold text-gray-800"
            >
              Security Question
            </label>
            <div className="block w-full px-4 py-2 mt-2 text-purple-700 bg-white border rounded-md focus:border-purple-400 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40">
                {question}
            </div>
            
          </div>
            <div className="mb-2">
            <label
              for="answer"
              className="block text-sm font-semibold text-gray-800"
            >
              Security Answer
            </label>
            <input
              type="text"
              id="answer"
              value={answer}
              onChange={handleAnswerChange}
              required
              className="block w-full px-4 py-2 mt-2 text-purple-700 bg-white border rounded-md focus:border-purple-400 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40"
            />
          </div>
          {answerError && (
              <p className="text-red-500 text-xs mt-1">Incorrect Answer</p>
            )}
          <button
              type="submit"
              className="w-full px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-purple-700 rounded-md hover:bg-purple-600 focus:outline-none focus:bg-purple-600"
              onClick={handleAnswerSubmit}
            >
              CHECK
            </button>
          </div>
        </div>
      </Dialog>
      <Dialog open={openPassDialog} onClose={handleClosePassDialog}>
        <div className="p-4">
          {/* Content of the dialog box */}

          <div className="p-6 rounded-lg">
            <h1 className="text-3xl font-bold mb-4">Change Password</h1>
            <div className="mb-2">
            <label
              htmlFor="new-password"
              className="block text-sm font-semibold text-gray-800"
            >
              New Password
            </label>
            <input
              type="password"
              id="new-password"
              value={password}
              onChange={handlePasswordChange}
              onBlur={validatePassword}
              required
              pattern="(?=.*\d)(?=.*[a-zA-Z]).{8,}"
              className="block w-full px-4 py-2 mt-2 text-purple-700 bg-white border rounded-md focus:border-purple-400 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40"
            />
            {passwordError && (
              <p className="text-red-500 text-xs mt-1">{passwordError}</p>
            )}
          </div>
          <button
              type="submit"
              className="w-full px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-purple-700 rounded-md hover:bg-purple-600 focus:outline-none focus:bg-purple-600"
              onClick={handlePasswordSubmit}
            >
              CHANGE PASSWORD
            </button>
          </div>
        </div>
      </Dialog>
    </div>
  );
}
