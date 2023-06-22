import React, { useState, useEffect } from 'react';
import axios from 'axios';

export const CarContext = React.createContext(); 

export const CarContextProvider = props => {
  const [cars, setCars] = useState([]);

  useEffect(() => {
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
      .catch(error => console.log(error));
  }, []);

  return (
    <CarContext.Provider value={{ cars }}>
    {props.children}
  </CarContext.Provider>
  );
};
