import React, { useContext, useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { CarContext } from '../components/CarContextProvider';
import { AuthContext } from '../context/AuthContextComponent'; // Import AuthContext
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import api from '../api/apiConfig'; // Import api object
import ContactSellerBtn from './ContactSellerBtn';

const formatPrice = (price) => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  }).format(price);
};

const CarDetails = () => {
  const { cars } = useContext(CarContext);
  const { user } = useContext(AuthContext);
  const [selectedCar, setSelectedCar] = useState(null);


  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const selectedCarId = queryParams.get('id');

  useEffect(() => {
    if (selectedCarId) {
      const car = cars.find((car) => car._id === selectedCarId);
      setSelectedCar(car);
    }
  }, [cars, selectedCarId]);

  if (!selectedCar) {
    return <span>Loading...</span>;
  }

  return (
    <div className="w-full mx-auto">
      <div className="flex flex-wrap justify-center items-center w-full yellow mb-8 py-8">
        <h1 className="text-center text-3xl blue font-bold my-8">Featured Car</h1>
      </div>
      <div key={selectedCar._id}>
        <div className="my-20 text-left border-b px-4">
          <div className="rounded overflow-hidden shadow-lg">
            <img src={selectedCar.image} alt='Car' className="pb-8 mx-auto" />
          </div>
          <div className="ml-3 mt-8">
            <h2 className="text-lg blue uppercase">{selectedCar.Year} {selectedCar.Make} {selectedCar.Model}</h2>
            <p>mileage: {selectedCar.Mileage}</p>
            <p>condition: {selectedCar.Condition}</p>
            <p>description: {selectedCar.Description}</p>
            <p>price: {formatPrice(selectedCar.Price)}</p>
          </div>
          <ContactSellerBtn 
            userId={selectedCar.user} 
            className="rounded-full pink-bg lg:w-1/6 md:w-1/6 py-1 w-1/3  text-white font-bold  hover:text-black mt-4">
            Contact Seller
          </ContactSellerBtn>
        </div>
      </div>
    </div>
  );
};

export default CarDetails;
