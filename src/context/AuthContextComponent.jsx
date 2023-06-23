import React, { createContext, useEffect, useState } from 'react'
// import { useNavigate } from 'react-router-dom'
import { isTokenValid } from '../api/auth';

export const AuthContext = createContext(null)

export default function AuthContextComponent({ children }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState({});
  // const navigate = useNavigate();

  useEffect(() => {
    const validateToken = async () => {
      const token = localStorage.getItem('token');
      console.log('Token:', token);
      if (token) {
        try {
          const { success } = await isTokenValid();
          setIsLoggedIn(success);
        } catch (error) {
          // Handle the 401 error
          setIsLoggedIn(false);
        }
      }
    };
  
    validateToken();
  }, []);
  
  const signOut = () => {
    setUser({})
    setIsLoggedIn(false)
    localStorage.removeItem('token')
    localStorage.removeItem('loggedIn')
    localStorage.removeItem('user')
    // navigate('/auth/signin')
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
