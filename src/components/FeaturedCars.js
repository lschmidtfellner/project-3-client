// This component will display the list of featured cars. Use the context created to fetch the data and display a Car component for each item.
import React, { useContext } from 'react';
import { CarContextProvider } from './CarContextProvider';
import Car from './Car';

const FeaturedCars = () => {
  const { cars } = useContext(CarContext);

  return (
    <div>
      <h1>Featured Cars</h1>
      {cars.map(car => <Car key={car._id} car={car} />)}
    </div>
  );
};

export default FeaturedCars;

