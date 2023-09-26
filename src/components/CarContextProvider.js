import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { serverUrl } from '../controller/controller'


export const CarContext = React.createContext()

export const CarContextProvider = (props) => {
  const [cars, setCars] = useState([])

  useEffect(() => {
    
      axios.get(`${serverUrl}api/saleposts`)
        .then(response => {
          console.log('Response from server:', response.data); // Console log to check server response
          setCars(response.data);
        })
        .catch((error) => console.log(error))
    
  }, []);

  return (
    <CarContext.Provider value={{ cars, setCars }}>{props.children}</CarContext.Provider>
  )
}
