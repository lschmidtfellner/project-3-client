import React, { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContextComponent';
import UpdateUsername from './updateUsername';

function Navbar() {
  const navigate = useNavigate();
  const { signOut } = useContext(AuthContext);
  const [showUpdateUsername, setShowUpdateUsername] = useState(false);

  const handleSignOut = () => {
    signOut();
    navigate('/auth/signin');
  };

  const handleUpdateUsernameClick = () => {
    setShowUpdateUsername(true);
  };
  
  const handleCloseUpdateUsername = () => {
    setShowUpdateUsername(false);
  };

  return (
    <nav className="navbar">
      <ul className="hamburger">
        <li>
          <Link to="/">Home/Feed</Link>
        </li>
        <li>
          <Link to="/usercarlistings">Your Listings</Link>
        </li>
        <li>
          <Link to="/post">Create New Listing</Link>
        </li>
        <li>
          <button onClick={handleUpdateUsernameClick}>Update Username</button>
        </li>
        <li>
          <button onClick={handleSignOut}>Sign Out</button>
        </li>
      </ul>
      <div className="logo">
        <h3>Logo</h3>
      </div>
      {showUpdateUsername && <UpdateUsername />}
    </nav>
  );
}

export default Navbar;
