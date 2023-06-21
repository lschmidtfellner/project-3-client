// This component will display the list of featured cars. Use the context created to fetch the data and display a Car component for each item.
import React, { useContext } from 'react';
import { CarContext } from '../components/CarContextProvider';
import Car from '../components/Car';

const FeaturedCars = () => {
  const { cars } = useContext(CarContext); // Use CarContext instead of CarContextProvider

  //     const response = await axios.get(
  //     `https://api.carsxe.com/vehicles?make=${selectedMake}&model=${selectedModel}&include=sold,images,dealer,options,generation`,
  //     {
  //       headers: {
  //         Authorization: `Bearer YOUR_CARSXE_API_KEY`
  //       }
  //     }
  //   );
  //   setSearchResults(response.data);

  return (
    <div>
      <h1>Featured Cars</h1>
      {cars.map((car) => (
         <div key={car._id}>
         <p>Year: {car.year}</p>
         <p>Make: {car.make}</p>
         <p>Model: {car.model}</p>
         <p>Mileage: {car.mileage}</p>
         <p>Condition: {car.condition}</p>
         <p>Date added: {car.date}</p>
       </div>
      ))}
    </div>
  );
};

export default FeaturedCars;



// import React, { useContext, useState, useEffect } from 'react';
// import { CarContext } from '../components/CarContextProvider';
// import Car from '../components/Car';
// import axios from 'axios';

// const FeaturedCars = () => {
//   const { cars } = useContext(CarContext);
//   const [makes, setMakes] = useState([]);
//   const [selectedMake, setSelectedMake] = useState('');
//   const [models, setModels] = useState([]);
//   const [selectedModel, setSelectedModel] = useState('');
//   const [searchResults, setSearchResults] = useState([]);
//   const [carImages, setCarImages] = useState({});

//   useEffect(() => {
//     // get unique makes from cars
//     const uniqueMakes = [...new Set(cars.map(car => car.make))];
//     setMakes(uniqueMakes);
//   }, [cars]);

//   useEffect(() => {
//     // get models for selected make
//     if (selectedMake) {
//       const relevantModels = [...new Set(cars.filter(car => car.make === selectedMake).map(car => car.model))];
//       setModels(relevantModels);
//     }
//   }, [selectedMake, cars]);

//   const handleSearch = async (e) => {
//     e.preventDefault();
//     const response = await axios.get(
//       `https://api.carsxe.com/vehicles?make=${selectedMake}&model=${selectedModel}&include=sold,images,dealer,options,generation`,
//       {
//         headers: {
//           Authorization: `Bearer YOUR_CARSXE_API_KEY`
//         }
//       }
//     );
//     setSearchResults(response.data);

//     const img = await axios.get()
//     `api.com`
//   };

//   return (
//     <div>
//       <h1>Featured Cars</h1>
//       <form onSubmit={handleSearch}>
//         <label>
//           Make:
//           <select value={selectedMake} onChange={(e) => setSelectedMake(e.target.value)}>
//             <option value="">Select Make</option>
//             {makes.map(make => <option key={make} value={make}>{make}</option>)}
//           </select>
//         </label>
//         <label>
//           Model:
//           <select value={selectedModel} onChange={(e) => setSelectedModel(e.target.value)}>
//             <option value="">Select Model</option>
//             {models.map(model => <option key={model} value={model}>{model}</option>)}
//           </select>
//         </label>
//         <button type="submit">Search</button>
//       </form>
//       {searchResults.length > 0 ? (
//         searchResults.map((car) => (
//           <Car key={car.vehicle_id} car={car} />
//         ))
//       ) : (
//         cars.map((car) => (
//           <div key={car._id}>
//           {carImages && carImages.images.map((img, index) => <img key={index} src={img.url} alt={`${car.make} ${car.model}`} />)}
//           <p>Year: {car.year}</p>
//           <p>Make: {car.make}</p>
//           <p>Model: {car.model}</p>
//           <p>Mileage: {car.mileage}</p>
//           <p>Condition: {car.condition}</p>
//           <p>Date added: {car.date}</p>
//         </div>
//         ))
//       )}
//     </div>
//   );
// };

// export default FeaturedCars;

