import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContextComponent';
import { CarContext } from '../components/CarContextProvider';
import Swal from 'sweetalert2'

const UserCarListings = () => {
  const { user } = useContext(AuthContext);
  const { cars, setCars } = useContext(CarContext);
  console.log(cars)
  console.log(user)

  const userCars = cars.filter((car) => car.user === user._id);
  console.log(user)
  console.log(userCars)


  const handleDelete = (id) => {
    // Add your delete logic here

    axios.delete(`https://luke-used-cars-backend-19ea42e37e12.herokuapp.com/api/saleposts/${id}`) // replace with actual API endpoint
      .then(() => {
        // Remove the deleted car from the local state
        const updatedCars = cars.filter((car) => car._id !== id);
        setCars(updatedCars);

        setTimeout(() => {
          window.location.reload()
        }, 2000)
        Swal.fire({
          icon: 'success',
          title: "You have successfully deleted this posting!"
        })
      })
      .catch(error => console.error('Error deleting car:', error));
  };

  return (
    <div>
      {userCars.length > 0 ? (
        userCars.map(car => (
          <>
            <Link to={`/usercarlistingsdetails?id=${car._id}`} key={car._id}>
              <div>
              <img src={'https://luke-used-cars-backend-19ea42e37e12.herokuapp.com/' + car.images[0]} alt='Car' />
                <h2>{car.Year} {car.Make} {car.Model}</h2>
                <p>Mileage: {car.Mileage}</p>
                <p>Condition: {car.Condition}</p>
              </div>
            </Link>
            {/* CHANGE THIS LINK ONCE LUKE GIVES NEW EDIT FORM ROUTE */}
            <Link to={`/post?id=${car._id}`}>
              <button>Edit</button>
            </Link>
            {/* <Link to={`/usercarlistings?id=${car._id}`}> */}
            <button onClick={() => handleDelete(car._id)}>Delete</button>
            {/* </Link> */}
          </>
        ))
      ) : (
        <div>
          <p>You have not posted any cars.</p>
        </div>
      )}
      {/* CHANGE THIS LINK ONCE LUKE GIVES NEW CREATE FORM ROUTE */}
      <>
        <Link className="mt-4" to="/post">
          <button>Create New Listing</button>
        </Link>
      </>
    </div>
  );
};

export default UserCarListings;
