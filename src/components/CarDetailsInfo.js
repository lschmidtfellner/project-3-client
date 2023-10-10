import React from 'react'

export default function CarDetailsInfo( {selectedCar} ) {
    return (
        <div className='bg-off-white w-full pt-36'>
            <div className='border border-black mx-5'>

                <div className='border-b border-black flex justify-center'>
                    <img src={selectedCar.image} alt='Car' />
                </div>

                <div className='border-b border-black pl-8 py-5'>
                    <p className='font-west-avenue text-3xl'>{`${selectedCar.Year} ${selectedCar.Make} ${selectedCar.Model}`}</p>
                    <p>{`${selectedCar.Mileage} miles`}</p>
                </div>

                <div className='border-b border-black pl-8 py-5'>
                    <p>{`${selectedCar.Description}`}</p>
                </div>

                <div className='font-bold text-2xl pl-8 py-5'>
                    <p>{`$${selectedCar.Price}`}</p>
                </div>

            </div>
        </div>
    )
}
