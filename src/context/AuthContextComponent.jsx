import React, { createContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

export const AuthContext = createContext(null)

export default function AuthContextComponent({ children }) {
  const [isLoggedIn, setIsLoggedIn] = useState(true)
  const [user, setUser] = useState({})
  const navigate = useNavigate() // Use the useNavigate hook

  useEffect(() => {
    const loggedIn = localStorage.getItem('loggedIn');
    setIsLoggedIn(loggedIn==="true");
  
    // Retrieve the user object from localStorage
    const user = localStorage.getItem('user');
    if (user) {
      setUser(JSON.parse(user));
    }
  }, [])

  const signOut = () => {
    // Clear user data
    setUser({})
  
    // Set isLoggedIn to false
    setIsLoggedIn(false)
  
    // Remove the token and loggedIn status from localStorage
    localStorage.removeItem('token')
    localStorage.removeItem('loggedIn')
  
    // Remove the user object from localStorage
    localStorage.removeItem('user')
  
    // Redirect the user to the sign-in page or any other desired location
    navigate('/auth/signin')
  }

  const signIn = (user) => {
    // Set the user object in the state
    setUser(user);
  
    // Store the user object in localStorage
    localStorage.setItem('user', JSON.stringify(user));
  }

  return (
    <AuthContext.Provider
      value={{ isLoggedIn, setIsLoggedIn, user, setUser, signIn, signOut }}
    >
      {children}
    </AuthContext.Provider>
  )
}
