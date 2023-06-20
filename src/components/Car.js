// This component will display the information of a single car.
import React from 'react';

const Car = ({ car }) => (
  <div>
    <h2>{car.year} {car.make} {car.model}</h2>
    <p>Mileage: {car.mileage}</p>
    <p>Condition: {car.condition}</p>
  </div>
);

export default Car;
