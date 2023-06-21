import { Link } from 'react-router-dom'

function Navbar() {
  return (
    <nav className="navbar">
      <ul className="hamburger">
        <li>
          <Link to="/">Home/Feed</Link>
        </li>
        <li>
          <Link to="/YourListings">Your Listings</Link>
        </li>
        <li>
          <Link to="/signout">Signout</Link>
        </li>
      </ul>
      <div className="logo">
        <h3>Logo</h3>
      </div>
    </nav>
  )
}

export default Navbar
