import { Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import React, { useContext, useEffect, useState } from 'react';
import Signin from './pages/Signin';
import Signup from './pages/Signup';
import { CarContextProvider } from './components/CarContextProvider';
import AuthContextComponent, { AuthContext } from './context/AuthContextComponent';
import FeaturedCars from './components/FeaturedCars';
import CreateNewListing from './pages/CreateNewListing';
import api from './api/apiConfig';
import Nav from './components/Nav';
import CarDetails from './components/CarDetails';
import UserCarListings from './components/UserCarListings';
import UserCarListingsDetails from './components/UserCarListingsDetails';
import UpdateListing from './pages/UpdateListing';

function App() {
  return (
    <AuthContextComponent>
      {/* Use the AuthContextComponent to wrap the app */}
      <AppContent />
    </AuthContextComponent>
  )
}

const AppContent = () => {
  const { isLoggedIn, setIsLoggedIn } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const protectedRoutes = ['/post', '/updatepost'];

    if (protectedRoutes.includes(location.pathname) && !isLoggedIn) {
      navigate('/auth/signin', { replace: true });
    }
  }, [isLoggedIn, navigate, location]);

  return (
    <CarContextProvider>
        <Nav/>
      
      <Routes>
        <Route path="/auth/signup" element={<Signup />} />
        <Route path="/auth/signin" element={<Signin />} />
        <Route path="/" element={<FeaturedCars />} />
        <Route path="/post" element={isLoggedIn ? <CreateNewListing /> : <Signin />} />
        <Route path='/cardetails' element={ <CarDetails /> } />
        <Route path='/usercarlistings' element={ isLoggedIn ? <UserCarListings/> : <Signin/> } />
        <Route path='/usercarlistingsdetails' element={ <UserCarListingsDetails /> } />
        <Route path='/updatepost' element={isLoggedIn ? <UpdateListing /> : <Signin />} />
      </Routes>
    </CarContextProvider>
  )
}

export default App;
