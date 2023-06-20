// This component fetches the car data from backend and provides it to the rest of the app.

import React, { useState, useEffect } from 'react';
import axios from 'axios';

export const CarContextProvider = props => {
  const [cars, setCars] = useState([]);

  useEffect(() => {
    axios.get('/api/cars') // Update with your API endpoint
      .then(response => setCars(response.data))
      .catch(error => console.log(error));
  }, []);

  return (
    <CarContext.Provider value={{ cars }}>
      {props.children}
    </CarContext.Provider>
  );
};

// Add the code below to APP to create a global state you can access from any component in the app
// export const CarContext = React.createContext();
