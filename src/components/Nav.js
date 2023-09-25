import React from 'react'
import {ReactComponent as RevLogo} from '../assets/revlogo.svg'
import {ReactComponent as Hamburger} from '../assets/revmenu.svg'
import {ReactComponent as CloseX} from '../assets/revx.svg'

function Nav({isMenuOpen, setIsMenuOpen}) {
  return (
    <div className='flex justify-center items-center z-100 h-20 border-b-0 bg--off-white border-black w-full'>
      <RevLogo className='h-5 fill-black z-1'/>
    </div>
  )
}

export default Nav