import React from 'react'
import { addComma } from '../controller/controller';
import { useNavigate } from 'react-router-dom';
import { ReactComponent as BkDblArrow } from '../assets/bkarrow.svg';


export default function CarDetailsInfo({ selectedCar }) {
    const formatPrice = (price) => {
        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD',
            minimumFractionDigits: 0,
            maximumFractionDigits: 0
        }).format(price);
    };
    const navigate = useNavigate();
    const goBack = () => {
        navigate(-1);
    };

    return (
        <div className='lg:w-701'>
            <div className='border border-black'>

                <div className='img-container aspect-w-16 aspect-h-9 border-b border-black flex justify-center'>
                    <img src={selectedCar.image} className="aspect-content object-cover" alt='Car' />
                </div>
                <div onClick={goBack} className="cursor-pointer">
                    <div className='border-b border-black flex justify-between items-center p-6'>
                        <div className="">
                            <p className='font-west-avenue text-3xl'>{`${selectedCar.Year} ${selectedCar.Make} ${selectedCar.Model}`}</p>
                            <p>{`${addComma(selectedCar.Mileage)} miles`}</p>
                        </div>
                        <BkDblArrow className="ml-6 h-6" />
                    </div>
                </div>

                <div className='border-b border-black p-6'>
                    <p>{`${selectedCar.Description}`}</p>
                </div>

                <div className='font-bold text-2xl p-6'>
                    <p>{`${formatPrice(selectedCar.Price)}`}</p>
                </div>

            </div>
        </div>
    )
}
