import React, { useState } from 'react';

const CarDetails = ({ car }) => {
  const [emailAddress, setEmailAddress] = useState('');

// generates a dummy email for each button click below
  const generateEmailAddress = () => {
    const userName = 'seller';
    const emailDomain = 'example.com';
    const randomNumber = Math.floor(Math.random() * 100);

    const newEmailAddress = `${userName}${randomNumber}@${emailDomain}`;
    setEmailAddress(newEmailAddress);
  };

  return (
    <div key={car._id}>
      <p>Year: {car.year}</p>
      <p>Make: {car.make}</p>
      <p>Model: {car.model}</p>
      <p>Mileage: {car.mileage}</p>
      <p>Condition: {car.condition}</p>
      <p>Description: {car.description}</p>
      <a href={`mailto:${emailAddress}`}><button onClick={generateEmailAddress}>contact seller</button></a>
      <p>Date added: {car.date}</p>
    </div>
  );
};

export default CarDetails;
