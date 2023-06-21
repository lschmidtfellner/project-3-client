import React from 'react';
import { CarContextProvider } from './components/CarContextProvider';
import FeaturedCars from './components/FeaturedCars';

const App = () => (
  <CarContextProvider>
    <FeaturedCars />
  </CarContextProvider>
);

export default App;
