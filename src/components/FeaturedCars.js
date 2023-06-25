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
    <div>
      <h1>Featured Cars</h1>
      <div>
        <label>Make: </label>
        <select value={selectedMake} onChange={e => setSelectedMake(e.target.value)}>
          <option value=''>Select Make</option>
          {makes.map(make => <option key={make} value={make}>{make}</option>)}
        </select>
      </div>
      {selectedMake &&
        <div>
          <label>Model: </label>
          <select value={selectedModel} onChange={e => setSelectedModel(e.target.value)}>
            <option value=''>Select Model</option>
            {models.map(model => <option key={model} value={model}>{model}</option>)}
          </select>
        </div>
      }
      <button onClick={handleApply}>Apply</button>
      <button onClick={handleReset}>Reset</button>
      {filterApplied ? (
        filteredCars.map((car) => (
          <Link to={`/cardetails?id=${car._id}`} key={car._id} query={car._id}>
            <div>
              <p>Year: {car.Year}</p>
              <p>Make: {car.Make}</p>
              <p>Model: {car.Model}</p>
              <p>Mileage: {car.Mileage}</p>
              <p>Condition: {car.Condition}</p>
            </div>
          </Link>
        ))
      ) : (
        cars.map((car) => (
          <Link to={`/cardetails?id=${car._id}`} key={car._id} query={car._id}>
            <div>
              <img src={'https://luke-used-cars-backend-19ea42e37e12.herokuapp.com/' + car.images[0]} alt='Car' />
              {console.log('Car images:', car.images[0])}
              <p>Year: {car.Year}</p>
              <p>Make: {car.Make}</p>
              <p>Model: {car.Model}</p>
              <p>Mileage: {car.Mileage}</p>
              <p>Condition: {car.Condition}</p>
            </div>
          </Link>
        ))
      )}
    </div>
  );
};

export default FeaturedCars;
