import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContextComponent';
import { CarContext } from '../components/CarContextProvider';

const UserCarListings = () => {
  const { user } = useContext(AuthContext);
  const { cars } = useContext(CarContext);
  console.log(cars)
  console.log(user)

  const userCars = cars.filter((car) => car.user === user._id);
  console.log(user)
  console.log(userCars)
  

  // const handleDelete = (id) => {
  //   // Add your delete logic here
  
  //   axios.delete(`/api/saleposts/${id}`) // replace with actual API endpoint
  //     .then(() => {
  //       // Remove the deleted car from the local state
  //       // Update the car context or reload the car data from the server
  //     })
  //     .catch(error => console.error('Error deleting car:', error));
  // };

  return (
    <div>
      {userCars.length > 0 ? (
        userCars.map(car => (
          <div key={car.id}>
            <h2>{car.Year} {car.Make} {car.Model}</h2>
            <p>Mileage: {car.Mileage}</p>
            <p>Condition: {car.Condition}</p>
            {/* <button onClick={() => handleDelete(car.id)}>Delete</button> */}
          </div>
        ))
      ) : (
        <div>
          <p>You have not posted any cars.</p>
        </div>
      )}
      <Link to={`/post?id=${cars.user}`}>
        <button>Create New Listing</button>
      </Link>
    </div>
  );
};

export default UserCarListings;
