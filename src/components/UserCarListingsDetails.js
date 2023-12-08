
import React, { useContext, useState, useEffect } from 'react';
import axios from 'axios';
import { useLocation } from 'react-router-dom';
import { Link } from 'react-router-dom';
import {useNavigte} from 'react-router-dom';
import { CarContext } from '../components/CarContextProvider';
import Swal from 'sweetalert2'
import { useNavigate } from 'react-router-dom';
import { serverUrl } from '../controller/controller';
import { addComma } from '../controller/controller';
import { ReactComponent as BkDblArrow } from '../assets/bkarrow.svg'


const UserCarListingsDetails = () => {
    const { cars, setCars } = useContext(CarContext);
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const selectedCarId = queryParams.get('id');
    const [selectedCar, setSelectedCar] = useState(null);
    const navigate = useNavigate();
    // New states for price editing modal
    const [showPriceModal, setShowPriceModal] = useState(false);
    const [editingCarId, setEditingCarId] = useState(null);
    const [newPrice, setNewPrice] = useState('');
   

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

    const formatPrice = (price) => {
        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD',
            minimumFractionDigits: 0,
            maximumFractionDigits: 0
        }).format(price);
    };

    const handleDelete = (id) => {
        axios.delete(`${serverUrl}api/saleposts/${id}`)
            .then(() => {
                const updatedCars = cars.filter((car) => car._id !== id);
                setCars(updatedCars);
                Swal.fire({
                    icon: 'success',
                    title: "You have successfully deleted this posting!"
                });
            })
            .catch(error => console.error('Error deleting car:', error));
    };



    const handlePriceChange = () => {

        const priceValue = parseFloat(newPrice.replace(/[^0-9.]/g, '').trim());
        if (!isNaN(priceValue)) {
            axios.put(`${serverUrl}api/saleposts/${editingCarId}`, { Price: priceValue })
                .then(() => {
                    const updatedCars = cars.map(car => {
                        console.log('Before Update', cars);
                        if (car._id === editingCarId) {
                            return { ...car, Price: newPrice };
                        }
                        return car;
                    });
                    console.log('After update', updatedCars)
                    setCars(updatedCars);
                    setShowPriceModal(false);
                    Swal.fire({
                        icon: 'success',
                        title: "Price updated successfully!",
                        text: 'Please enter a valid number for the price'
                    });
                })
                .catch(error => console.error('Error updating car price:', error));
        } else {
            console.error('invalid price input');
        }
    };

    const priceConversion = (price) => {
        // If price is 7 digits or more
        if (price >= 1000000) {
            return (price / 1000000).toFixed(1) + 'M' // divide by 1,000,000 and add 'M' to indicate millions
        }

        // If price is less than 7 digits
        return (price / 1000).toFixed(1) + 'k' // divide by 1,000 and add 'k' to indicate thousands
    }

    const goBack = () => {
        navigate(-1);
      };


    return (
        <div className="flex flex-col min-h-screen px-5 bg-off-white pt-32 pb-10 overflow-x-hidden items-center w-full">
            <div className='flex flex-col w-full sm:w-[70%] md:w-[60%] lg:w-[50%] xl:w-[40%]'>
                <div key={selectedCar._id}>
                    {/* <CarDetailsInfo selectedCar={selectedCar}/> */}
                    <div className=''>
                        <div className='border border-black'>

                            <div className='border-b border-black flex justify-center'>
                                <img src={selectedCar.image} alt='Car' />
                            </div>
                        <div onClick={goBack} className="cursor-pointer">
                            <div className='border-b border-black flex justify-between items-center p-6'>
                            <div className="">
                                <h2 className='w-auto font-west-avenue text-3xl'>{`${selectedCar.Year} ${selectedCar.Make} ${selectedCar.Model} `}</h2>
                                <p>{`${addComma(selectedCar.Mileage)} miles`}</p>
                                </div>
                                <BkDblArrow className="ml-6 h-6" />
                            </div>
                        </div>
                            <div className='border-b border-black pl-8 py-5'>
                                <p>{`${selectedCar.Description}`}</p>
                            </div>

                            <div className='font-bold text-2xl pl-8 py-5'>
                                <p>{`${formatPrice(selectedCar.Price)}`}</p>
                            </div>

                        </div>
                    </div>
                </div>

                <div className="text-center w-full">
                    <button
                        onClick={() => {
                            setEditingCarId(selectedCar._id);
                            setShowPriceModal(true);
                        }}
                        className="w-[50%] border bg-off-yellow border-black p-2 font-bold"
                    >
                        edit price
                    </button>
                    <button onClick={() => handleDelete(selectedCar._id)} className="w-[50%] border border-l-0 bg-off-red border-black p-2 font-bold">delete</button>
                </div>

                {showPriceModal && (
                    <div className="fixed top-0 left-0 w-full h-full flex flex-col justify-center items-center bg-opacity-50 bg-black">
                        <div className="flex flex-col items-center w-[80%] lg:w-1/2 min-h-[30%] lg:h-1/2 bg-off-white p-4">
                            <h2 className="text-3xl font-bold mt-20 mb-12">Edit Price</h2>

                            <input className='w-64 md:w-80 p-2 border border-black border-b-0 bg-off-white'
                                type="text"
                                value={newPrice}
                                onChange={e => setNewPrice(e.target.value.replace(/[^0-9.]/g, ''))}
                                placeholder="$0"
                            />

                            <div className='mb-12'>
                                <button className='w-32 md:w-40 border bg-off-yellow border-black p-2 font-bold' onClick={handlePriceChange}>Confirm</button>
                                <button className='w-32 md:w-40 border border-l-0 bg-off-red border-black p-2 font-bold' onClick={() => setShowPriceModal(false)}>Cancel</button>
                            </div>
                        </div>
                    </div>
                )}

            </div>

            <Link className="mt-8 flex justify-center items-center w-full" to="/post">
                <button className="mt-8 mb-12 w-48 lg:w-60 border bg-off-red border-black p-2 font-bold">create listing</button>
            </Link>
        </div>
    );
};

export default UserCarListingsDetails;



