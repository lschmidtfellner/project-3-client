import React, { useState } from 'react'
import revLogo from '../assets/revlogo.png'
import { ReactComponent as Hamburger } from '../assets/revmenu.svg'
import { ReactComponent as CloseX } from '../assets/revx.svg'
import { useNavigate } from 'react-router-dom'

function Nav({ isLoggedin, setIsLoggedIn }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const navigate = useNavigate()
  const menuToggle = () => {
    setIsMenuOpen((prev) => !prev)
  }
  const handleNavigate = (path) => {
    navigate(path)
    menuToggle()
  }

  return (
    <div>
      <div onClick={() => menuToggle()} style={{display: isMenuOpen ? 'block' : 'none'}} className='overlay bg-[#000000] fixed opacity-50 top-0 right-0 bottom-0 left-0'>
      </div>
      <div style={{display: isMenuOpen ? 'block' : 'none'}} className='bg-off-white fixed top-[90px] py-10 leading-10 right-0 left-0 text-center text-2xl border-b border-black'>
          <h2 onClick={() => handleNavigate('/')}>Home</h2>
          <h2 onClick={() => handleNavigate('/usercarlistings')}>Your Listings</h2>
          <h2 onClick={() => handleNavigate('/post')}>Create Listing</h2>
          {isLoggedin ? <h2>Sign Out</h2> : <h2>Sign In</h2>}
        </div>
      <div className="fixed bg-off-white border-b border-black flex items-center nav h-[90px] w-full">
        <div className="flex justify-between w-full px-5">
          <div className="w-6" />
          <img src={revLogo} alt="Rev Logo" className="h-7 w-auto" />
          <div className="w-8 flex items-end justify-end">
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
        </div>
      </div>
    </div>
  )
}

export default Nav
