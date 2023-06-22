import React, { useState, useEffect, useContext } from 'react'
import axios from 'axios'
import { AuthContext } from '../context/AuthContextComponent'
import Swal from 'sweetalert2'

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
          setMakeId(makes[0])
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
            setModelId(models[0])
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
            setYearId(years[0])

          }
        })
      return () => {
        ignore = true
      }
    }
  }, [makeId, modelId])

  const handleCreateListing = () => {
    // Prepare the data to be sent to the backend
    const newListing = {
      Make: makeId,
      Model: modelId,
      Year: yearId,
      Category: carCategory,
      Mileage: mileageBody,
      Condition: 'used',
      Description: descriptionBody, // Replace with actual description input value
      user: user

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
        Swal.fire({
          icon: 'success',
          title: 'Success',
          text: 'New listing created successfully'
        })
      })
      .catch((error) => {
        console.error('Error creating new listing:', error)
        // Handle any error actions here
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Error creating new listing'
        })
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
