import React, { useContext, useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { CarContext } from '../components/CarContextProvider';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2'

const CarDetails = () => {
  const { cars } = useContext(CarContext);
  const [emailAddress, setEmailAddress] = useState('');
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const selectedCarId = queryParams.get('id');
  const [selectedCar, setSelectedCar] = useState(null);
  const navigate = useNavigate();

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

    // setTimeout(() => {
    //   // window.location.reload()
    // }, 2000)
    // Swal.fire({
    //   icon: 'success',
    //   // Applies the answer’s number and the answer in the modal statment
    //   title: `You have successfully contacted ${newEmailAddress}`
    // })
    setTimeout(() => {
      Swal.fire({
        icon: 'success',
        title: `You have successfully contacted ${newEmailAddress}`,
        didClose: () => {
          navigate(-1); // Redirect back to the previous page
        },
      });
    }, 500);
  };


  return (
    <div className="w-full mx-auto">
      <h1 className="text-center text-3xl blue font-bold my-8">Featured Car</h1>
      <div key={selectedCar._id}>
        <div className="mt-10 ml-3 text-left w-full">
          <img src={'https://luke-used-cars-backend-19ea42e37e12.herokuapp.com/' + selectedCar.images[0]} alt='Car' />
          <h2 className="text-2xl blue uppercase">{selectedCar.Year} {selectedCar.Make} {selectedCar.Model}</h2>
          <p>mileage: {selectedCar.Mileage}</p>
          <p>condition: {selectedCar.Condition}</p>
          <p>description: {selectedCar.Description}</p>
          <button onClick={generateEmailAddress} className="rounded-full pink-bg lg:w-1/6 md:w-1/6 py-1 w-1/3  text-white font-bold  hover:text-black mt-4"><a href={`mailto:${emailAddress}`}>contact seller</a></button>
        </div>
      </div>
    </div>
  );
};

export default CarDetails;



