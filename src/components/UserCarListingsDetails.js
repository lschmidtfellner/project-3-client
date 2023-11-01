
import React, { useContext, useState, useEffect } from 'react';
import axios from 'axios';
import { useLocation } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContextComponent';
import { CarContext } from '../components/CarContextProvider';
import Swal from 'sweetalert2'
import { useNavigate } from 'react-router-dom';
import { serverUrl } from '../controller/controller';
import CarDetailsInfo from './CarDetailsInfo';


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

        axios.delete(`${serverUrl}api/saleposts/${id}`) // replace with actual API endpoint
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
        <div className="flex flex-col min-h-screen px-5 bg-off-white pt-32 pb-10 overflow-x-hidden items-center w-full">
            <div className='flex flex-col w-full sm:w-[70%] md:w-[60%] lg:w-[50%] xl:w-[40%]'>
                <div key={selectedCar._id}>
                    <CarDetailsInfo selectedCar={selectedCar}/>
                </div>
                <div className="text-center w-full">
                    <Link to={`/updatepost?id=${selectedCar._id}`}>
                        <button className="rounded-full pink-bg lg:w-1/6 md:w-1/6 py-1 w-1/3  text-white font-bold  hover:text-black mr-8">edit</button>
                    </Link>
                    {/* <Link to={`/usercarlistings?id=${car._id}`}> */}
                    <button onClick={() => handleDelete(selectedCar._id)} className="rounded-full pink-bg lg:w-1/6 md:w-1/6 py-1 w-1/3  text-white font-bold  hover:text-black mt-8 mr-8">delete</button>
                    {/* </Link> */}
                </div>
                
            </div>
        </div>
    );
};

export default UserCarListingsDetails;



