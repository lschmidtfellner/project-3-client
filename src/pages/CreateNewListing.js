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

  const [selectedImage, setSelectedImage] = useState(null)

  // existing useEffects...

  const handleImageUpload = event => {
     console.log('handleImageUpload triggered');
    setSelectedImage(event.target.files[0])
  }

  const handleCreateListing = () => {
    const formData = new FormData()
    formData.append("Make", makeId)
    formData.append("Model", modelId)
    formData.append("Year", yearId)
    formData.append("Category", carCategory)
    formData.append("Mileage", mileageBody)
    formData.append("Condition", 'used')
    formData.append("Description", descriptionBody)
    formData.append("user", user)
    if (selectedImage) {
      formData.append("file", selectedImage)
    }

    axios
    .post(
      'https://luke-used-cars-backend-19ea42e37e12.herokuapp.com/api/upload',
      formData,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      }
    )
    // ...

      .then((response) => {
        console.log('Image uploaded successfully:', response.data)
        const imageUrl = response.data.compressedFilePaths[0]

        const newListing = {
          Make: makeId,
          Model: modelId,
          Year: yearId,
          Category: carCategory,
          Mileage: mileageBody,
          Condition: 'used',
          Description: descriptionBody,
          user: user,
          Image: imageUrl,
        }

        axios
          .post(
            'https://luke-used-cars-backend-19ea42e37e12.herokuapp.com/api/saleposts',
            newListing
          )
          .then((response) => {
            console.log('New listing created successfully:', response.data)
            Swal.fire({
              icon: 'success',
              title: 'Success',
              text: 'New listing created successfully'
            })
          })
          .catch((error) => {
            console.error('Error creating new listing:', error)
            Swal.fire({
              icon: 'error',
              title: 'Error',
              text: 'Error creating new listing'
            })
          })
      })
      .catch((error) => {
        console.error('Error uploading image:', error)
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Error uploading image'
        })
      })
  }

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
      <input type="file" onChange={handleImageUpload} />
      {selectedImage && (
        <div>
          <img src={URL.createObjectURL(selectedImage)} alt="Selected" />
        </div>
      )}
      <button className="create-btn" onClick={handleCreateListing}>
        Create New Listing
      </button>
    </>
  );
}

export default CreateNewListing;
