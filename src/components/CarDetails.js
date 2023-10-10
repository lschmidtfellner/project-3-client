import React, { useContext, useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { AuthContext } from '../context/AuthContextComponent'; // Import AuthContext
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import api from '../api/apiConfig'; // Import api object
import CarDetailsInfo from './CarDetailsInfo';
import { getCarsFromSalePost } from '../controller/controller';

const CarDetails = () => {
  let { user } = useContext(AuthContext);
  if (JSON.stringify(user) === '{}') user = JSON.parse(localStorage.getItem('user'));

  const [cars, setCars] = useState([])
  const [selectedCar, setSelectedCar] = useState(null);
  const [sellerEmailAddress, setSellerEmailAddress] = useState(null); // Store the seller's email
  const navigate = useNavigate();

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

      // Fetch the seller's email based on the user ID in selectedCar
      const userId = car.user;
      console.log(userId);
      fetchSellerEmail(userId);
    }
  }, [cars, selectedCarId]);

  const fetchSellerEmail = async (userId) => {
    try {
      // Replace with your actual API endpoint to fetch user data
      const response = await api.get(`/auth/users/${userId}/email`);
      console.log(response);
      const userData = response.data;
      console.log(userData);

      if (userData.email) {
        setSellerEmailAddress(userData.email);
      } else {
        console.error('Seller email is not available');
      }
    } catch (error) {
      console.error('Error fetching seller email:', error);
    }
  };

  const generateEmailAddress = () => {
    if (user && user.email && sellerEmailAddress) {
      const subject = encodeURIComponent('Interested in your car listing');
      const body = encodeURIComponent('Hello, I am interested in your car listing. Please provide me with more details.');

      const mailtoLink = `mailto:${sellerEmailAddress}?subject=${subject}&body=${body}`;

      window.location.href = mailtoLink;

      setTimeout(() => {
        Swal.fire({
          icon: 'success',
          title: `You have successfully contacted ${sellerEmailAddress}`,
          didClose: () => {
            navigate(-1); // Redirect back to the previous page
          },
        });
      }, 500);
    } else {
      // Handle the case where user.email or sellerEmailAddress is not available
      console.error('User email or seller email is not available');
    }
  };

  if (!selectedCar) {
    return <span>Loading...</span>;
  }

  return (
    <div className='w-100 h-screen bg-off-white'>
      <CarDetailsInfo selectedCar={selectedCar}/>
      {/*Cicely Add Your Button Here*/}
    </div>
  );
};

export default CarDetails;
