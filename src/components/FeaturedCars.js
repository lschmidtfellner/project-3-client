import React, { useContext, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { CarContext } from '../components/CarContextProvider';

const FeaturedCars = () => {
  const { cars, isLoggedIn } = useContext(CarContext);

  console.log('Cars from context:', cars);

  const [makes, setMakes] = useState([]);
  const [selectedMake, setSelectedMake] = useState('');
  const [models, setModels] = useState([]);
  const [selectedModel, setSelectedModel] = useState('');
  const [filteredCars, setFilteredCars] = useState([]);
  const [filterApplied, setFilterApplied] = useState(false);

  useEffect(() => {
    const uniqueMakes = [...new Set(cars.map(car => car.Make))];
    setMakes(uniqueMakes);
    console.log('Unique makes:', uniqueMakes);
  }, [cars]);

  useEffect(() => {
    if (selectedMake) {
      const relevantModels = [...new Set(cars.filter(car => car.Make === selectedMake).map(car => car.Model))];
      setModels(relevantModels);
      console.log('Relevant models:', relevantModels);
    } else {
      setModels([]);
      setSelectedModel('');
    }
  }, [selectedMake, cars]);

  useEffect(() => {
    if (selectedModel) {
      const relevantCars = cars.filter(car => car.Make === selectedMake && car.Model === selectedModel);
      setFilteredCars(relevantCars);
      console.log('Filtered cars:', relevantCars);
    } else {
      setFilteredCars([]);
    }
  }, [selectedModel, selectedMake, cars]);

  const handleApply = () => {
    setFilterApplied(true);
  };

  const handleReset = () => {
    setFilterApplied(false);
    setSelectedMake('');
    setSelectedModel('');
  };

  return (
    <div className="w-full mx-auto">
      <div className="flex flex-wrap justify-center items-center w-full yellow mb-8 py-8">
        <h1 className="text-center text-3xl blue font-bold my-8">Featured Cars</h1>
        <div className="mt-2 w-full text-center">
          <label className="text-gray-600">make: </label>
          <select className="blue rounded-full ml-2 text-base" value={selectedMake} onChange={e => setSelectedMake(e.target.value)}>
            <option value=''>select make</option>
            {makes.map(make => <option key={make} value={make}>{make}</option>)}
          </select>
        </div>
        {selectedMake &&
          <div className="mt-2 w-full text-center">
            <label className="text-gray-600">model: </label>
            <select className="blue rounded-full" value={selectedModel} onChange={e => setSelectedModel(e.target.value)}>
              <option value=''>select model</option>
              {models.map(model => <option key={model} value={model}>{model}</option>)}
            </select>
          </div>
        }
        <div className="text-center w-full">
          <button onClick={handleApply} className="rounded-full pink-bg lg:w-1/6 md:w-1/6 py-1 w-1/3  text-white font-bold  hover:text-black mt-8 mr-8">apply</button>
          <button onClick={handleReset} className="rounded-full pink-bg lg:w-1/6 md:w-1/6 py-1 w-1/3  text-white font-bold  hover:text-black mt-4">reset</button>
        </div>
      </div>

      {filterApplied ? (
        filteredCars.map((car) => (
          <Link to={`/cardetails?id=${car._id}`} key={car._id} query={car._id}>
            <div className="my-20 ml-3 text-left">
                <img src={'https://luke-used-cars-backend-19ea42e37e12.herokuapp.com/' + car.images[0]} alt='Car' className="pb-8" />
              <h2 className="text-xl blue uppercase">{car.Year} {car.Make} {car.Model}</h2>
              <p>mileage: {car.Mileage}</p>
              <p>condition: {car.Condition}</p>
              <span className="hr"></span>
            </div>
          </Link>
        ))
      ) : (
        cars.map((car) => (
          <Link to={`/cardetails?id=${car._id}`} key={car._id} query={car._id}>
            <div className="my-20 ml-3 text-left">
              <img src={'https://luke-used-cars-backend-19ea42e37e12.herokuapp.com/' + car.images[0]} alt='Car'  className="pb-8" />
              <h2 className="text-xl blue uppercase">{car.Year} {car.Make} {car.Model}</h2>
              <p>mileage: {car.Mileage}</p>
              <p>condition: {car.Condition}</p>
              <span className="hr"></span>
            </div>
          </Link>
        ))
      )}
    </div>
  );
};

export default FeaturedCars;
