import React, { useContext, useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { CarContext } from '../components/CarContextProvider'
import { ReactComponent as FilterSvg } from '../assets/revfilter.svg'
import { ReactComponent as DblArrow } from '../assets/revsidearrow.svg'
import { ReactComponent as Sticker } from '../assets/revSticker.svg'
import { addComma, alphabeticalOrder } from '../controller/controller'

const FeaturedCars = () => {
  const { cars } = useContext(CarContext)
  console.log('Cars from context:', cars)
  const [makes, setMakes] = useState([])
  const [selectedMake, setSelectedMake] = useState('')
  const [models, setModels] = useState([])
  const [selectedModel, setSelectedModel] = useState('')
  const [filteredCars, setFilteredCars] = useState([])
  const [filterApplied, setFilterApplied] = useState(false)
  const [showFilter, setShowFilter] = useState(false)
  useEffect(() => {
    let uniqueMakes = [...new Set(cars.map((car) => car.Make))]
    uniqueMakes = alphabeticalOrder(uniqueMakes)
    setMakes(uniqueMakes)
    console.log('Unique makes:', uniqueMakes)
  }, [cars])
  useEffect(() => {
    if (selectedMake) {
      const relevantModels = [
        ...new Set(
          cars
            .filter((car) => car.Make === selectedMake)
            .map((car) => car.Model)
        )
      ]
      setModels(relevantModels)
      console.log('Relevant models:', relevantModels)
    } else {
      setModels([])
      setSelectedModel('')
    }
  }, [selectedMake, cars])
  useEffect(() => {
    if (selectedModel) {
      const relevantCars = cars.filter(
        (car) => car.Make === selectedMake && car.Model === selectedModel
      )
      setFilteredCars(relevantCars)
      console.log('Filtered cars:', relevantCars)
    } else {
      setFilteredCars([])
    }
  }, [selectedModel, selectedMake, cars])
  const handleApply = () => {
    setFilterApplied(true)
  }
  const handleReset = () => {
    setFilterApplied(false)
    setSelectedMake('')
    setSelectedModel('')
  }
  const toggleFilter = () => {
    setShowFilter((prev) => !prev)
    console.log(showFilter)
  }

  const priceConversion = (price) => {
    // If price is 7 digits or more
    if (price >= 1000000) {
      return (price / 1000000).toFixed(1) + 'M' // divide by 1,000,000 and add 'M' to indicate millions
    }

    // If price is less than 7 digits
    return (price / 1000).toFixed(1) + 'k' // divide by 1,000 and add 'k' to indicate thousands
  }

  return (
    <div className="min-h-screen px-5 sm:px-24 md:px-52 xl:px-72 bg-off-white pt-20 pb-10 overflow-x-hidden">
      <div className='w-full flex justify-center'>
        <div className="flex flex-wrap justify-between items-center w-full  mb-8 pt-8 lg:w-[50%]">
          <h1 className="flex text-center text-3xl font-bold my-8">
            Featured Cars
          </h1>
          <FilterSvg className="w-6 cursor-pointer" onClick={() => toggleFilter()} />
          <div
            style={{ display: showFilter ? 'block' : 'none' }}
            className="mt-2 w-full"
          >
            <select
              className="w-full border border-black bg-off-white p-2 text-base"
              value={selectedMake}
              onChange={(e) => setSelectedMake(e.target.value)}
            >
              <option value="">select make</option>
              {makes.map((make) => (
                <option key={make} value={make}>
                  {make}
                </option>
              ))}
            </select>
          </div>
          {
            <div
              style={{ display: showFilter ? 'block' : 'none' }}
              className="mt-4 w-full text-center"
            >
              <select
                className="w-full border border-black bg-off-white p-2 text-base"
                value={selectedModel}
                onChange={(e) => setSelectedModel(e.target.value)}
              >
                <option value="">select model</option>
                {models.map((model) => (
                  <option key={model} value={model}>
                    {model}
                  </option>
                ))}
              </select>
            </div>
          }
          <div
            style={{ display: showFilter ? 'block' : 'none' }}
            className="text-center w-full mb-10"
          >
            <button
              onClick={handleApply}
              className="w-[50%] border bg-off-yellow border-black p-2 font-bold"
            >
              apply
            </button>
            <button
              onClick={handleReset}
              className="mt-4 w-[50%] border border-l-0 bg-off-red border-black p-2 font-bold"
            >
              reset
            </button>
          </div>
        </div>
      </div>
      <div className="grid lg:grid-cols-2 gap-x-12 items-stretch">
        {filterApplied
          ? filteredCars.map((car) => (
              <Link
                to={`/cardetails?id=${car._id}`}
                key={car._id}
                query={car._id}
              >
                <div className="flex mb-12 relative xl:w-[1/2]">
                  <div className="sticker text-center flex flex-col items-center justify-center absolute transform rotate-12 -top-8 -right-4">
                    <h2 className="absolute font-west-avenue text-3xl">
                      {'$' + priceConversion(car.Price)}
                    </h2>
                    <Sticker className="h-24 font-west-avenue text-3xl" />
                  </div>
                  <div className="w-full border-black border">
                    <div className="img-container aspect-w-16 aspect-h-9">
                      <img
                        src={car.image}
                        alt="Car"
                        className="aspect-content object-cover border-b border-black"
                      />
                    </div>
                    <div className="flex justify-between items-center p-6">
                      <div className="">
                        <h2 className=" w-auto font-west-avenue text-3xl">
                          {car.Year} {car.Make} {car.Model}
                        </h2>
                        <p>{addComma(car.Mileage)} miles</p>
                      </div>
                      <DblArrow className="ml-6 h-6" />
                    </div>
                  </div>
                </div>
              </Link>
            ))
          : cars.map((car) => (
              <Link
                to={`/cardetails?id=${car._id}`}
                key={car._id}
                query={car._id}
              >
                <div className="mb-12 relative col-span-2 xl:col-span-1">
                  <div className="sticker text-center flex flex-col items-center justify-center absolute transform rotate-12 -top-8 -right-4">
                    <h2 className="absolute font-west-avenue text-3xl">
                      {'$' + priceConversion(car.Price)}
                    </h2>
                    <Sticker className="h-24 font-west-avenue text-3xl" />
                  </div>
                  <div className="w-full border-black border">
                    <div className="aspect-w-16 aspect-h-9">
                      <img
                        src={car.image}
                        alt="Car"
                        className="aspect-content object-cover border-b border-black"
                      />
                    </div>
                    <div className="lg:h-32 flex justify-between items-center p-6">
                      <div className="">
                        <h2 className=" w-auto font-west-avenue text-3xl">
                          {car.Year} {car.Make} {car.Model}
                        </h2>
                        <p>{addComma(car.Mileage)} miles</p>
                      </div>
                      <DblArrow className="ml-6 h-6" />
                    </div>
                  </div>
                </div>
              </Link>
            ))}
      </div>
    </div>
  )
}
export default FeaturedCars
