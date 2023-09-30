import React, { useContext, useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { CarContext } from '../components/CarContextProvider'
import { ReactComponent as FilterSvg } from '../assets/revfilter.svg'
import { ReactComponent as DblArrow } from '../assets/revsidearrow.svg'
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
    const uniqueMakes = [...new Set(cars.map((car) => car.Make))]
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
  return (
    <div className="w-full px-5 bg-off-white pt-20 pb-1">
      <div className="flex flex-wrap justify-between items-center w-full  mb-8 py-8">
        <h1 className="flex text-center text-3xl font-bold my-8">
          Featured Cars
        </h1>
        <FilterSvg className="w-6" onClick={() => toggleFilter()} />
        <div
          style={{ display: showFilter ? 'block' : 'none' }}
          className="mt-2 w-full text-center"
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
          className="text-center w-full"
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
      {filterApplied
        ? filteredCars.map((car) => (
          <Link
          to={`/cardetails?id=${car._id}`}
          key={car._id}
          query={car._id}
        >
          <div className="w-full border-black border mb-16">
            <div className="w-fit">
              <img
                src={car.image}
                alt="Car"
                className="border-b border-black w-auto"
              />
            </div>
            <div className="flex justify-between items-center p-6">
              <div className=''>
                <h2 className=" w-auto text-xl">
                  {car.Year} {car.Make} {car.Model}
                </h2>
                <p>{car.Mileage} miles</p>
              </div>
              <DblArrow className="ml-6 h-6" />
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
              <div className="w-full border-black border mb-16">
                <div className="w-fit">
                  <img
                    src={car.image}
                    alt="Car"
                    className="border-b border-black w-auto"
                  />
                </div>
                <div className="flex justify-between items-center p-6">
                  <div className=''>
                    <h2 className=" w-auto text-xl">
                      {car.Year} {car.Make} {car.Model}
                    </h2>
                    <p>{car.Mileage} miles</p>
                  </div>
                  <DblArrow className="ml-6 h-6" />
                </div>
              </div>
            </Link>
          ))}
    </div>
  )
}
export default FeaturedCars
