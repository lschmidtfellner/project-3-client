import React, { useContext, useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { AuthContext } from '../context/AuthContextComponent'; // Import AuthContext
import { useNavigate } from 'react-router-dom';
// import api from '../api/apiConfig'; // Import api object
import ContactSellerBtn from './ContactSellerBtn';
import CarDetailsInfo from './CarDetailsInfo';
import { getCarsFromSalePost } from '../controller/controller';


const formatPrice = (price) => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  }).format(price);
};



const CarDetails = () => {
  let { user } = useContext(AuthContext);
  // if (JSON.stringify(user) === '{}') user = JSON.parse(localStorage.getItem('user'));

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
      console.log (car._id)
      setSelectedCar(car);
    }
  }, [cars, selectedCarId]);

  if (!selectedCar) {
    return <span>Loading...</span>;
  }

  return (
    <div className='flex flex-col min-h-screen px-5 bg-off-white pt-32 pb-10 overflow-x-hidden items-center w-full'>
      {/* <div className='flex flex-col items-center w-full sm:w-[70%] md:w-[60%] lg:w-[50%] xl:w-[40%]'> */}
      <div className='flex flex-col items-center w-full'>

      <CarDetailsInfo selectedCar={selectedCar}/>
      <ContactSellerBtn 
            userId={selectedCar.user}
            selectedCar={selectedCar}
            >Contact Seller
      </ContactSellerBtn>
      </div>
    </div>
  );
};

export default CarDetails;
