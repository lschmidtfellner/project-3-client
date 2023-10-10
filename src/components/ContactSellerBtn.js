import React, { useState, useEffect, useContext } from 'react';
import Swal from 'sweetalert2';
import api from '../api/apiConfig';
import { AuthContext } from '../context/AuthContextComponent';


const ContactSellerBtn = ({ userId }) => {
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
      const body = encodeURIComponent(
        'Hello, I am interested in your car listing. Please provide me with more details.'
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
    };
  };

  return (
    <button onClick={generateEmailAddress} className="rounded-full pink-bg lg:w-1/6 md:w-1/6 py-1 w-1/3 text-white font-bold hover:text-black mt-4">
      Contact Seller
    </button>
  );
};

export default ContactSellerBtn;
