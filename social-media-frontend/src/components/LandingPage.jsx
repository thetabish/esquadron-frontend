import React from "react";
import { Link } from "react-router-dom";
import logoImage from "../assets/logo.jpg";

const LandingPage = () => {
  return (
    <div className="bg-primary-200 min-h-screen flex items-center justify-center">
      <div className="container mx-auto p-4 flex flex-wrap">
        <div className="w-full md:w-3/4 md:pr-4 mb-8 md:mb-0">
        
          <h1 className="text-4xl mb-8">Welcome to Meowtopia
          <img src={logoImage} alt="Meowtopia Logo" className="w-25 h-25 mr-1 ml-4 inline-block" />
          </h1>
          <p className="text-gray-700 mb-8">
            At Meowtopia, we believe that cats bring joy, love, and laughter
            into our lives. Meowtopia is a vibrant and inclusive online
            community where cat lovers from around the world can connect, share
            their love for cats, and form meaningful connections with fellow
            feline enthusiasts.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h2 className="text-2xl mb-2">Connect with Cat Lovers</h2>
              <p className="text-gray-700 mb-2">
                Join a passionate community of cat lovers who share your
                enthusiasm for these adorable creatures. Meowtopia is the perfect
                platform to connect with like-minded individuals who understand
                your love for all things feline.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h2 className="text-2xl mb-2">Discover Cat Profiles</h2>
              <p className="text-gray-700 mb-2">
                Explore a vast collection of cat profiles, each showcasing
                unique and lovable feline companions. From playful kittens to
                majestic senior cats, Meowtopia offers a delightful opportunity
                to browse through diverse cat profiles, learn about different
                breeds, and appreciate the beauty of these amazing animals.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h2 className="text-2xl mb-1">Share Your Cat's Story</h2>
              <p className="text-gray-700 mb-1">
                Show off your beloved feline companion by creating a profile. Share captivating pictures, heartwarming
                stories, and amusing videos of your furry friend. Let the world
                discover the charm and personality of your beloved cat through
                your personalized cat profile.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h2 className="text-2xl mb-1">Connect and Interact</h2>
              <p className="text-gray-700 mb-1">
                Build friendships, share experiences, and seek support from a community that understands the unique joys and challenges of cat
                ownership.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h2 className="text-2xl mb-1">Stay Updated</h2>
              <p className="text-gray-700 mb-1">
                Receive likes, comments, and
                interactions on your profile. Stay connected with the latest
                activities of your friends and favorite cats within the
                Meowtopia community.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h2 className="text-2xl mb-1">Join Meowtopia</h2>
              <p className="text-gray-700 mb-1">
                Join Meowtopia today and become a part of this purrfect
                community that celebrates the bond between humans and cats.
              </p>
            </div>
          </div>
        </div>

        <div className="flex flex-col justify-center md:w-1/4 md:pl-4">
          <div className="bg-blue-200 p-8 flex flex-col justify-center items-center rounded-md">
            <h2 className="text-2xl mb-2 text-black">Join Us</h2>
            <Link
              to="/signin"
              className="w-full bg-white text-black-500 py-3 px-4 rounded mb-2 hover:bg-blue-100"
            >
              Sign In
            </Link>
            <Link
              to="/signup"
              className="w-full bg-white text-black-500 py-3 px-4 rounded hover:bg-blue-100"
            >
              Sign Up
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
