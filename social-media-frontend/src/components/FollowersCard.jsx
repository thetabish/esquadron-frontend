import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";

const FollowersCard = () => {
  const [following, setFollowing] = useState([]);
  const [followers, setFollowers] = useState([]);
  const { viewedProfileId } = useParams();
  const [blockedUsers, setBlockedUsers] = useState([]);
  const [blockedadmin, setblockedadmin] = useState([]);
  const userData = JSON.parse(localStorage.getItem('userData'));

  const fetchFriendsData = () => {
    fetch('http://127.0.0.1:5000/get-friends', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ user_id: viewedProfileId }),
    })
      .then((response) => response.json())
      .then((friendsData) => {
        console.log('Friends:', friendsData);
        setFollowing(friendsData);
      })
      .catch((error) => {
        console.error('Error fetching friends:', error);
      });
  };

  const fetchFollowersData = () => {
    fetch('http://127.0.0.1:5000/get-followers', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ user_id: viewedProfileId }),
    })
      .then((response) => response.json())
      .then((followersData) => {
        console.log('Followers:', followersData);
        setFollowers(followersData);
      })
      .catch((error) => {
        console.error('Error fetching followers:', error);
      });
  };

  const fetchBlockedUsers = () => {
    fetch('http://127.0.0.1:5000/get-blocked-users', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ user_id: userData.id }),
    })
      .then((response) => response.json())
      .then((blockedUsersData) => {
        console.log('Blocked Users:', blockedUsersData);
        blockedUsersData = blockedUsersData.map((item) => item.id);
        setBlockedUsers(blockedUsersData);
      })
      .catch((error) => {
        console.error('Error fetching blocked users:', error);
      });
  };

  const blockedByAdmin = () => {
    fetch('http://127.0.0.1:5000/blocked-users')
              .then((response) => response.json())
              .then((blockadmin) => {
                setblockedadmin(blockadmin.blocked_users);
              })
              .catch((error) => {
                console.log(error.message);
              });
  };

  useEffect(() => {
    fetchFriendsData();
    fetchFollowersData();
    fetchBlockedUsers();
    blockedByAdmin();
  }, [userData.id]);

  const handleBlockUnblock = (userId, blockedUserId, endpoint) => {
    const payload = {
      user_id: userId,
      blocked_user_id: blockedUserId,
    };

    fetch(`http://127.0.0.1:5000${endpoint}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    })
      .then((response) => response.text())
      .then((result) => {
        console.log(result);
        // Refresh the data after blocking/unblocking
        fetchFriendsData();
        fetchFollowersData();
        fetchBlockedUsers();
      })
      .catch((error) => {
        console.error('Error blocking/unblocking user:', error);
      });
  };

  return (
    <div>
      <div className="FollowersCard w-90% h-min flex flex-col gap-3 bg-slate-200 p-4 rounded-lg w-90% shadow-md mt-3 mr-3 py-5 font-poppins">
        <div className="flex justify-between items-center cursor-pointer">
          <div className="text-lg font-bold" style={{ fontSize: '16px' }}>Following</div>
        </div>

        {following.length === 0 ? (
          <div className="text-center font-bold">No user found</div>
        ) : (
          following.map((follower, id) => {
            if (follower.id === parseInt(viewedProfileId)) {
              return null;
            }
            const isBlockedByAdmin = blockedadmin.includes(follower.id);
            const isBlockedByUser = blockedUsers.includes(follower.id);
            const renderLink = isBlockedByAdmin ? (
              <span className="font-bold" style={{ marginLeft: "20px" }}>
                {follower.user_name} is Blocked by admin
              </span>
            ) : (
              <Link to={`/profile/${follower.id}`} className="name flex flex-col items-start justify-center">
                <span className="font-bold" style={{ marginLeft: "20px" }}>
                  {follower.user_name}
                </span>
              </Link>
            );
            return (         
            <div
              className="follower flex justify-between items-center"
              key={id}
            >
              <div className=" flex gap-2">
                {/* <img src={follower.img} alt="" className="followerImage w-12 h-12 rounded-full" /> */}
                <div className="name flex flex-col items-start justify-center">
                {renderLink}
                </div>
              </div>
              {!isBlockedByAdmin && (
                  <>
                    {isBlockedByUser ? (
                      <button
                        className="text-green-500 cursor-pointer"
                        onClick={() => handleBlockUnblock(userData.id, follower.id, "/unblock-user")}
                      >
                        Unblock
                      </button>
                    ) : (
                      <button
                        className="text-red-500 cursor-pointer"
                        onClick={() => handleBlockUnblock(userData.id, follower.id, "/block-user")}
                      >
                        Block
                      </button>
                    )}
                  </>
                )}
              {/* {isBlockedByAdmin && <div>User blocked by admin</div>} */}
            </div>
            );
          })
        )}
      </div>

      <div className="FollowersCard w-90% h-min flex flex-col gap-3 bg-slate-200 p-4 rounded-lg w-90% shadow-md mt-3 mr-3 py-5 font-poppins">
        <div className="flex justify-between items-center cursor-pointer">
          <div className="text-lg font-bold" style={{ fontSize: '16px' }}>Followers</div>
        </div>

        {followers.length === 0 ? (
          <div className="text-center font-bold">No user found</div>
        ) : (
          followers.map((follower, id) => {
            if (follower.id === parseInt(viewedProfileId)) {
              return null;
            }
            
            const isBlockedByAdmin = blockedadmin.includes(follower.id);
            const isBlockedByUser = blockedUsers.includes(follower.id);
            const renderLink = isBlockedByAdmin ? (
              <span className="font-bold" style={{ marginLeft: "20px" }}>
                {follower.user_name} is Blocked by admin
              </span>
            ) : (
              <Link to={`/profile/${follower.id}`} className="name flex flex-col items-start justify-center">
                <span className="font-bold" style={{ marginLeft: "20px" }}>
                  {follower.user_name}
                </span>
              </Link>
            );
            return(
            <div
              className="follower flex justify-between items-center"
              key={id}
            >
              <div className=" flex gap-2">
                {/* <img src={follower.img} alt="" className="followerImage w-12 h-12 rounded-full" /> */}
                <div className="name flex flex-col items-start justify-center">
                {renderLink}
                </div>
              </div>
              {!isBlockedByAdmin && (
                  <>
                    {isBlockedByUser ? (
                      <button
                        className="text-green-500 cursor-pointer"
                        onClick={() => handleBlockUnblock(userData.id, follower.id, "/unblock-user")}
                      >
                        Unblock
                      </button>
                    ) : (
                      <button
                        className="text-red-500 cursor-pointer"
                        onClick={() => handleBlockUnblock(userData.id, follower.id, "/block-user")}
                      >
                        Block
                      </button>
                    )}
                  </>
                )}
              {/* {isBlockedByAdmin && <div>User blocked by admin</div>} */}
            </div>
            );
          })
        )}
      </div>
    </div>
  );
};

export default FollowersCard;
