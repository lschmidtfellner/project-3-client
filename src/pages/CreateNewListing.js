import React, { useState, useEffect } from 'react'
import axios from 'axios'

function CreateNewListing() {
  const [makeList, setMakeList] = useState([])
  const [makeId, setMakeId] = useState('')

  const [modelList, setModelList] = useState([])
  const [modelId, setModelId] = useState('')

  const [yearList, setYearList] = useState([])
  const [yearId, setYearId] = useState('')

  const [mileageId, setMileageId] = useState('')

  const [descriptionBody, setDescriptionBody] = useState('')

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
      Mileage: mileageId,
      Description: descriptionBody, // Replace with actual description input value
      user: "6491bad061e3cef5acb1e3a3"

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
      <select
        value={descriptionBody}
        className="mileage-input"
        onChange={(e) => {
          setMileageId(e.target.value)
        }}
      >
        <option value={1}>1</option>
        <option value={2}>2</option>
        <option value={3}>3</option>
        <option value={4}>4</option>
      </select>
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
