import React, { useState, useEffect, useContext } from 'react';
import Swal from 'sweetalert2';
import api from '../api/apiConfig';
import { AuthContext } from '../context/AuthContextComponent';
import { getCarsFromSalePost } from '../controller/controller';


const ContactSellerBtn = ({ userId, selectedCar }) => {
    const { user } = useContext(AuthContext);
    const [sellerEmailAddress, setSellerEmailAddress] = useState(null);

    useEffect(() => {
        const fetchSellerEmail = async (userId) => {
            try {
                const response = await api.get(`/auth/users/${userId}/email`);
                const userData = response.data;

                if (userData.email) {
                    setSellerEmailAddress(userData.email);
                } else {
                    console.error('Seller email is not available');
                }
            } catch (error) {
                console.error('Error fetching seller email:', error);
            }
        };

        fetchSellerEmail(userId);
    }, [userId]);

    const generateEmailAddress = () => {
        if (user && user.email && sellerEmailAddress) {
            // Construct the email content for Gmail
            const subject = encodeURIComponent("I'm interested in your car");
            const formatPrice = (price) => {
                return new Intl.NumberFormat('en-US', {
                  style: 'currency',
                  currency: 'USD',
                  minimumFractionDigits: 0,
                  maximumFractionDigits: 0
                }).format(price);
              };
            const carDetails = `
                Make: ${selectedCar.Make}
                Model: ${selectedCar.Model}
                Year: ${selectedCar.Year}
                Mileage: ${selectedCar.Mileage}
                Condition: ${selectedCar.Condition}
                Price: ${formatPrice(selectedCar.Price)}
                Image: [Click here to view the car image] (${selectedCar.image})
            `;

            const body = encodeURIComponent(
                `Hello, I am interested in your car listing. Here are the details of the car I'm interested in:\n\n${carDetails}\n\nPlease provide me with more details.`
            );
            const gmailLink = `https://mail.google.com/mail/u/0/?tf=cm&to=${sellerEmailAddress}&su=${subject}&body=${body}`;

            Swal.fire({
                title: 'Contact Seller',
                text: 'Click OK to open your Gmail account in a new tab.',
                icon: 'info',
                confirmButtonText: 'OK',
            }).then((result) => {
                if (result.isConfirmed) {
                    window.open(gmailLink, '_blank');
                }
            });
        } else {
            Swal.fire({
                title: 'No such user',
                text: 'Please log in or create an account to contact this seller.',
                icon: 'error',
                confirmButtonText: 'OK',
            })
        };
    };

    return (
        <button onClick={generateEmailAddress} className="mt-8 w-48 lg:w-60 border bg-off-red border-black p-2 font-bold">
            Contact Seller
        </button>
    );
};

export default ContactSellerBtn;
