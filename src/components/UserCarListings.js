import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContextComponent';
import { CarContext } from '../components/CarContextProvider';
import Swal from 'sweetalert2';
import { serverUrl } from '../controller/controller';

const UserCarListings = () => {
  const { user } = useContext(AuthContext);
  const { cars, setCars } = useContext(CarContext);

  const userCars = cars.filter((car) => car.user === user._id);
  const [userCarListings, setUserCarListing] = useState([]);

  useEffect(() => {
    axios.get(`${serverUrl}api/saleposts/`)
      .then((response) => {
        const userCars = response.data.filter((car) => car.user === user._id);
        setUserCarListing(userCars);
      });
  }, []);

  const handleDelete = (id) => {
    axios.delete(`${serverUrl}api/saleposts/${id}`)
      .then(() => {
        const updatedCars = cars.filter((car) => car._id !== id);
        setCars(updatedCars);
        Swal.fire({
          icon: 'success',
          title: "You have successfully deleted this posting!"
        });
      })
      .catch(error => console.error('Error deleting car:', error));
  };

  // New states for price editing modal
  const [showPriceModal, setShowPriceModal] = useState(false);
  const [editingCarId, setEditingCarId] = useState(null);
  const [newPrice, setNewPrice] = useState('');

  const handlePriceChange = () => {
    axios.put(`${serverUrl}api/saleposts/${editingCarId}`, { price: newPrice })
      .then(() => {
        const updatedCars = cars.map(car => {
          if (car._id === editingCarId) {
            return { ...car, price: newPrice };
          }
          return car;
        });
        setCars(updatedCars);
        setShowPriceModal(false);
        Swal.fire({
          icon: 'success',
          title: "Price updated successfully!"
        });
      })
      .catch(error => console.error('Error updating car price:', error));
  };

  return (
    <div className="w-full mx-auto text-center">
      <div className="flex flex-wrap justify-center items-center w-full yellow mb-8 py-8">
        <h1 className="text-center text-3xl blue font-bold my-8">Your Listings</h1>
      </div>

      {userCars.length > 0 ? (
        userCars.map((car, index) => (
          <div key={car._id}> 
            <Link to={`/usercarlistingsdetails?id=${car._id}`}>
              <div className="mt-20 text-left border-b px-4">
                <div className="rounded overflow-hidden shadow-lg">
                  <img src={userCarListings[index]?.image} alt='Car' className="pb-8 mx-auto" />
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
                onClick={() => { 
                  setEditingCarId(car._id); 
                  setShowPriceModal(true); 
                }} 
                className="rounded-full pink-bg lg:w-1/6 md:w-1/6 py-1 w-1/3  text-white font-bold  hover:text-black mt-8 mr-8"
              >
                edit price
              </button>
              <button onClick={() => handleDelete(car._id)} className="rounded-full pink-bg lg:w-1/6 md:w-1/6 py-1 w-1/3  text-white font-bold  hover:text-black mt-8 mr-8">delete</button>
            </div>
          </div>
        ))
      ) : (
        <div>
          <p className="text-base blue">You have not posted any cars.</p>
        </div>
      )}

      {showPriceModal && (
        <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center bg-opacity-50 bg-black">
          <div className="bg-white p-4 rounded">
            <h2 className="mb-4">Edit Price</h2>
            <input 
              type="number" 
              value={newPrice} 
              onChange={e => setNewPrice(e.target.value)} 
              placeholder="Enter new price"
            />
            <button onClick={handlePriceChange}>Confirm</button>
            <button onClick={() => setShowPriceModal(false)}>Cancel</button>
          </div>
        </div>
      )}

      <Link className="mt-8 w-full" to="/post">
        <button className="rounded-full pink-bg lg:w-1/6 md:w-1/6 py-1 w-2/5 text-white font-bold  hover:text-black mt-14 mb-14 mr-8 ">create listing</button>
      </Link>
    </div>
  );
};

export default UserCarListings;
