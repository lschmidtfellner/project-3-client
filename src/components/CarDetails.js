import React, { useContext, useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
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
import CarDetailsInfo from './CarDetailsInfo';
import { getCarsFromSalePost } from '../controller/controller';

const CarDetails = () => {
  let { user } = useContext(AuthContext);
  if (JSON.stringify(user) === '{}') user = JSON.parse(localStorage.getItem('user'));

  const [cars, setCars] = useState([])
  const [selectedCar, setSelectedCar] = useState(null);


  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const selectedCarId = queryParams.get('id');

  useEffect(() => {
    getCarsFromSalePost(setCars)
  }, [])

  useEffect(() => {
    if (selectedCarId && cars.length > 0) {
      const car = cars.find((car) => car._id === selectedCarId);
      setSelectedCar(car);
    }
  }, [cars, selectedCarId]);

  if (!selectedCar) {
    return <span>Loading...</span>;
  }

  return (
    <div className='w-100 h-screen bg-off-white'>
      <CarDetailsInfo selectedCar={selectedCar}/>
      <ContactSellerBtn 
            userId={selectedCar.user} 
            className="rounded-full pink-bg lg:w-1/6 md:w-1/6 py-1 w-1/3  text-white font-bold  hover:text-black mt-4">
            Contact Seller
          </ContactSellerBtn>
    </div>
  );
};

export default CarDetails;
