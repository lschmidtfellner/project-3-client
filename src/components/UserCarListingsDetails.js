import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { handleDelete, handleEdit, handleCreate } from './UserCarListings';



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


export default UserCarListingsDetails;
