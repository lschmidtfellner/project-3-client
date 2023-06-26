
import React, { useContext, useState, useEffect } from 'react';
import axios from 'axios';
import { useLocation } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContextComponent';
import { CarContext } from '../components/CarContextProvider';
import Swal from 'sweetalert2'
import { useNavigate } from 'react-router-dom';


const UserCarListingsDetails = () => {
    const { cars, setCars } = useContext(CarContext);
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const selectedCarId = queryParams.get('id');
    const [selectedCar, setSelectedCar] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        if (selectedCarId) {
            const car = cars.find((car) => car._id === selectedCarId);
            setSelectedCar(car);
        }
    }, [cars, selectedCarId]);

    if (!selectedCar) {
        navigate(-1);
        return <span>Loading...</span>; // Add loading state until the car data is fetched
    }


    const handleDelete = (id) => {
        // Add your delete logic here

        axios.delete(`https://luke-used-cars-backend-19ea42e37e12.herokuapp.com/api/saleposts/${id}`) // replace with actual API endpoint
            .then(() => {
                // Remove the deleted car from the local state
                const updatedCars = cars.filter((car) => car._id !== id);
                setCars(updatedCars);

                setTimeout(() => {
                    window.location.reload()
                }, 2000)
                Swal.fire({
                    icon: 'success',
                    title: "You have successfully deleted this posting!"
                })
            })
            .catch(error => console.error('Error deleting car:', error));
    };


    return (
        <>
            <div className="w-full mx-auto text-center">
                <div className="flex flex-wrap justify-center items-center w-full yellow mb-8 py-8">
                    <h1 className="text-center text-3xl blue font-bold my-8">Your Listing</h1>
                </div>
                <div key={selectedCar._id}>
                {/* <div className="mt-20 ml-3 text-left"> */}
                    <img src={'https://luke-used-cars-backend-19ea42e37e12.herokuapp.com/' + selectedCar.images[0]} alt='Car' />
                    <h2 className="text-xl blue uppercase">{selectedCar.Year} {selectedCar.Make} {selectedCar.Model}</h2>
                    <p>mileage: {selectedCar.Mileage}</p>
                    <p>condition: {selectedCar.Condition}</p>
                    <p>description: {selectedCar.Description}</p>
                    {/* CHANGE THIS LINK ONCE LUKE GIVES NEW EDIT FORM ROUTE */}
                    </div>
                    <div className="text-center w-full">
                    <Link to={`/post?id=${selectedCar._id}`}>
                    <button className="rounded-full pink-bg lg:w-1/6 md:w-1/6 py-1 w-1/3  text-white font-bold  hover:text-black mr-8">edit</button>
                    </Link>
                    {/* <Link to={`/usercarlistings?id=${car._id}`}> */}
                    <button onClick={() => handleDelete(selectedCar._id)}>Delete</button>
                    {/* </Link> */}
               </div>
            </div>
            <Link className="mt-4" to="/post">
                <button>Create New Listing</button>
            </Link>
        </>
    );
};

export default UserCarListingsDetails;



