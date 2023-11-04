import React, { useState, useEffect, useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { AuthContext } from '../context/AuthContextComponent'
import Swal from 'sweetalert2'

import { uploadImage, serverUrl, fileSizeCheck } from '../controller/controller'

function CreateNewListing() {
  const { user } = useContext(AuthContext)

  const [makeList, setMakeList] = useState([])
  const [makeId, setMakeId] = useState('')

  const [modelList, setModelList] = useState([])
  const [modelId, setModelId] = useState('')

  const [yearList, setYearList] = useState([])
  const [yearId, setYearId] = useState('')

  const [mileageBody, setMileageBody] = useState('')

  const [priceBody, setPriceBody] = useState()

  const [descriptionBody, setDescriptionBody] = useState('')

  const [carCategory, setCarCategory] = useState('')

  const [selectedImages, setSelectedImages] = useState([])

  const [file, setFile] = useState([])
  const [fileData, setFileData] = useState({})
  const [postReady, setPostReady] = useState(false)

  const navigate = useNavigate()

  useEffect(() => {
    let ignore = false
    axios
      .get(
        `${serverUrl}api/carinfo`
      )
      .then((response) => {
        if (!ignore) {
          console.log('Fetched list of makes:', response.data)
          const makes = response.data
            .map((car) => car.Make)
            .filter((make, index, array) => array.indexOf(make) === index)
            .sort()
          setMakeList(makes)
          // setMakeId(makes[0])
        }
      })
      .catch((error) => {
        console.error('Error fetching list of makes:', error)
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
          `${serverUrl}api/carinfo/search?Make=${makeId}`
        )
        .then((response) => {
          if (!ignore) {
            console.log('Fetched list of models:', response.data)
            setCarCategory(response.data[0].Category)
            const models = response.data
              .map((car) => car.Model)
              .filter((model, index, array) => array.indexOf(model) === index)
              .sort()
            setModelList(models)
            // setModelId(models[0])
          }
        })
        .catch((error) => {
          console.error('Error fetching list of models:', error)
        })

      return () => {
        ignore = true
      }
    }
  }, [makeId, modelId])

  useEffect(() => {
    let ignore = false
    if (modelId !== '') {
      axios
        .get(
          `${serverUrl}api/carinfo/search?Make=${makeId}&Model=${modelId}`
        )
        .then((response) => {
          if (!ignore) {
            console.log('Fetched list of years:', response.data)
            const years = response.data
              .map((car) => car.Year)
              .filter((year, index, array) => array.indexOf(year) === index)
              .sort((a, b) => a - b)
            setYearList(years)
            // setYearId(years[0])
          }
        })
        .catch((error) => {
          console.error('Error fetching list of years:', error)
        })
      return () => {
        ignore = true
      }
    }
  }, [makeId, modelId])

  const handleImageUpload = (e) => {
    if (e.target.files.length === 0) return false

    const fileSize = e.target.files[0].size
    if (!fileSizeCheck(fileSize)) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'File size is too big. (Max size: 1 MB)',

      })
      e.target.value = null
      setFile([])
      return false
    }
    const uploadedImages = Array.from(e.target.files)
    setSelectedImages(uploadedImages)
    setFile(e.target.files)
  }

  useEffect(() => {
    if (postReady && file.length > 0) handleCreateListing()
  }, [postReady])

  const handleCreateListing = () => {
    if (!postReady) {
      uploadImage(file, setFileData, setPostReady)
      return
    }

    // Extract the user's ObjectId from the user information
    const userId = user._id // Assuming the user object has an "_id" property containing the ObjectId

    // Prepare the data to be sent to the backend
    const formData = new FormData()
    formData.append('Make', makeId)
    formData.append('Model', modelId)
    formData.append('Year', yearId)
    formData.append('Category', carCategory)
    formData.append('Mileage', mileageBody)
    formData.append('Price', priceBody)
    formData.append('Condition', 'used')
    formData.append('Description', descriptionBody)
    formData.append('user', userId) // Pass the user's ObjectId value here
    formData.append('image', fileData.url)

    console.log('New Listing FormData:', formData)

    // Send the data to the backend route
    axios
      .post(`${serverUrl}api/saleposts`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      })
      .then((response) => {
        console.log('New listing created successfully:', response.data)
        // Handle any success actions here
        Swal.fire({
          icon: 'success',
          title: 'Success',
          text: 'New listing created successfully'
        }).then(() => {
          navigate('/')
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
    <div className='bg-off-white'>
      <div className="w-[90%] sm:w-[60%] md:w-[50%] lg:w-[40%] xl:w-[30%] 2xl:w-[25%] mx-auto overflow-x-hidden pt-32">
        <div className="flex flex-col items-center justify-center">
            <h1 className="text-3xl font-bold mt-10 mb-20">Create New Listing</h1>
          <div className="w-full text-left mx-auto">
            <select
              className="w-full p-3 border border-black mb-6 bg-off-white"
              value={makeId}
              onChange={(e) => {
                setMakeId(e.target.value)
              }}
            >
              {['Select make', ...makeList].map((make, index) => (
                <option key={index} value={make}>
                  {make}
                </option>
              ))}
            </select>
            <select
              className="w-full p-3 border border-black mb-6 bg-off-white"
              value={modelId}
              onChange={(e) => {
                setModelId(e.target.value)
              }}
            >
              {['Select model', ...modelList].map((model, index) => (
                <option key={index} value={model}>
                  {model}
                </option>
              ))}
            </select>
            <select
              className="w-full p-3 border border-black mb-6 bg-off-white"
              value={yearId}
              onChange={(e) => {
                setYearId(e.target.value)
              }}
            >
              {['Select year', ...yearList].map((year, index) => (
                <option key={index} value={year}>
                  {year}
                </option>
              ))}
            </select>
              <input
                className="w-full p-3 border border-black mb-6 bg-off-white placeholder-black"
                type="text"
                placeholder="Enter mileage"
                onChange={(e) => {
                  setMileageBody(e.target.value)
                }}
                required
              />
              <input
                className="w-full p-3 border border-black mb-6 bg-off-white placeholder-black"
                type="number"
                placeholder="Enter price"
                onChange={(e) => {
                  setPriceBody(e.target.value)
                }}
                required
              />
          <textarea
  className="w-full min-h-48 p-3 border border-black mb-6 bg-off-white placeholder-black"
  placeholder="Enter description"
  onChange={(e) => {
    setDescriptionBody(e.target.value);
  }}
></textarea>

          
          <div className='flex flex-col justify-center items-center mb-12'>
            <input className="my-6 mb-1"
            type="file" accept='image/png, image/jpeg, image/webp' onChange={handleImageUpload} />
            <p className='text-sm'>Accepts: png, jpeg, webp. Max Size: 1 MB</p>
          </div>

          {file.length > 0 && selectedImages.map((image, index) => (
            <div key={index}>
              <img className='w-full h-full object-cover border border-black' src={URL.createObjectURL(image)} alt={`Image ${index}`} />
            </div>
          ))}
          <div className='w-full flex justify-center'>
              <button
                className="mt-12 w-48 lg:w-60 border bg-off-red border-black p-2 font-bold mb-20"
                onClick={handleCreateListing}
              >
                create listing
              </button>
              </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CreateNewListing
