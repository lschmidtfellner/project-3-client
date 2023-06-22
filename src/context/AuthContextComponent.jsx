import React, { createContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { isTokenValid, getUserInfo } from '../api/auth'; // Import the isTokenValid and getUserInfo functions

export const AuthContext = createContext(null);

export default function AuthContextComponent({ children }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState({});
  const navigate = useNavigate();

  // Validate the token when the application starts
  useEffect(() => {
    async function validateToken() {
      const token = localStorage.getItem('token');
      if (token) {
        const response = await isTokenValid(); // Validate the token
        if (response.success) {
          setIsLoggedIn(true);

          // Retrieve user info
          const userInfo = await getUserInfo();
          if (!userInfo.error) {
            setUser(userInfo);
          }
        }
      }
    }

    validateToken();
  }, []);

  const signOut = () => {
    // Clear user data
    setUser({});
    // Set isLoggedIn to false
    setIsLoggedIn(false);
    // Perform any additional sign-out logic (e.g., API calls, etc.)
  
    // Delete the token from local storage
    localStorage.removeItem('token');
  
    // Redirect the user to the sign-in page or any other desired location
    navigate('/auth/signin');
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, setIsLoggedIn, user, setUser, signOut }}>
      {children}
    </AuthContext.Provider>
  );
}
