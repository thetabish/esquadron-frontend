import React, { useState, useEffect } from 'react';


const Adminctrl = (props) => {
  const [users, setUsers] = useState([]);
  const [editingUser, setEditingUser] = useState(null);
  const [editedUserFields, setEditedUserFields] = useState({});
  const [error, setError] = useState(null);
  const [blockedUsers, setBlockedUsers] = useState([]);

  useEffect(() => {
    // Fetch user data from the API
    fetch('http://127.0.0.1:5000/get-all-users')
      .then(response => response.json())
      .then(data => setUsers(data))
      .catch(error => setError(error.message));

    // Fetch blocked user data from the API
    fetch('http://127.0.0.1:5000/blocked-users')
      .then(response => response.json())
      .then(data => {
        const blockedUserIds = data.blocked_users;
        setBlockedUsers(blockedUserIds);
      })
      .catch(error => setError(error.message));
  }, []);

  const handleBlockUser = (user, isBlocked) => {
    // Check if the user is already blocked

    // Update the user's blocked status in the backend API
    fetch('http://127.0.0.1:5000/update-blocked-users', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        user_id: user.user_id,
        block: isBlocked,
      }),
    })
      .then(response => response.json())
      .then(data => {
        // Handle the response from the server (e.g., show success message)
        console.log('User blocked/unblocked:', data);

        // Update the blockedUsers state
        setBlockedUsers(prevBlockedUsers => {
          if (isBlocked) {
            return [...prevBlockedUsers, user.user_id];
          } else {
            return prevBlockedUsers.filter(userId => userId !== user.user_id);
          }
        });
  
        // Update the user's block status directly in the users array
        setUsers(prevUsers => {
          const updatedUsers = prevUsers.map(prevUser => {
            if (prevUser.user_id === user.user_id) {
              return {
                ...prevUser,
                is_blocked: isBlocked,
              };
            }
            return prevUser;
          });
          return updatedUsers;
        });
      
      })
      .catch(error => {
        // Handle any error that occurs during the API call
        console.error('Error blocking/unblocking user:', error);
      });
  };

  const handleEditUser = (event, user) => {
    event.preventDefault();
    setEditingUser(user.user_id);
    setEditedUserFields({
      user_name: user.user_name || '',
      email: user.email || '',
      date_of_birth: user.date_of_birth || '',
      country: user.country || '',
      city: user.city || '',
      lives_in: user.lives_in || 'NA',
      relationship_status: user.relationship_status || 'NA',
      works_at: user.works_at || 'NA'
    });
  };

  const handleFieldChange = (field, value) => {
    setEditedUserFields(prevFields => ({
      ...prevFields,
      [field]: value
    }));
  };

  const handleSaveUser = (user) => {
    // Update the user data in the backend API
    fetch('http://127.0.0.1:5000/update-admin-data', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        user_id: user.user_id,
        user_name: editedUserFields.user_name,
        email: editedUserFields.email,
        date_of_birth: editedUserFields.date_of_birth,
        country: editedUserFields.country,
        city: editedUserFields.city,
        lives_in: editedUserFields.lives_in,
        relationship_status: editedUserFields.relationship_status,
        works_at: editedUserFields.works_at,
      }),
    })
      .then(response => response.json())
      .then(data => {
        // Handle the response from the server (e.g., show success message)
        console.log('User data updated:', data);
  
        // After saving the changes, reset the editing state
        
    window.location.reload(); // Refresh the page
      })
      .catch(error => {
        // Handle any error that occurs during the API call
        console.error('Error updating user data:', error);
      });
  };

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="flex flex-col gap-4 items-center overflow-auto">
      <h2 className="text-2xl font-bold">All Users</h2>
      <div className="grid grid-cols-4 gap-4">
        {users.map(user => (
          <div key={user.user_id} className="border p-4 rounded-lg shadow-md">
            <div className="grid grid-cols-1">
              <div className="flex justify-between items-center mb-2">
                <label className="font-bold">User Name:</label>
                <input
                  type="text"
                  value={editingUser === user.user_id ? editedUserFields.user_name : user.user_name}
                  onChange={event => handleFieldChange('user_name', event.target.value)}
                  readOnly={editingUser !== user.user_id}
                  className={`border rounded p-1 ${editingUser === user.user_id ? '' : 'border-transparent'}`}
                />
                <div>
                {blockedUsers.includes(user.user_id) ? (
                  <button
                    className="text-green-500 cursor-pointer"
                    onClick={() => handleBlockUser(user, false)}
                  >
                    Unblock
                  </button>
                ) : (
                  <button
                    className="text-red-500 cursor-pointer"
                    onClick={() => handleBlockUser(user, true)}
                  >
                    Block
                  </button>
                )}
</div>
              </div>
              <div className="mb-2">
                <label className="font-bold">Email:</label>
                <input
                  type="text"
                  value={editingUser === user.user_id ? editedUserFields.email : user.email}
                  onChange={event => handleFieldChange('email', event.target.value)}
                  readOnly={editingUser !== user.user_id}
                  className={`border rounded p-1 ${editingUser === user.user_id ? '' : 'border-transparent'}`}
                />
              </div>
              <div className="mb-2">
                <label className="font-bold">Date of Birth:</label>
                <input
                  type="text"
                  value={editingUser === user.user_id ? editedUserFields.date_of_birth : user.date_of_birth}
                  onChange={event => handleFieldChange('date_of_birth', event.target.value)}
                  readOnly={editingUser !== user.user_id}
                  className={`border rounded p-1 ${editingUser === user.user_id ? '' : 'border-transparent'}`}
                />
              </div>
              <div className="mb-2">
                <label className="font-bold">Country:</label>
                <input
                  type="text"
                  value={editingUser === user.user_id ? editedUserFields.country : user.country}
                  onChange={event => handleFieldChange('country', event.target.value)}
                  readOnly={editingUser !== user.user_id}
                  className={`border rounded p-1 ${editingUser === user.user_id ? '' : 'border-transparent'}`}
                />
              </div>
              <div className="mb-2">
                <label className="font-bold">City:</label>
                <input
                  type="text"
                  value={editingUser === user.user_id ? editedUserFields.city : user.city}
                  onChange={event => handleFieldChange('city', event.target.value)}
                  readOnly={editingUser !== user.user_id}
                  className={`border rounded p-1 ${editingUser === user.user_id ? '' : 'border-transparent'}`}
                />
              </div>
              <div className="mb-2">
                <label className="font-bold">Lives In:</label>
                <input
                  type="text"
                  value={editingUser === user.user_id ? editedUserFields.lives_in : user.lives_in || 'NA'}
                  onChange={event => handleFieldChange('lives_in', event.target.value)}
                  readOnly={editingUser !== user.user_id}
                  className={`border rounded p-1 ${editingUser === user.user_id ? '' : 'border-transparent'}`}
                />
              </div>
              <div className="mb-2">
                <label className="font-bold">Relationship Status:</label>
                <input
                  type="text"
                  value={editingUser === user.user_id ? editedUserFields.relationship_status : user.relationship_status || 'NA'}
                  onChange={event => handleFieldChange('relationship_status', event.target.value)}
                  readOnly={editingUser !== user.user_id}
                  className={`border rounded p-1 ${editingUser === user.user_id ? '' : 'border-transparent'}`}
                />
              </div>
              <div className="mb-2">
                <label className="font-bold">Works At:</label>
                <input
                  type="text"
                  value={editingUser === user.user_id ? editedUserFields.works_at : user.works_at || 'NA'}
                  onChange={event => handleFieldChange('works_at', event.target.value)}
                  readOnly={editingUser !== user.user_id}
                  className={`border rounded p-1 ${editingUser === user.user_id ? '' : 'border-transparent'}`}
                />
              </div>
              {editingUser === user.user_id ? (
                <button
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-3 rounded"
                  onClick={() => handleSaveUser(user)}
                >
                  Save
                </button>
              ) : (
                <button
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-3 rounded"
                  onClick={event => handleEditUser(event, user)}
                >
                  Edit
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
  
};

export default Adminctrl;
