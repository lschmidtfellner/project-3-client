import React, { useContext, useState, useEffect } from 'react';
import axios from 'axios';
import { useLocation } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { CarContext } from '../components/CarContextProvider';
import Swal from 'sweetalert2';

const UserCarListingsDetails = () => {
  const { cars, setCars } = useContext(CarContext);
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const selectedCarId = queryParams.get('carId');
  const [selectedCar, setSelectedCar] = useState({});
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(false);
  const [makeId, setMakeId] = useState('');
  const [modelId, setModelId] = useState('');
  const [yearId, setYearId] = useState('');
  const [mileageBody, setMileageBody] = useState('');
  const [descriptionBody, setDescriptionBody] = useState('');

  useEffect(() => {
    if (selectedCarId) {
      const car = cars.find((car) => car._id === selectedCarId);
      setSelectedCar(car || {});
      setLoading(false);
    }
  }, [cars, selectedCarId]);

  const handleDelete = (id) => {
    axios
      .delete(`https://luke-used-cars-backend-19ea42e37e12.herokuapp.com/api/saleposts/${id}`)
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

  const handleEdit = () => {
    setEditing(true);
    setMakeId(selectedCar.Make);
    setModelId(selectedCar.Model);
    setYearId(selectedCar.Year);
    setMileageBody(selectedCar.Mileage);
    setDescriptionBody(selectedCar.Description);
  };

  const handleUpdateListing = () => {
    const updatedListing = {
      Make: makeId,
      Model: modelId,
      Year: yearId,
      Mileage: mileageBody,
      Description: descriptionBody,
    };

    axios
      .put(`https://luke-used-cars-backend-19ea42e37e12.herokuapp.com/api/saleposts/${selectedCarId}`, updatedListing)
      .then((response) => {
        console.log('Listing updated successfully:', response.data);
        // Handle any success actions here
        setEditing(false);
      })
      .catch((error) => {
        console.error('Error updating listing:', error);
        // Handle any error actions here
      });
  };

  if (loading) {
    return <span>Loading...</span>; // Add loading state until the car data is fetched
  }

  return (
    <>
      <div key={selectedCar._id}>
        <h2>{selectedCar.Year} {selectedCar.Make} {selectedCar.Model}</h2>
        <p>Mileage: {selectedCar.Mileage}</p>
        <p>Condition: {selectedCar.Condition}</p>
        <p>Description: {selectedCar.Description}</p>
        {editing ? (
          <>
            <select value={makeId} onChange={(e) => setMakeId(e.target.value)}>
              {/* Render make options */}
            </select>
            <select value={modelId} onChange={(e) => setModelId(e.target.value)}>
              {/* Render model options */}
            </select>
            <select value={yearId} onChange={(e) => setYearId(e.target.value)}>
              {/* Render year options */}
            </select>
            <input type="text" value={mileageBody} onChange={(e) => setMileageBody(e.target.value)} />
            <input type="text" value={descriptionBody} onChange={(e) => setDescriptionBody(e.target.value)} />
            <button onClick={handleUpdateListing}>Update Listing</button>
          </>
        ) : (
          <button onClick={handleEdit}>Edit</button>
        )}
        <button onClick={() => handleDelete(selectedCar._id)}>Delete</button>
      </div>
      <Link className="mt-4" to="/post">
        <button>Create New Listing</button>
      </Link>
    </>
  );
};

export default UserCarListingsDetails;
