import { Link, useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from '../context/AuthContextComponent';

function Navbar() {
  const navigate = useNavigate();
  const { signOut } = useContext(AuthContext);

  const handleSignOut = () => {
    signOut();
    navigate('/auth/signin');
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
          <button onClick={handleSignOut}>Sign Out</button>
        </li>
      </ul>
      <div className="logo">
        <h3>Logo</h3>
      </div>
    </nav>
  );
}

export default Navbar;
