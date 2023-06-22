import React, { useContext, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { CarContext } from '../components/CarContextProvider';
import { AuthContext } from '../context/AuthContextComponent';

const FeaturedCars = () => {
  const { cars } = useContext(CarContext);
  const { isLoggedIn } = useContext(AuthContext);
  console.log('Cars from context:', cars);

  const [makes, setMakes] = useState([]);
  const [selectedMake, setSelectedMake] = useState('');
  const [models, setModels] = useState([]);
  const [selectedModel, setSelectedModel] = useState('');
  const [filteredCars, setFilteredCars] = useState([]);
  const [filterApplied, setFilterApplied] = useState(false);

  useEffect(() => {
    const uniqueMakes = [...new Set(cars.map((car) => car.Make))];
    setMakes(uniqueMakes);
    console.log('Unique makes:', uniqueMakes);
  }, [cars]);

  useEffect(() => {
    if (selectedMake) {
      const relevantModels = [
        ...new Set(
          cars
            .filter((car) => car.Make === selectedMake)
            .map((car) => car.Model)
        )
      ];
      setModels(relevantModels);
      console.log('Relevant models:', relevantModels);
    } else {
      setModels([]);
      setSelectedModel('');
    }
  }, [selectedMake, cars]);

  useEffect(() => {
    if (selectedModel) {
      const relevantCars = cars.filter(
        (car) => car.Make === selectedMake && car.Model === selectedModel
      );
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

  if (!isLoggedIn) {
    return null; // Return null or a loading indicator if the user is not logged in
  }

  return (
    <div>
      <h1>Featured Cars</h1>
      <div>
        <label>Make: </label>
        <select
          value={selectedMake}
          onChange={(e) => setSelectedMake(e.target.value)}
        >
          <option value=''>Select Make</option>
          {makes.map((make) => (
            <option key={make} value={make}>
              {make}
            </option>
          ))}
        </select>
      </div>
      {selectedMake && (
        <div>
          <label>Model: </label>
          <select
            value={selectedModel}
            onChange={(e) => setSelectedModel(e.target.value)}
          >
            <option value=''>Select Model</option>
            {models.map((model) => (
              <option key={model} value={model}>
                {model}
              </option>
            ))}
          </select>
        </div>
      )}
      <button onClick={handleApply}>Apply</button>
      <button onClick={handleReset}>Reset</button>
      {filterApplied ? (
        filteredCars.map((car) => (
          <Link to={`/api/saleposts/${car._id}`} key={car._id}>
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
          <Link to={`/api/saleposts/${car._id}`} key={car._id}>
            <div>
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
