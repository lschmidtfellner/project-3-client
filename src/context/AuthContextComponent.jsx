import React, { createContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';

export const AuthContext = createContext(null);

export default function AuthContextComponent({ children }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState({});
  const navigate = useNavigate(); // Use the useNavigate hook

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
    <AuthContext.Provider value={{ isLoggedIn, setIsLoggedIn, user, signOut }}>
      {children}
    </AuthContext.Provider>
  );
}
