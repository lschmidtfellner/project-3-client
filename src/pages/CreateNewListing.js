import React from 'react'
import { useState, useEffect } from 'react'
import axios from 'axios'

function CreateNewListing() {
  const [makeList, setMakeList] = useState([])
  const [makeId, setMakeId] = useState('')

  const [modelList, setModelList] = useState([])
  const [modelId, setModelId] = useState('')

  const [yearList, setYearList] = useState([])
  const [yearId, setYearId] = useState('')

  useEffect(() => {
    let ignore = false
    axios.get(`/cars`).then((response) => {
      if (!ignore) {
        console.log('fetched list of models')
        const makes = response.data.map((car) => car.make)
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
    axios.get(`/cars/search?make=${makeId}`).then((response) => {
      if (!ignore) {
        console.log('fetched list of models')
        const models = response.data.map((car) => car.model)
        setModelList(models)
        setModelId(models[0])
      }
    })
    return () => {
      ignore = true
    }
  }, [makeId])

  useEffect(() => {
    let ignore = false
    axios.get(`/cars/search?make=${makeId}&model=${modelId}`).then((result) => {
      if (!ignore) {
        console.log('fetched list of years')
        setYearList(result)
        setYearId(result[0])
      }
    })
    return () => {
      ignore = true
    }
  }, [modelId])

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
        className="car-description"
        placeholder="description:"
      ></input>
      <button className="image-button">Upload Image</button>
      <button className="create-btn">Create New Listing</button>
    </>
  )
}

export default CreateNewListing
