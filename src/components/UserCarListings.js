import React, { useState, useEffect } from 'react';
import axios from 'axios';

const UserCarListings = () => {
  const [carList, setCarList] = useState([]);

  useEffect(() => {
    // Fetch car data when the component mounts
    axios.get('/api/user-cars')  // replace this with your actual API endpoint
      .then(response => setCarList(response.data))
      .catch(error => console.error('Error fetching car data:', error));
  }, []);

  const handleDelete = (id) => {
    // Add your delete logic here
    axios.delete(`/api/user-cars/${id}`) // replace with actual API endpoint
      .then(() => {
        // Remove the deleted car from the local state
        setCarList(carList.filter(car => car.id !== id));
      })
      .catch(error => console.error('Error deleting car:', error));
  }

  const handleEdit = (id, updatedCar) => {
    // Add edit functionality
    axios.put(`/api/user-cars/${id}`, updatedCar) // replace with actual API endpoint
      .then(response => {
        // Update the edited car in the local state
        setCarList(carList.map(car => car.id === id ? response.data : car));
      })
      .catch(error => console.error('Error updating car:', error));
  }

  const handleCreate = (newCar) => {
    // Add create functionality
    axios.post('/api/user-cars', newCar) // replace with actual API endpoint
      .then(response => {
        // Add the newly created car to the local state
        setCarList([...carList, response.data]);
      })
      .catch(error => console.error('Error creating car:', error));
  }

  return (
    <div>
      {carList.map(car => (
        <div key={car.id}>
          <h2>{car.year} {car.make} {car.model}</h2>
          <p>Mileage: {car.mileage}</p>
          <p>Condition: {car.condition}</p>
          <p>Date Added: {car.dateAdded}</p>
          <button onClick={() => handleEdit(car.id)}>Edit</button>
          <button onClick={() => handleDelete(car.id)}>Delete</button>
        </div>
      ))}
      <button onClick={handleCreate}>Create New Listing</button>
    </div>
  );
}

export default UserCarListings;
