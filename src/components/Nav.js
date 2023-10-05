import React, { useState, useEffect } from 'react'
import revLogo from '../assets/revlogo.png'
import { ReactComponent as Hamburger } from '../assets/revmenu.svg'
import { ReactComponent as CloseX } from '../assets/revx.svg'
import { useNavigate } from 'react-router-dom'

function Nav({ isLoggedin, setIsLoggedIn }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isNavVisible, setIsNavVisible] = useState(true)
  const [lastScrollPosition, setLastScrollPosition] = useState(0)
  const navigate = useNavigate()
  const loggedIn = localStorage.getItem('loggedIn')
  const menuToggle = () => {
    setIsMenuOpen((prev) => !prev)
  }
  const handleNavigate = (path) => {
    window.scrollTo({top: 0})
  setTimeout(() => {
    navigate(path);
  }, 100);
    menuToggle()
  }

  const navNoToggle = (path) => {
    window.scrollTo({top: 0})
  setTimeout(() => {
    navigate(path);
  }, 100); 
  }

  const handleScroll = () => {
    const currentScrollPosition = window.scrollY
    if (currentScrollPosition < lastScrollPosition) {
      setIsNavVisible(true)
    } else {
      setIsNavVisible(false)
    }
    setLastScrollPosition(currentScrollPosition)
  }

  useEffect(() => {
    window.addEventListener('scroll', handleScroll)
    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [lastScrollPosition])

  const handleSignout = () => {
    setIsLoggedIn(false)
    localStorage.removeItem('user')
    localStorage.removeItem('token')
    localStorage.removeItem('loggedIn')
    navigate('/auth/signin')
    window.location.reload()
  }

  return (
    <div className="fixed z-50">
      <div
        onClick={() => menuToggle()}
        style={{ display: isMenuOpen ? 'block' : 'none' }}
        className="overlay bg-[#000000] fixed opacity-50 top-0 right-0 bottom-0 left-0"
      ></div>
      <div
        style={{ display: isMenuOpen ? 'block' : 'none' }}
        className="menu bg-off-white fixed top-[90px] py-10 leading-10 right-0 left-0 text-center text-2xl border-b border-black"
      >
        <h2 onClick={() => handleNavigate('/')}>Home</h2>
        <h2 onClick={() => handleNavigate('/usercarlistings')}>
          Your Listings
        </h2>
        <h2 onClick={() => handleNavigate('/post')}>Create Listing</h2>
        {loggedIn ? (
          <h2 onClick={() => handleSignout()}>Sign Out</h2>
        ) : (
          <h2 onClick={() => handleNavigate('/auth/signin')}>Sign In</h2>
        )}
      </div>
      <div
        style={{ top: isNavVisible ? '0' : '-100px', transition: 'top 0.3s' }}
        className="fixed bg-off-white border-b border-black flex items-center nav h-[90px] w-full"
      >
        <div className="flex justify-between w-full px-5 sm:px-24 lg:px-52 xl:px-72">
          <div className="w-6 md:hidden" />
          <img src={revLogo} alt="Rev Logo" className="h-7 w-auto" />
          <div className="w-8 flex items-end justify-end md:hidden">
            {isMenuOpen ? (
              <CloseX
                className="h-6 align-right"
                onClick={() => menuToggle()}
              />
            ) : (
              <Hamburger
                className="h-6 align-right"
                onClick={() => menuToggle()}
              />
            )}
          </div>
            <div className='flex gap-x-8 mt-1 font-bold'>
              <h2 onClick={() => navNoToggle('/')}>Home</h2>
              <h2 onClick={() => navNoToggle('/usercarlistings')}>
                Your Listings
              </h2>
              <h2 onClick={() => navNoToggle('/post')}>Create Listing</h2>
              {loggedIn ? (
                <h2 onClick={() => handleSignout()}>Sign Out</h2>
              ) : (
                <h2 onClick={() => navNoToggle('/auth/signin')}>Sign In</h2>
              )}
            </div>
        </div>
      </div>
    </div>
  )
}

export default Nav
