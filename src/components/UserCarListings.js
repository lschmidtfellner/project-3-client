import React, { useContext } from 'react';
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
      .delete(`https://luke-used-cars-backend-19ea42e37e12.herokuapp.com/api/saleposts/${id}`)
      .then(() => {
        const updatedCars = cars.filter((car) => car._id !== id);
        setCars(updatedCars);
        Swal.fire({
          icon: 'success',
          title: 'You have successfully deleted this posting!',
        });
      })
      .catch((error) => console.error('Error deleting car:', error));
  };

  const handleEditPrice = (id) => {
    Swal.fire({
      title: 'Edit Price',
      input: 'text',
      inputValue: 'Enter new price',
      inputAttributes: {
        autocapitalize: 'off',
      },
      showCancelButton: true,
      confirmButtonText: 'Save',
      showLoaderOnConfirm: true,
      preConfirm: (price) => {
        return axios
          .patch(`https://luke-used-cars-backend-19ea42e37e12.herokuapp.com/api/saleposts/${id}`, { price })
          .then((response) => {
            window.location.reload();
            return response.data;
          })
          .catch((error) => {
            console.error('Error updating price:', error);
            Swal.showValidationMessage(`Request failed: ${error}`);
          });
      },
      allowOutsideClick: () => !Swal.isLoading(),
    });
  };

  return (
    <div className="w-full mx-auto text-center">
      <div className="flex flex-wrap justify-center items-center w-full yellow mb-8 py-8">
        <h1 className="text-center text-3xl blue font-bold my-8">Your Listings</h1>
      </div>
      {userCars.length > 0 ? (
        userCars.map((car) => (
          <div key={car._id}>
            <Link to={`/usercarlistingsdetails?id=${car._id}`}>
              <div className="mt-20 text-left border-b px-4">
                <div className="rounded overflow-hidden shadow-lg">
                  <img src={`https://luke-used-cars-backend-19ea42e37e12.herokuapp.com/${car.images?.[0]}`} alt="Car" className="pb-8 mx-auto" />
                </div>
                <div className="ml-3 mt-8">
                  <h2 className="text-lg blue uppercase">{car.Year} {car.Make} {car.Model}</h2>
                  <p>mileage: {car.Mileage}</p>
                  <p className="pb-8">condition: {car.Condition}</p>
                </div>
              </div>
            </Link>
            <div className="text-center w-full">
              <button
                onClick={() => handleDelete(car._id)}
                className="rounded-full pink-bg lg:w-1/6 md:w-1/6 py-1 w-1/3 text-white font-bold hover:text-black mt-8 mr-8"
              >
                delete
              </button>
              <button
                onClick={() => handleEditPrice(car._id)}
                className="rounded-full pink-bg lg:w-1/6 md:w-1/6 py-1 w-1/3 text-white font-bold hover:text-black mt-8 mr-8"
              >
                edit price
              </button>
            </div>
          </div>
        ))
      ) : (
        <div>
          <p className="text-base blue">You have not posted any cars.</p>
        </div>
      )}
      <Link className="mt-8 w-full" to="/post">
        <button className="rounded-full pink-bg lg:w-1/6 md:w-1/6 py-1 w-2/5 text-white font-bold hover:text-black mt-14 mb-14 mr-8">
          create listing
        </button>
      </Link>
    </div>
  );
};

export default UserCarListings;
