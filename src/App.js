
import { Routes, Route } from 'react-router-dom'
import React, { useContext } from 'react'
import Signin from './pages/Signin'
import Signup from './pages/Signup'
import { CarContextProvider } from './components/CarContextProvider'
import FeaturedCars from './components/FeaturedCars'
import CreateNewListing from './pages/CreateNewListing'
import api from './api/apiConfig'
import AuthContextComponent, {
  AuthContext
} from './context/AuthContextComponent'
import Nav from './components/Nav'
import CarDetails from './components/CarDetails'
import UserCarListings from './components/UserCarListings'
import UserCarListingsDetails from './components/UserCarListingsDetails'

function App() {
  return (
    <AuthContextComponent>
      {' '}
      {/* Use the AuthContextComponent to wrap the app */}
      <AppContent />
    </AuthContextComponent>
  )
}

const AppContent = () => {
  const { isLoggedIn, setIsLoggedIn } = useContext(AuthContext)

  return (
    <CarContextProvider>
      <Nav isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
      <Routes>
        <Route path="/auth/signup" element={<Signup />} />
        <Route path="/auth/signin" element={<Signin />} />
        <Route
          path="/home"
          element={isLoggedIn ? <FeaturedCars /> : <Signin />}
        />
        <Route path="/post" element={isLoggedIn ? <CreateNewListing /> : <Signin/>} />
        <Route path='/cardetails' element={isLoggedIn ? <CarDetails /> : <Signin/> } />
        <Route path='/usercarlistings' element={isLoggedIn ? <UserCarListings /> : <Signin/> } />
        <Route path='/usercarlistingsdetails' element={isLoggedIn ? <UserCarListingsDetails /> : <Signin/> } />
      </Routes>
    </CarContextProvider>
  )
}

export default App
