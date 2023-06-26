import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from '../context/AuthContextComponent';
import LottieAnimation from './LottieAnimation';

function Navbar() {
  const navigate = useNavigate();
  const { signOut } = useContext(AuthContext);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isNavbarFolded, setIsNavbarFolded] = useState(false);
  
    const toggleMenu = () => {
      setIsMenuOpen(!isMenuOpen);
    };

  const handleSignOut = () => {
    signOut();
    navigate('/auth/signin');
  };

  useEffect(() => {
    const handleScroll = () => {
      const isTop = window.scrollY === 0;
      setIsNavbarFolded(!isTop);
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);


 
  return (
  <nav className={`navbar fixed top-0 w-full py-4 bg-white shadow-md ${
    isNavbarFolded ? 'translate-y-0' : '-translate-y-full'
  } transition-transform duration-300`}>
    
  <div className="hidden lg:flex md:flex">
  <div className="container mx-auto flex justify-center">
    <ul className="flex justify-center text-center items-center w-full py-2">
      <li className="flex-grow">
      <Link to="/" className="blue hover:text-black">home</Link>
      </li>
      <li className="flex-grow">
      <Link to="/usercarlistings" className="blue hover:text-black">your listings</Link>
      </li>
      <li className="flex-grow">
      <h1 className="text-center text-5xl pink">REV RADAR</h1>
      </li>
      <li className="flex-grow">
      <Link to="/post" className="blue hover:text-black">create new listing</Link>
      </li>
      <li className="flex-grow">
      <button onClick={handleSignOut} className="blue hover:text-black text-xs">Sign Out</button>
      </li>
    </ul>
  </div>
  </div>
  {/* Start Mobile View */}
  <div className="lg:hidden md:hidden flex justify-around items-center mt-6">
      <h1 className={`text-center pink ${isMenuOpen ? 'text-2xl' : 'text-4xl'}`}>REV RADAR</h1>
  <button
      type="button"
      className="block blue hover:text-black focus:text-black ml-3"
      onClick={toggleMenu}
    >
      <svg
        className="h-6 w-6 blue-bg"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M3 5h18v2H3V5zm0 6h18v2H3v-2zm0 6h18v2H3v-2z"
        />
      </svg>
    </button>
    <ul className={`md:flex ${isMenuOpen ? 'text-sm block ml-3' : 'hidden'}`}>
    <li className="flex-grow">
      <Link to="/" className="blue font-bold hover:text-black">home</Link>
      </li>
      <li className="flex-grow">
      <Link to="/usercarlistings" className="blue font-bold  hover:text-black">your listings</Link>
      </li>
      <li className="flex-grow">
      <Link to="/post" className="blue font-bold  hover:text-black">create new listing</Link>
      </li>
      <li className="flex-grow">
      <button onClick={handleSignOut} className="blue font-bold hover:text-black text-xs">sign out</button>
      </li>
    </ul>
    </div>
    {/* <div className="lg:w-1/3 md:w-1/3 w-full mx-auto bg-white"> */}
        {/* <LottieAnimation />Render the LottieAnimation component */}
        {/* <LottieAnimation />
      </div> */}
</nav>
);
}

export default Navbar;