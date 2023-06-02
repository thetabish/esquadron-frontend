import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { IconButton } from '@mui/material';
import { PersonAdd } from '@mui/icons-material';

import Navbar from '../components/Navbar'

function SearchPage() {
  const location = useLocation();
  const searchQuery = new URLSearchParams(location.search).get('query');
  const [profiles, setProfiles] = useState([]);

  useEffect(() => {
    // Make the API call using the searchQuery
    fetch(`http://127.0.0.1:5000/search?query=${searchQuery}`)
      .then((response) => response.json())
      .then((data) => {
        // Update the profiles state with the retrieved data
        setProfiles(data);
      })
      .catch((error) => {
        console.error('Error fetching profiles:', error);
      });
  }, [searchQuery]);

  const handleAddFriend = (profileId) => {
    // Add logic to handle adding a friend
    console.log(`Adding user with profile ID ${profileId} as a friend`);
  };

  return (
    <div>
      <div className="bg-black">
        <Navbar />
      </div>
      <div>
        <div className="container mx-auto px-4 py-8">
          <h1 className="text-3xl font-bold mb-4">Search Results</h1>
          {profiles.length > 0 ? (
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
              {profiles.map((profile) => (
                <div key={profile.id} className="bg-white rounded-lg p-4 shadow">
                  <div className="flex items-center justify-between mb-2">
                    <h2 className="text-xl font-semibold">{profile.user_name}</h2>
                    <IconButton
                      onClick={() => handleAddFriend(profile.id)}
                      color="primary"
                      aria-label="Add Friend"
                    >
                      <PersonAdd />
                    </IconButton>
                  </div>
                  <p className="text-gray-500">Date of Birth: {profile.date_of_birth}</p>
                  <p className="text-gray-500">From: {profile.country}, {profile.city}</p>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-center font-bold text-gray-500">No user found</p>
          )}
        </div>
      </div>
    </div>
  );
  
}

export default SearchPage;
