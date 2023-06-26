import React, { useContext, useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContextComponent';
import { CarContext } from '../components/CarContextProvider';
import Swal from 'sweetalert2';

const UserCarListings = () => {
  const { user } = useContext(AuthContext);
  const { cars, setCars } = useContext(CarContext);

  const userCars = cars.filter((car) => car.user === user._id);

  const handleDelete = (id) => {
    axios
      .delete(`https://luke-used-cars-backend-19ea42e37e12.herokuapp.com/api/saleposts/:id}`)
      .then(() => {
        const updatedCars = cars.filter((car) => car._id !== id);
        setCars(updatedCars);

        setTimeout(() => {
          window.location.reload();
        }, 2000);

        Swal.fire({
          icon: 'success',
          title: 'You have successfully deleted this posting!',
        });
      })
      .catch((error) => console.error('Error deleting car:', error));
  };

  return (
    <div>
      {userCars.length > 0 ? (
        userCars.map((car) => (
          <React.Fragment key={car._id}>
            <Link to={`/usercarlistingsdetails?carId=${car._id}`}>
              <div>
                <h2>{car.Year} {car.Make} {car.Model}</h2>
                <p>Mileage: {car.Mileage}</p>
                <p>Condition: {car.Condition}</p>
              </div>
            </Link>
            <Link to={`/post?carId=${car._id}`}>
              <button>Edit</button>
            </Link>
            <button onClick={() => handleDelete(car._id)}>Delete</button>
          </React.Fragment>
        ))
      ) : (
        <div>
          <p>You have not posted any cars.</p>
        </div>
      )}
      <Link className="mt-4" to="/post">
        <button>Create New Listing</button>
      </Link>
    </div>
  );
};

export default UserCarListings;
