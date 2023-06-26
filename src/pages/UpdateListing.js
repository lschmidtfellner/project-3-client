import React, { useState, useEffect } from 'react';
import axios from 'axios';

const UpdateListing = ({ carId }) => {
  const [makeId, setMakeId] = useState('');
  const [modelId, setModelId] = useState('');
  const [yearId, setYearId] = useState('');
  const [mileageBody, setMileageBody] = useState('');
  const [descriptionBody, setDescriptionBody] = useState('');

  useEffect(() => {
    const fetchCarData = async () => {
      try {
        const response = await axios.get(`https://luke-used-cars-backend-19ea42e37e12.herokuapp.com/api/saleposts/:id}`);
        const carData = response.data;
        setMakeId(carData.Make);
        setModelId(carData.Model);
        setYearId(carData.Year);
        setMileageBody(carData.Mileage);
        setDescriptionBody(carData.Description);
      } catch (error) {
        console.error('Error fetching car data:', error);
      }
    };

    fetchCarData();
  }, [carId]);

  const handleUpdateListing = () => {
    const updatedListing = {
      Make: makeId,
      Model: modelId,
      Year: yearId,
      Mileage: mileageBody,
      Description: descriptionBody,
    };

    axios
      .put(`https://luke-used-cars-backend-19ea42e37e12.herokuapp.com/api/saleposts/:id`, updatedListing)
      .then((response) => {
        console.log('Listing updated successfully:', response.data);
        // Handle any success actions here
      })
      .catch((error) => {
        console.error('Error updating listing:', error);
        // Handle any error actions here
      });
  };

  return (
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
  );
};

export default UpdateListing;
