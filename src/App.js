
import { Routes, Route, Navigate } from 'react-router-dom';
import { useContext, useEffect } from 'react';
import Signin from './pages/Signin';
import Signup from './pages/Signup';
import { AuthContext } from './context/AuthContextComponent';

function App() {
  const { isLoggedIn, setIsLoggedIn } = useContext(AuthContext)

  useEffect(() => {
    console.log(isLoggedIn);
  }, [isLoggedIn]);
  
  return (
    <>
    </>
  );
}

export default App;
