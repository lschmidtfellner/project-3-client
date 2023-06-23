
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
            <div key={selectedCar._id}>
                <h2>{selectedCar.Year} {selectedCar.Make} {selectedCar.Model}</h2>
                <p>Mileage: {selectedCar.Mileage}</p>
                <p>Condition: {selectedCar.Condition}</p>
                <p>Description: {selectedCar.Description}</p>
                {/* CHANGE THIS LINK ONCE LUKE GIVES NEW EDIT FORM ROUTE */}
                <Link to={`/post?id=${selectedCar._id}`}>
                    <button>Edit</button>
                </Link>
                {/* <Link to={`/usercarlistings?id=${car._id}`}> */}
                <button onClick={() => handleDelete(selectedCar._id)}>Delete</button>
                {/* </Link> */}
            </div>
            <Link className="mt-4" to="/post">
                <button>Create New Listing</button>
            </Link>
        </>
    );
};

export default UserCarListingsDetails;



