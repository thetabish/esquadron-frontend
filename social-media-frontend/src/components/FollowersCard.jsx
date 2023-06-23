import React, { useEffect, useState } from 'react';
const FollowersCard = () => {
  
  const [following, setFollowing] = useState([]);
  const [followers, setFollowers] = useState([]);
  
  const userData = JSON.parse(localStorage.getItem('userData'));
  
  useEffect(() => {
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
          setFollowing(friendsData);
          
          
        })
        .catch((error) => {
          console.error('Error fetching friends:', error);
        });

        fetch('http://127.0.0.1:5000/get-followers', {
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
          setFollowers(friendsData);
          
          
        })
        .catch((error) => {
          console.error('Error fetching friends:', error);
        });
  }, [userData.id], [userData.id]);
  
  return (
    <div>
      <div className="FollowersCard w-90% h-min flex flex-col gap-3 bg-slate-200 p-4 rounded-lg w-90% shadow-md mt-3 mr-3 py-5 font-poppins">

<div className="flex justify-between items-center cursor-pointer">
      <div className="text-lg font-bold" style={{ fontSize: '16px' }}>Following</div>
  </div>


  {following.length === 0 ? (
  <div className="text-center font-bold">No user found</div>
) : (
  following.map((follower, id) => (
    <div className="follower flex justify-between items-center" key={id}>
      <div className=" flex gap-2">
        {/* <img src={follower.img} alt="" className="followerImage w-12 h-12 rounded-full" /> */}
        <div className="name flex flex-col items-start justify-center">
          <span className="font-bold" style={{ marginLeft: '20px' }}>{follower.user_name}</span>
        </div>
      </div>
    </div>
  ))
)}
</div>
<div className="FollowersCard w-90% h-min flex flex-col gap-3 bg-slate-200 p-4 rounded-lg w-90% shadow-md mt-3 mr-3 py-5 font-poppins">

      <div className="flex justify-between items-center cursor-pointer">
            <div className="text-lg font-bold" style={{ fontSize: '16px' }}>Followers</div>
        </div>

      
        {followers.length === 0 ? (
        <div className="text-center font-bold">No user found</div>
      ) : (
        followers.map((follower, id) => (
          <div className="follower flex justify-between items-center" key={id}>
            <div className=" flex gap-2">
              {/* <img src={follower.img} alt="" className="followerImage w-12 h-12 rounded-full" /> */}
              <div className="name flex flex-col items-start justify-center">
                <span className="font-bold" style={{ marginLeft: '20px' }}>{follower.user_name}</span>
              </div>
            </div>
          </div>
        ))
      )}
    </div>
    </div>
    
    
  );
};

export default FollowersCard;
