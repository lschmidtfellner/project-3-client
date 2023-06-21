
import { Routes, Route, Navigate } from 'react-router-dom';
import { useContext, useEffect } from 'react';
import Signin from './pages/Signin';
import Signup from './pages/Signup';
import { AuthContext } from './context/AuthContextComponent';
import { CarContextProvider } from './components/CarContextProvider';
import FeaturedCars from './components/FeaturedCars';
import CreateNewListing from './pages/CreateNewListing';
import api from './api/apiConfig';

function App() {
  const { isLoggedIn, setIsLoggedIn } = useContext(AuthContext)

  useEffect(() => {
    console.log(isLoggedIn);
  }, [isLoggedIn]);
  
  return (
    <>
    <CarContextProvider>
      <CreateNewListing />
    </CarContextProvider>
    </>
  );
}

export default App;
