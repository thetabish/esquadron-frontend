// SignUpPage.jsx

import React from "react";
import { Link, useNavigate } from "react-router-dom";
import Select from "react-select";
import { useState } from "react";
import { Dialog } from "@mui/material";
import logoImage from "../../public/assests/logo.jpg";
import countryList from "../../public/assests/country.js";
import questions from "../../public/assests/questions.js";
import ReCAPTCHA from "react-google-recaptcha";

function SignUpPage() {
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");
  const [password, setPassword] = useState("");
  const [userName, setuserName] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState("");
  const [country, setCountry] = useState(null);
  const [question, setQuestion] = useState(null);
  const [answer, setAnswer] = useState('');
  const [city, setCity] = useState("");
  const [openDialog, setOpenDialog] = useState(false); // State for dialog box
  const navigate = useNavigate();
  const [termsChecked, setTermsChecked] = useState(false);
  const [termsError, setTermsError] = useState("");
  const [captchaValue, setCaptchaValue] = useState(""); // Store the captcha value

  const handleTermsCheck = (e) => {
    setTermsChecked(e.target.checked);
    setTermsError("");
  };
  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };
  const handleCaptchaChange = (value) => {
    setCaptchaValue(value);
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

  const handleQuestionChange = (selectedOption) => {
    setQuestion(selectedOption.value);
  };

  const handleAnswerChange = (e) => {
    setAnswer(e.target.value);
  };

  const placeholder = country ? country : "Select";
  const Qplaceholder = question ? question : "Select";
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
  const handleTermsAndConditionsClick = (e) => {
    e.preventDefault();
    setOpenDialog(true); // Open the dialog box
  };

  const handleCloseDialog = () => {
    setOpenDialog(false); // Close the dialog box
  };
  function getCurrentDate() {
    const currentDate = new Date();
    const year = currentDate.getFullYear();
    let month = (currentDate.getMonth() + 1).toString();
    if (month.length === 1) {
      month = "0" + month; // Add leading zero if month is single digit
    }
    let day = currentDate.getDate().toString();
    if (day.length === 1) {
      day = "0" + day; // Add leading zero if day is single digit
    }
    return `${year}-${month}-${day}`;
  }
  
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!termsChecked) {
      setTermsError("Please accept the terms and conditions to continue.");
      return;
    }

    if (!country) {
      setTermsError("Please fill in the required fields.");
      return;
    }

    // Create a signup object with the form data
    const signupData = {
      email,
      password,
      userName,
      dateOfBirth,
      country,
      city,
      question,
      answer
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
        navigate("/feed", { state: { userData: data }, replace: true });
        // Redirect to a success page or perform any other actions
      })
      .catch((error) => {
        console.error("Error:", error);
        // Handle errors
      });
  };
  const qlist = questions.map((question) => ({
    value: question,
    label: question,
  }));


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
              max={getCurrentDate()}
              required // Make the field required
              onKeyDown={(e) => {
                e.preventDefault();
              }}
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
              placeholder={placeholder}
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
              required
              className="block w-full px-4 py-2 mt-2 text-purple-700 bg-white border rounded-md focus:border-purple-400 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40"
            />
          </div>
          <div className="mb-2">
            <label className="block text-sm font-semibold text-gray-800">
              Security Question
            </label>
            <Select
              id="question"
              value={question}
              onChange={handleQuestionChange}
              options={qlist}
              className="w-full mt-2"
              placeholder={Qplaceholder}
            />
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
          <div className="text-xs  mb-2">
            By signing up, you agree to the&nbsp;
            <button
              className="text-purple-600 hover:underline focus:outline-none"
              onClick={handleTermsAndConditionsClick}
            >
              Terms and conditions
            </button>
          </div>
          <div className="mb-4">
            {/* <ReCAPTCHA
      sitekey="6LdjPOAmAAAAALq-5VcfXekMuYocuo2iWfg4EcxQ"
      onChange={handleCaptchaChange}
    /> */}
          </div>
          <div className="mt-6">
            <button
              type="submit"
              className="w-full px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-purple-700 rounded-md hover:bg-purple-600 focus:outline-none focus:bg-purple-600"
            >
              SIGN UP
            </button>
            {termsError && (
              <p className="text-red-500 text-xs mt-1">{termsError}</p>
            )}
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
      <Dialog open={openDialog} onClose={handleCloseDialog}>
        <div class Name="p-4">
          {/* Content of the dialog box */}

          <div className="p-6 rounded-lg">
            <h1 className="text-3xl font-bold mb-4">Terms and Conditions</h1>

            <p>
              Welcome to our cat-tastic website! By accessing this site, you
              agree to the following feline-fabulous terms and conditions:
            </p>
            <ol className="list-decimal ml-6">
              <li>
                Meow-ltilingual Communication: Our website employs the finest
                cat translators. However, we cannot guarantee the accuracy of
                the translations from human language to "Meow."
              </li>
              <li>
                Catnip Disclaimer: We do not take responsibility for any
                excessive purring, rolling around, or catnip-induced shenanigans
                that may occur while browsing our site.
              </li>
              <li>
                Fur Allergies: If you are allergic to adorable furballs, we
                recommend using our website with caution or consulting a
                professional cat cuddler before proceeding.
              </li>
              <li>
                Purr-sonal Data: Rest assured, we will never share your personal
                information with any third parties. We value your privacy as
                much as a cat values an empty cardboard box.
              </li>
              <li>
                Scratching Post Policy: We cannot be held responsible for any
                furniture scratching incidents that may occur due to your cat's
                excitement or admiration of our website.
              </li>
              <li>
                Cat-clusive Content: Our website is designed for cats and cat
                lovers. If you are a dog enthusiast, you may experience
                occasional confusion or bouts of jealousy.
              </li>
              <li>
                Treats and Surprises: We occasionally offer surprises and
                treats. However, these are subject to availability, and we
                cannot guarantee your cat will share them with you.
              </li>
              <li>
                Paw-some Experience: We strive to make your visit as enjoyable
                as a catnip party. However, we cannot be held responsible for
                any sudden demands for belly rubs or head scratches from your
                feline companion.
              </li>
            </ol>
            <div className="mt-4">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={termsChecked}
                  onChange={handleTermsCheck}
                  className="form-checkbox h-5 w-5 text-purple-600"
                />
                <span className="ml-2 text-l text-gray-700">
                  I accept the terms and conditions by continuing to use your
                  website, I acknowledge that I have read, understood, and
                  accepted your funny terms and conditions. If I have any
                  questions, I shall contact your meow-nificent support team.
                </span>
              </label>
            </div>
          </div>
        </div>
      </Dialog>
    </div>
  );
}

export default SignUpPage;
