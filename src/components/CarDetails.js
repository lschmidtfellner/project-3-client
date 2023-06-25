
import React, { useContext, useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { CarContext } from '../components/CarContextProvider';
import Swal from 'sweetalert2'

const CarDetails = () => {
  const { cars } = useContext(CarContext);
  const [emailAddress, setEmailAddress] = useState('');
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const selectedCarId = queryParams.get('id');
  const [selectedCar, setSelectedCar] = useState(null);

  useEffect(() => {
    if (selectedCarId) {
      const car = cars.find((car) => car._id === selectedCarId);
      setSelectedCar(car);
    }
  }, [cars, selectedCarId]);

  if (!selectedCar) {
    return <span>Loading...</span>; // Add loading state until the car data is fetched
  }

  // // generates a dummy email for each button click below
  const generateEmailAddress = () => {
    const userName = 'seller';
    const emailDomain = 'example.com';
    const randomNumber = Math.floor(Math.random() * 100);
    const newEmailAddress = `${userName}${randomNumber}@${emailDomain}`;
    const mailtoLink = `mailto:${newEmailAddress}`;

    // window.open(mailtoLink);

    setTimeout(() => {
      // window.location.reload()
    }, 2000)
    Swal.fire({
      icon: 'success',
      // Applies the answer’s number and the answer in the modal statment
      title: `You have successfully contacted ${newEmailAddress}`
    })
  };


  return (
    <div key={selectedCar._id}>
      <p>Year: {selectedCar.Year}</p>
      <p>Make: {selectedCar.Make}</p>
      <p>Model: {selectedCar.Model}</p>
      <p>Mileage: {selectedCar.Mileage}</p>
      <p>Condition: {selectedCar.Condition}</p>
      <p>Description: {selectedCar.Description}</p>
      <button onClick={generateEmailAddress}><a href={`mailto:${emailAddress}`}>contact seller</a></button>
    </div>
  );
};

export default CarDetails;