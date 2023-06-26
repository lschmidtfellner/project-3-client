import React, { useState } from 'react';
import { updateUsername } from '../api/auth.js'

const UpdateUsername = () => {
  const [newUsername, setNewUsername] = useState({
    username: ''
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const handleChange = (e) => {
    console.log('handle change')
    const {name, value} = e.target
    setNewUsername({
        ...newUsername, 
        [name]: value 
    })
  }

  const handleUpdateUsername = async (e) => {
    e.preventDefault();
    console.log('submitted', newUsername);
    try {
      await updateUsername(newUsername);
      setError('');
      setSuccess(true);
      // reload the page once updateUsername has successfully completed
      window.location.reload(); 
    } catch (error) {
      console.error('Error updating username:', error);
      setError(error.message);
    }
  };

  return (
    <div>
      <h2>Update Username</h2>
     <form>
      <input
        type="text"
        value={newUsername.username}
        name = 'username'
        onChange={handleChange}
        placeholder="New Username"
      />
      <button type= 'submit' onClick={handleUpdateUsername}>Update</button>
      </form>
      {error && <p>{error}</p>}
      {success && <p>Username updated successfully!</p>}
    </div>
  );
};

export default UpdateUsername;
