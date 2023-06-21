// This component will display the list of featured cars. Use the context created to fetch the data and display a Car component for each item.
import React, { useContext } from 'react';
import { CarContext } from '../components/CarContextProvider';
import Car from '../components/Car';

const FeaturedCars = () => {
  const { cars } = useContext(CarContext); // Use CarContext instead of CarContextProvider

  return (
    <div>
      <h1>Featured Cars</h1>
      {cars.map((car) => (
         <div key={car._id}>
         <p>Year: {car.year}</p>
         <p>Make: {car.make}</p>
         <p>Model: {car.model}</p>
         <p>Mileage: {car.mileage}</p>
         <p>Condition: {car.condition}</p>
         <p>Date added: {car.date}</p>
       </div>
      ))}
    </div>
  );
};

export default FeaturedCars;
