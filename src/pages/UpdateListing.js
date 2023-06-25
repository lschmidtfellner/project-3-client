import React, { useState, useEffect, useContext } from 'react'
import axios from 'axios'
import { AuthContext } from '../context/AuthContextComponent'
import Swal from 'sweetalert2'
import { useLocation } from 'react-router-dom';
import { CarContext } from '../components/CarContextProvider';


function UpdateListing() {
  const { user } = useContext(AuthContext)
  const { cars } = useContext(CarContext);

  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const selectedCarId = queryParams.get('id');

  const [carToUpdate, setCarToUpdate] = useState({})

  const [makeList, setMakeList] = useState([])
  const [makeId, setMakeId] = useState('')

  const [modelList, setModelList] = useState([])
  const [modelId, setModelId] = useState('')

  const [yearList, setYearList] = useState([])
  const [yearId, setYearId] = useState('')

  const [mileageBody, setMileageBody] = useState('')

  const [descriptionBody, setDescriptionBody] = useState('')

  const [carCategory, setCarCategory] = useState('')

  useEffect(() => {
    const car = cars.find((car) => car._id === selectedCarId)
    setCarToUpdate(car)
  })

  useEffect(() => {
    let ignore = false
    axios
      .get(
        'https://luke-used-cars-backend-19ea42e37e12.herokuapp.com/api/carinfo'
      )
      .then((response) => {
        if (!ignore) {
          console.log('fetched list of makes')
          const makes = response.data
            .map((car) => car.Make)
            .filter((make, index, array) => array.indexOf(make) === index)
          setMakeList(makes)
          setMakeId(carToUpdate.Make)
        }
      })
    return () => {
      ignore = true
    }
  }, [])

  useEffect(() => {
    let ignore = false
    if (makeId !== '') {
      axios
        .get(
          `https://luke-used-cars-backend-19ea42e37e12.herokuapp.com/api/carinfo/search?Make=${makeId}`
        )
        .then((response) => {
          if (!ignore) {
            console.log('fetched list of models')
            setCarCategory(response.data[0].Category)
            const models = response.data
              .map((car) => car.Model)
              .filter((model, index, array) => array.indexOf(model) === index)
            setModelList(models)
            setModelId(carToUpdate.Model)
          }
        })

      return () => {
        ignore = true
      }
    }
  }, [makeId])

  useEffect(() => {
    let ignore = false
    if (modelId !== '') {
      axios
        .get(
          `https://luke-used-cars-backend-19ea42e37e12.herokuapp.com/api/carinfo/search?Make=${makeId}&Model=${modelId}`
        )
        .then((response) => {
          if (!ignore) {
            console.log('fetched list of years')
            const years = response.data
              .map((car) => car.Year)
              .filter((year, index, array) => array.indexOf(year) === index)
            setYearList(years)
            setYearId(carToUpdate.Year)

          }
        })
      return () => {
        ignore = true
      }
    }
  }, [makeId, modelId])

  const handleUpdateListing = () => {
    // Extract the user's ObjectId from the user information
    const userId = user._id; // Assuming the user object has an "_id" property containing the ObjectId

    // Prepare the data to be sent to the backend
    const formData = new FormData();
    formData.append('Make', makeId);
    formData.append('Model', modelId);
    formData.append('Year', yearId);
    formData.append('Category', carCategory);
    formData.append('Mileage', mileageBody);
    formData.append('Condition', 'used');
    formData.append('Description', descriptionBody);
    formData.append('user', userId); // Pass the user's ObjectId value here
    selectedImages.forEach((image, index) => {
      formData.append('images', image);
    });

    console.log('New Listing FormData:', formData);

    // Send the data to the backend route
    axios
      .put(`https://luke-used-cars-backend-19ea42e37e12.herokuapp.com/api/saleposts/${carToUpdate._id}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
      .then((response) => {
        console.log('New listing created successfully:', response.data);
        // Handle any success actions here
        Swal.fire({
          icon: 'success',
          title: 'Success',
          text: 'New listing created successfully',
        });
      })
      .catch((error) => {
        console.error('Error creating new listing:', error);
        // Handle any error actions here
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Error creating new listing',
        });
      });
  };


  return (
    <>
      <select
        value={makeId}
        onChange={(e) => {
          setMakeId(e.target.value);
        }}
      >
        {makeList.map((make, index) => (
          <option key={index} value={make}>
            {make}
          </option>
        ))}
      </select>
      <select
        value={modelId}
        onChange={(e) => {
          setModelId(e.target.value);
        }}
      >
        {modelList.map((model, index) => (
          <option key={index} value={model}>
            {model}
          </option>
        ))}
      </select>
      <select
        value={yearId}
        onChange={(e) => {
          setYearId(e.target.value);
        }}
      >
        {yearList.map((year, index) => (
          <option key={index} value={year}>
            {year}
          </option>
        ))}
      </select>
      <input
        type="text"
        className="mileage-input"
        placeholder="mileage:"
        value={carToUpdate.Description}
        onChange={(e) => {
          setMileageBody(e.target.value);
        }}
      />

      <input
        type="text"
        className="car-description"
        placeholder="description:"
        onChange={(e) => {
          setDescriptionBody(e.target.value);
        }}
      ></input>
      <input type="file" multiple onChange={handleImageUpload} />
      {selectedImages.map((image, index) => (
        <div key={index}>
          <img src={URL.createObjectURL(image)} alt={`Image ${index}`} />
        </div>
      ))}
      <button className="create-btn" onClick={handleUpdateListing}>
        Update Listing
      </button>
    </>
  );
}

export default UpdateListing
