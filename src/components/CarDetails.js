import React, { useContext, useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { AuthContext } from '../context/AuthContextComponent'; // Import AuthContext
import { useNavigate } from 'react-router-dom';
// import api from '../api/apiConfig'; // Import api object
import ContactSellerBtn from './ContactSellerBtn';
import CarDetailsInfo from './CarDetailsInfo';
import { getCarsFromSalePost } from '../controller/controller';


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
    <div className='w-100 h-screen bg-off-white'>
      <CarDetailsInfo selectedCar={selectedCar}/>
      <ContactSellerBtn 
            userId={selectedCar.user}
            selectedCar={selectedCar}
            >Contact Seller
      </ContactSellerBtn>
    </div>
  );
};

export default CarDetails;
