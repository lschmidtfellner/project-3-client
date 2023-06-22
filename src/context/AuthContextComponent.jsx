import React, { createContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

export const AuthContext = createContext(null)

export default function AuthContextComponent({ children }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [user, setUser] = useState({})
  const navigate = useNavigate() // Use the useNavigate hook

  useEffect(() => {
    const loggedIn = localStorage.getItem('loggedIn');
    setIsLoggedIn(loggedIn);
  }, [])

  const signOut = () => {
    // Clear user data
    setUser({})
    // Set isLoggedIn to false
    setIsLoggedIn(false)
    // localStorage.setItem('loggedIn', false)
    // Perform any additional sign-out logic (e.g., API calls, etc.)

    // Delete the token from local storage
    localStorage.removeItem('token')
    localStorage.removeItem('loggedIn')

    // Redirect the user to the sign-in page or any other desired location
    navigate('/auth/signin')
  }

  const signIn = (userName) => {
    setUser()
  }

  return (
    <AuthContext.Provider
      value={{ isLoggedIn, setIsLoggedIn, user, setUser, signIn, signOut }}
    >
      {children}
    </AuthContext.Provider>
  )
}
