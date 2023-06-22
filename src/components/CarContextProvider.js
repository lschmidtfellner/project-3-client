import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../context/AuthContextComponent';

export const CarContext = React.createContext();

export const CarContextProvider = (props) => {
  const [cars, setCars] = useState([]);
  const { isLoggedIn } = useContext(AuthContext);

  useEffect(() => {
    if (isLoggedIn) {
      axios
        .get('https://luke-used-cars-backend-19ea42e37e12.herokuapp.com/api/saleposts', {
          auth: {
            username: 'luke',
            password: 'test@test.com',
          },
        })
        .then((response) => {
          console.log('Response from server:', response.data);
          setCars(response.data);
        })
        .catch((error) => console.log(error));
    } else {
      setCars([]); // If not logged in, set cars to an empty array
    }
  }, [isLoggedIn]);

  return (
    <CarContext.Provider value={{ cars }}>{props.children}</CarContext.Provider>
  );
};
