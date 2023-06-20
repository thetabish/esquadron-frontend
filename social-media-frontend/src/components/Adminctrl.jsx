import React, { useState, useEffect } from 'react';

const Adminctrl = (props) => {
  const [users, setUsers] = useState([]);
  const [editingUser, setEditingUser] = useState(null);
  const [editedUserFields, setEditedUserFields] = useState({});
  const [error, setError] = useState(null);

  useEffect(() => {
    // Fetch user data from the API
    fetch('http://127.0.0.1:5000/get-all-users')
      .then(response => {
        return response.json();
      })
      .then(data => setUsers(data))
      .catch(error => setError(error.message));
  }, []);

  const handleEditUser = (event, user) => {
    event.preventDefault();
    setEditingUser(user.user_id);
    setEditedUserFields({
      user_name: user.user_name,
      email: user.email,
      date_of_birth: user.date_of_birth,
      country: user.country,
      city: user.city,
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
    // You can send the updated user data to the server using an HTTP request (e.g., fetch or axios)

    // After saving the changes, reset the editing state
    setEditingUser(null);
    setEditedUserFields({});
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
            {editingUser === user.user_id ? (
              <div>
                <input
                  type="text"
                  value={editedUserFields.user_name || ''}
                  onChange={event => handleFieldChange('user_name', event.target.value)}
                />
                <input
                  type="text"
                  value={editedUserFields.email || ''}
                  onChange={event => handleFieldChange('email', event.target.value)}
                />
                <input
                  type="text"
                  value={editedUserFields.date_of_birth || ''}
                  onChange={event => handleFieldChange('date_of_birth', event.target.value)}
                />
                <input
                  type="text"
                  value={editedUserFields.country || ''}
                  onChange={event => handleFieldChange('country', event.target.value)}
                />
                <input
                  type="text"
                  value={editedUserFields.city || ''}
                  onChange={event => handleFieldChange('city', event.target.value)}
                />
                <input
                  type="text"
                  value={editedUserFields.lives_in || ''}
                  onChange={event => handleFieldChange('lives_in', event.target.value)}
                />
                <input
                  type="text"
                  value={editedUserFields.relationship_status || ''}
                  onChange={event => handleFieldChange('relationship_status', event.target.value)}
                />
                <input
                  type="text"
                  value={editedUserFields.works_at || ''}
                  onChange={event => handleFieldChange('works_at', event.target.value)}
                />
                <button onClick={() => handleSaveUser(user)}>Save</button>
              </div>
            ) : (
              <div>
                <h3 className="text-lg font-bold mb-2">
                <a href={`/user/${user.user_id}`} className="text-blue-500 hover:underline">
                {user.user_name}
              </a>
                </h3>
                <p className="mb-2">Email: {user.email}</p>
                <p className="mb-2">Date of Birth: {user.date_of_birth}</p>
                <p className="mb-2">Country: {user.country}</p>
                <p className="mb-2">City: {user.city}</p>
                <p className="mb-2">Lives In: {user.lives_in || 'NA'}</p>
                <p className="mb-2">Relationship Status: {user.relationship_status || 'NA'}</p>
                <p className="mb-2">Works At: {user.works_at || 'NA'}</p>
                <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-3 rounded" onClick={event => handleEditUser(event, user)}>Edit</button>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default Adminctrl;
