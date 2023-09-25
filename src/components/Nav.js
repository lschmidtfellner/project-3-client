import React, { useState } from 'react'
import revLogo from '../assets/revlogo.png'
import { ReactComponent as Hamburger } from '../assets/revmenu.svg'
import { ReactComponent as CloseX } from '../assets/revx.svg'

function Nav() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const menuToggle = () => {
    setIsMenuOpen((prev) => !prev)
  }
  return (
    <div className="fixed flex items-center nav h-[100px] w-full">
      <div className="flex justify-between w-full px-5">
        <div className="w-6" />
        <img src={revLogo} alt="Rev Logo" className="h-7 w-auto" />
        <div className='w-8'>
          {isMenuOpen ? (
            <CloseX className="h-6 align-right" onClick={() => menuToggle()} />
          ) : (
            <Hamburger className="h-6 align-right" onClick={() => menuToggle()} />
          )}
        </div>
      </div>
    </div>
  )
}

export default Nav
