import React, { useState, useEffect, useContext } from 'react'
import axios from 'axios'
import { AuthContext } from '../context/AuthContextComponent'

function CreateNewListing() {
  const { user } = useContext(AuthContext)

  const [makeList, setMakeList] = useState([])
  const [makeId, setMakeId] = useState('')

  const [modelList, setModelList] = useState([])
  const [modelId, setModelId] = useState('')

  const [yearList, setYearList] = useState([])
  const [yearId, setYearId] = useState('')

  const [mileageBody, setMileageBody] = useState('')

  const [descriptionBody, setDescriptionBody] = useState('')

  const [carCategory, setCarCategory] = useState('')

  // Rest of your code...

  const handleCreateListing = () => {
    // Check if user is logged in and user data is available
    if (!user || Object.keys(user).length === 0) {
      console.error('User is not authenticated or user data has not been fetched yet.');
      // Redirect to login or handle this case appropriately here...
      return;
    }

    // Prepare the data to be sent to the backend
    const newListing = {
      Make: makeId,
      Model: modelId,
      Year: yearId,
      Category: carCategory,
      Mileage: mileageBody,
      Condition: 'used',
      Description: descriptionBody,
      user: user._id
      // Image: 'Your image URL here' // Replace with actual image URL or file upload logic
    }

    // Send the data to the backend route
    axios
      .post(
        'https://luke-used-cars-backend-19ea42e37e12.herokuapp.com/api/saleposts',
        newListing
      )
      .then((response) => {
        console.log('New listing created successfully:', response.data)
        // Handle any success actions here
      })
      .catch((error) => {
        console.error('Error creating new listing:', error)
        // Handle any error actions here
      })
  }

  return (
    <>
      <select
        value={makeId}
        onChange={(e) => {
          setMakeId(e.target.value)
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
          setModelId(e.target.value)
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
          setYearId(e.target.value)
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
        onChange={(e) => {
          setMileageBody(e.target.value)
        }}
      />

      <input
        type="text"
        className="car-description"
        placeholder="description:"
        onChange={(e) => {
          setDescriptionBody(e.target.value)
        }}
      ></input>
      <button className="image-button">Upload Image</button>
      <button className="create-btn" onClick={handleCreateListing}>
        Create New Listing
      </button>
    </>
  )
}

export default CreateNewListing
