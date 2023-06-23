import React, { useState, useEffect, useContext } from 'react'
import axios from 'axios'
import { AuthContext } from '../context/AuthContextComponent'

export const CarContext = React.createContext()

export const CarContextProvider = (props) => {
  const { isLoggedIn } = useContext(AuthContext)
  const [cars, setCars] = useState([])

  useEffect(() => {
    if (isLoggedIn) {
      axios.get('https://luke-used-cars-backend-19ea42e37e12.herokuapp.com/api/saleposts', 
      {
        auth: {
          username: 'bret',
          password: 'bret'
        }
      })
        .then(response => {
          console.log('Response from server:', response.data); // Console log to check server response
          setCars(response.data);
        })
        .catch((error) => console.log(error))
    }
  }, [isLoggedIn])

  return (
    <CarContext.Provider value={{ cars, setCars }}>{props.children}</CarContext.Provider>
  )
}
