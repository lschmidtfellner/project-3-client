import React, { useContext, useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { CarContext } from '../components/CarContextProvider';
import { AuthContext } from '../context/AuthContextComponent'; // Import AuthContext
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import api from '../api/apiConfig'; // Import api object

const CarDetails = () => {
  const { cars } = useContext(CarContext);
  const { user } = useContext(AuthContext);
  const [selectedCar, setSelectedCar] = useState(null);
  const [sellerEmailAddress, setSellerEmailAddress] = useState(null); // Store the seller's email
  const navigate = useNavigate();

  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const selectedCarId = queryParams.get('id');

  useEffect(() => {
    if (selectedCarId) {
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
    <div className="w-full mx-auto">
      <div className="flex flex-wrap justify-center items-center w-full yellow mb-8 py-8">
        <h1 className="text-center text-3xl blue font-bold my-8">Featured Car</h1>
      </div>
      <div key={selectedCar._id}>
        <div className="my-20 text-left border-b px-4">
          <div className="rounded overflow-hidden shadow-lg">
            <img src={selectedCar.image} alt='Car' className="pb-8 mx-auto"/>
          </div>
          <div className="ml-3 mt-8">
            <h2 className="text-lg blue uppercase">{selectedCar.Year} {selectedCar.Make} {selectedCar.Model}</h2>
            <p>mileage: {selectedCar.Mileage}</p>
            <p>condition: {selectedCar.Condition}</p>
            <p>description: {selectedCar.Description}</p>
            <p>price: {selectedCar.Price}</p>
          </div>
          <button onClick={generateEmailAddress} className="rounded-full pink-bg lg:w-1/6 md:w-1/6 py-1 w-1/3  text-white font-bold  hover:text-black mt-4">Contact Seller</button>
        </div>
      </div>
    </div>
  );
};

export default CarDetails;
