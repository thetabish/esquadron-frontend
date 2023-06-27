import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { IconButton, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, Button } from '@mui/material';
import { PersonAdd } from '@mui/icons-material';

import Navbar from '../components/Navbar'

function SearchPage() {
  const location = useLocation();
  const searchQuery = new URLSearchParams(location.search).get('query');
  const userData = JSON.parse(localStorage.getItem('userData'));
  const [profiles, setProfiles] = useState([]);
  const [friends, setFriends] = useState([]);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [dialogText, setDialogText] = useState('');
  const friendsId = [];

  useEffect(() => {
    // Make the API call using the searchQuery
    fetch(`http://127.0.0.1:5000/search?query=${searchQuery}`)
      .then((response) => response.json())
      .then((data) => {
        const idsToRemove = [31, userData.id]
        const updatedUsers = data.filter(data => !idsToRemove.includes(data.id));
        // Update the profiles state with the retrieved data
        setProfiles(updatedUsers);
      })
      .catch((error) => {
        console.error('Error fetching profiles:', error);
      });


      // Make the API call to get the list of friends for the current user
      fetch('http://127.0.0.1:5000/get-friends', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ user_id: userData.id }),
      })
        .then((response) => response.json())
        .then((friendsData) => {
          // Handle the retrieved friends data
          // For example, you can update a friends state variable with the data
          console.log('Friends:', friendsData);
          const friendsId = friendsData.map((friend) => friend.id); // Create an array of friend ids
          setFriends(friendsId);
          
          
        })
        .catch((error) => {
          console.error('Error fetching friends:', error);
        });
  }, [searchQuery, userData.id]);

  const handleAddFriend = (profileId) => {
    const user_id = userData.id;
    const friend_id = profileId;
  
    // Create the request payload
    const payload = JSON.stringify({
      user_id: user_id,
      friend_id: friend_id
    });
  
    // Make the API call to add a friend
    fetch('http://127.0.0.1:5000/add-friend', {
      method: 'POST',
      body: payload,
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then((response) => response.text())
      .then((data) => {
        console.log(data);
        setDialogText(data);
        setDialogOpen(true);
      })
      .catch((error) => {
        console.error('Error adding friend:', error);
      });
  };
  const handleCloseDialog = () => {
    setDialogOpen(false); // Close the dialog box
    window.location.reload(); // Refresh the page
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
                    {!friends.includes(profile.id) && ( // Check if the profile.id is not in friends
                    <IconButton
                      onClick={() => handleAddFriend(profile.id)}
                      color="primary"
                      aria-label="Add Friend"
                    >
                      <PersonAdd />
                    </IconButton>
                  )}
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
      <Dialog open={dialogOpen} onClose={handleCloseDialog}>
        <DialogTitle>Status</DialogTitle>
        <DialogContent>
          <DialogContentText>{dialogText}</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
  
}

export default SearchPage;
