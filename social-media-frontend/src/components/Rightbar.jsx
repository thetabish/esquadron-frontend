import React, { useEffect, useState } from 'react';
import { IconButton, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, Button } from '@mui/material';
import { UilScenery, UilPlayCircle } from "@iconscout/react-unicons";
import img1 from "../assets/Korra.jpg";
import img2 from "../assets/Sokka.jpg";
import img3 from "../assets/Zuko.jpg";
import img4 from "../assets/Katara.jpg";

const Rightbar = () => {
  const [sugg, setSugg] = useState([]);
  const [following, setFollowing] = useState([]);
  const userData = JSON.parse(localStorage.getItem('userData'));
  const [dialogOpen, setDialogOpen] = useState(false);
  const [dialogText, setDialogText] = useState('');
  const fd = [];

  useEffect(() => {
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
        setFollowing(friendsData);
        
        
      })
      .catch((error) => {
        console.error('Error fetching friends:', error);
      });

    fetch("http://127.0.0.1:5000/get-all-users")
      .then((response) => response.json())
      .then((usersData) => {
        const users = usersData;
        
      const array3 = [];
      for (let i = 0; i < users.length; i++) {
        let found = false;
        for (let j = 0; j < following.length; j++) {
          if (users[i].user_name === following[j].user_name) {
            found = true;
            break;
          }
        }
        if (!found) {
          array3.push(users[i]);
        }
      }



      setSugg(array3);

        // Define the Followers array using the retrieved users
        // const followers = [
        //   { name: users[0], img: img1 },
        //   { name: users[1], img: img2 },
        //   { name: users[2], img: img3 },
        //   { name: users[3], img: img4 },
        // ];
      })
      .catch((error) => {
        console.error("Error fetching user data:", error);
      });

  },[userData.id], []);

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
    <div className="FollowersCard w-90% h-min flex flex-col gap-3 bg-slate-200 p-4 rounded-lg w-90% shadow-md mt-3 mr-3 py-5 font-poppins">
      <div className="flex justify-between items-center cursor-pointer">
        <div className="text-lg font-bold">Suggestions</div>
      </div>

      {sugg.slice(0, 5).map((follower, id) => {
        return (
          <div className="follower flex justify-between items-center" key={id}>
            <div className="flex gap-2">
              {/* <img src={follower.img} alt="" className="followerImage w-12 h-12 rounded-full" /> */}
              <div className="name flex flex-col items-start justify-center">
                <span className="font-bold" style={{ marginLeft: '20px' }}>{follower.user_name}</span>
              </div>
            </div>
            <button
              type="button"
              className="text-white bg-gradient-to-r from-purple-500 via-purple-600 to-purple-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-purple-300 dark:focus:ring-purple-800 font-small rounded-lg text-sm px-3 py-2 text-center mr-1 mb-1"
              onClick={() => handleAddFriend(follower.user_id)}
            >
              Follow
            </button>
          </div>
        );
      })}
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
};

export default Rightbar;
